/* eslint-disable @typescript-eslint/no-namespace */
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

export namespace XMLUfn {
  export interface Data {
    name: string;
  }
}

export const exportFormatTypes = ['yml', 'json'] as const satisfies ReadonlyArray<string>;

export type ExportFormat = (typeof exportFormatTypes)[number];

export type XMLDataType = XMLGrs.Data | XMLUfn.Data;

export namespace XMLGrs {
  export interface Data extends Record<string, unknown> {
    '?xml'?: Record<string, string>;
    GenrapGrs: GenrapGrs;
  }

  type GenrapGrs = {
    rpt: GenrapGrsRpt;
    data: string;
    oddlSchema: GenrapGrsOddlschema;
    RSQueryArg: object[];
    server: unknown;
  };

  type GenrapGrsRpt = {
    pageSize: {
      orient: Record<string, string>;
      '@_width': string;
      '@_height': string;
    };
    margin: {
      '@_left': string;
      '@_right': string;
      '@_top': string;
      '@_bottom': string;
    };
    content: unknown;
    headers: unknown;
    entityParams: unknown;
    valueParams: unknown;
    promptingSettings: unknown;
    '@_defHTabSize': string;
  };

  type GenrapGrsOddlschema = {
    er: {
      entities: { elem: ErEntityElement[] };
      rels: string;
      functions: { elem: unknown };
    };
    mapping: { sql: { entities: { elem: MappingEntityElement[] }; rels: ''; functions: [object] } };
  };

  type ErEntityElement = {
    attrs: SqlEntityElementAttribute;
    PKColumn: {
      erType: Record<string, string>;
      '@_sqlColumn': string;
      '@_sqlType': string;
    };
    '@_key': string;
    '@_sqlTable': string;
    '@_sqlTableQuery': string;
    '@_userDefCols': boolean;
  };

  interface MappingEntityElement extends ErEntityElement {}

  type SqlEntityElementAttribute = {
    '@_key': string;
    '@_sqlColumn': string;
    '@_sqlType': string;
    '@_ordinalPos': string;
  };
}
