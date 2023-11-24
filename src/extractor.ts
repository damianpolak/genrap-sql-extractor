/* eslint-disable @typescript-eslint/no-unused-vars */
import { GenericObjectOrArray, XMLParser } from 'fast-xml-parser';
import {
  ExtractedXMLData,
  ExtractedType,
  XMLGrs,
  XMLUfn,
  XMLDataType,
  xmlGrsHeaders,
  xmlUfnHeaders,
  ExtractedData,
  FileMetadata,
  ExportFormat,
  exportFormatTypes,
} from './types';
import fs from 'fs';
import { promisify } from 'util';
import { superbytes } from 'superbytes';
import { decode } from 'html-entities';
import YAML from 'yaml';

abstract class XMLExtractor {
  public extractedData!: ExtractedData;

  async getDataFromXML(filepath: string): Promise<XMLExtractor> {
    const xmlData = await this.readXMLFile(filepath);
    if (this.validateXMLHeader(xmlData)) {
      const extracted = this.extractedXMLObject(xmlData as XMLDataType);
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
    return this.extractedData;
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

  async export(outputDir: string, format: ExportFormat = 'yml'): Promise<void> {
    if (!exportFormatTypes.includes(format)) {
      console.error('Provided format not recognized');
      return;
    }

    if (!fs.existsSync(outputDir)) {
      console.error('Provided output directory not exists');
      return;
    }

    if (!this.extractedData) {
      console.error('XML was not extracted');
      return;
    }

    this.tryExport(outputDir, this.extractedData, format);
  }

  protected async tryExport(outputDir: string, data: ExtractedData, format: ExportFormat): Promise<void> {
    try {
      const formattedData = this.getDataByFormat(data, format);
      await promisify(fs.writeFile)(outputDir, formattedData);
    } catch (error) {
      console.log('An unhandled error occured while trying export data to file');
      // save error to file
    }
  }

  protected getDataByFormat(data: ExtractedData, format: ExportFormat): string {
    switch (format) {
      case 'yml':
        return YAML.stringify(data);
      case 'json':
        return JSON.stringify(data);
      default: {
        return YAML.stringify(data);
      }
    }
  }

  abstract extractedXMLObject(xmlData: XMLDataType): ExtractedXMLData;
}

export class GrsExtractor extends XMLExtractor {
  extractedXMLObject(xmlData: XMLDataType): ExtractedXMLData {
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
  extractedXMLObject(xmlData: XMLUfn.Data): ExtractedXMLData {
    return {
      type: ExtractedType.UFN,
      sqls: [
        {
          name: 'qqq',
          sql: 'ccc',
        },
      ],
    };
  }
}
