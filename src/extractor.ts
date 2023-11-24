/* eslint-disable @typescript-eslint/no-unused-vars */
import { GenericObjectOrArray, XMLParser } from 'fast-xml-parser';
import {
  ExtractedXMLData,
  ExtractedType,
  XMLDataType,
  xmlGrsHeaders,
  xmlUfnHeaders,
  ExtractedData,
  FileMetadata,
  ExportFormat,
  exportFormatTypes,
} from './types/general.type';
import fs from 'fs';
import { promisify } from 'util';
import { superbytes } from 'superbytes';
import { decode } from 'html-entities';
import YAML from 'yaml';
import { join } from 'path';
import { XMLUfn } from './types/ufn.type';
import { XMLGrs } from './types/grs.type';
import { Helpers } from './helpers';

abstract class XMLExtractor {
  public extractedData!: ExtractedData;

  async runExtractProcess(filepath: string): Promise<XMLExtractor> {
    const xmlData = await this.readXMLFile(filepath);
    if (this.validateXMLHeader(xmlData)) {
      const extracted = this.extractXMLObject(xmlData as XMLDataType);
      this.extractedData = {
        ...this.getFileMetadata(filepath),
        ...extracted,
      };

      return this;
    } else {
      throw new TypeError(`Loaded XML file structure is not grs neither ufn`);
    }
  }

  getExtractedData(): ExtractedData | undefined {
    return JSON.parse(Helpers.cleanify(JSON.stringify(this.extractedData)));
  }

  protected async readXMLFile(filepath: string): Promise<GenericObjectOrArray<unknown>> {
    const xmlData = await promisify(fs.readFile)(filepath);
    return new XMLParser({ ignoreAttributes: false }).parse(xmlData);
  }

  protected validateXMLHeader(xmlData: GenericObjectOrArray<unknown>): boolean {
    const xmlProperties = Object.keys(xmlData);
    const isGrs = xmlProperties.every((item) => {
      return xmlGrsHeaders.includes(item);
    });

    const isUfn = xmlProperties.every((item) => {
      return xmlUfnHeaders.includes(item);
    });

    return isGrs || isUfn;
  }

  protected getFileMetadata(filepath: string): FileMetadata {
    const splittedPath = filepath.split('\\');
    return {
      filename: splittedPath[splittedPath.length - 1],
      filesize: superbytes(fs.statSync(filepath).size),
    };
  }

  async exportToFile(outputDir: string, format: ExportFormat = 'yml'): Promise<void> {
    if (!exportFormatTypes.includes(format)) {
      console.error('Error: Provided format not recognized');
      return;
    }

    if (!Helpers.isDirExists(outputDir)) {
      console.error('Error: Provided output directory not exists');
      return;
    }

    if (!this.extractedData) {
      console.error('Error: XML was not extracted');
      return;
    }

    this.tryExport(outputDir, this.extractedData, format);
  }

  protected async tryExport(outputDir: string, data: ExtractedData, format: ExportFormat = 'yml'): Promise<void> {
    try {
      const formattedData = this.getDataByFormat(data, format);
      const path = join(outputDir, `\\${data.filename}.${format}`);
      await promisify(fs.writeFile)(path, formattedData);
      console.info('Success: Data exported to file');
    } catch (error) {
      console.log('Error: An unhandled error occured while trying export data to file');
    }
  }

  protected getDataByFormat(data: ExtractedData, format: ExportFormat = 'yml'): string {
    switch (format) {
      case 'yml':
        return YAML.stringify(data);
      case 'json':
        return Helpers.cleanify(JSON.stringify(data));
      default: {
        return YAML.stringify(data);
      }
    }
  }

  abstract extractXMLObject(xmlData: XMLDataType): ExtractedXMLData;
}

export class GrsExtractor extends XMLExtractor {
  extractXMLObject(xmlData: XMLDataType): ExtractedXMLData {
    const grsData = xmlData as XMLGrs.Data;
    return {
      type: ExtractedType.GRS,
      sqls: grsData.GenrapGrs.oddlSchema.mapping.sql.entities.elem.map((item) => {
        return {
          name: item['@_key'],
          sql: decode(item['@_sqlTableQuery']),
        };
      }),
    };
  }
}

export class UfnExtractor extends XMLExtractor {
  extractXMLObject(xmlData: XMLUfn.Data): ExtractedXMLData {
    const ufnData = xmlData as XMLUfn.Data;
    return {
      type: ExtractedType.UFN,
      sqls: ufnData.GenrapUfn.ufn.UFUserDefEnt.map((item) => {
        return {
          name: item['@_name'],
          sql: decode(item.entKind.userQuery),
        };
      }),
    };
  }
}
