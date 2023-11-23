import {
  ExtractedData,
  ExtractedType,
  XMLGrs,
  XMLUfn,
  XMLDataType,
} from './types';
import fs from 'fs';
import { promisify } from 'util';

abstract class XMLExtractor {
  public extractedData!: ExtractedData;

  getDataFromXML(): ExtractedData {
    // universal parse xml and return Object<any> as inputData
    // const extractedObj = this.extractDataObject( inputData : any)

    this.extractedData = this.extractDataObject({} as XMLDataType);
    return this.extractedData;
  }

  async export(output: string, data: string): Promise<void> {
    try {
      await promisify(fs.writeFile)(output, data)
    } catch(e: unknown) {
      console.log(`An error occured when exporting file: `, e);
    }
  }

  abstract extractDataObject(xmlData: XMLDataType): ExtractedData;
}

export class GrsExtractor extends XMLExtractor {
  extractDataObject(xmlData: XMLGrs.Data): ExtractedData {
    // if (!this.isGrsObject(xmlData)) {
    //   throw TypeError('Something is wrong with types');
    // }

    return {
      type: ExtractedType.GRS,
      fileName: 'This is file name',
      fileSize: 9812938192839,
      sqls: [
        {
          name: 'asd',
          sql: 'xczxc',
        },
      ],
    };
  }

  private isGrsObject(xmlData: XMLGrs.Data): boolean {
    return false;
  }
}

export class UfnExtractor extends XMLExtractor {
  extractDataObject(xmlData: XMLUfn.Data): ExtractedData {
    return {
      type: ExtractedType.UFN,
      fileName: 'This is file name of UFN',
      fileSize: 11111111111111,
      sqls: [
        {
          name: 'qqq',
          sql: 'ccc',
        },
      ],
    };
  }
}
