import yargs from 'yargs';
import { XMLGrs } from './grs.type';
import { XMLUfn } from './ufn.type';

export type FileMetadata = {
  filename: string;
  filesize: string;
};

export type ExtractedData = FileMetadata & ExtractedXMLData;

export type ExtractedXMLData = {
  type: ExtractedType;
  sqls: ExtractedDataSqlObj[];
};

export enum ExtractedType {
  GRS = 'GRS',
  UFN = 'UFN',
}

export type ExtractedDataSqlObj = {
  name: string;
  sql: string;
};

export const xmlMainHeader = ['?xml'];
export const xmlGrsHeaders = [...xmlMainHeader, 'GenrapGrs'] as const;
export const xmlUfnHeaders = [...xmlMainHeader, 'GenrapUfn'] as const;

export const exportFormatTypes = ['yml', 'json'] as const satisfies ReadonlyArray<string>;

export type ExportFormat = (typeof exportFormatTypes)[number];

export type XMLDataType = XMLGrs.Data | XMLUfn.Data;

export interface CliArguments extends yargs.Arguments {
  format?: ExportFormat;
  outputDir?: string;
  inputDir?: string;
  inputFiles?: string[];
}
