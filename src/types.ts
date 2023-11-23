export type ExtractedData = {
  type: ExtractedType,
  fileName: string,
  fileSize: number,
  sqls: ExtractedDataSqlObj[],
}

export enum ExtractedType {
  GRS = 'GRS',
  UFN = 'UFN',
}

export type ExtractedDataSqlObj = {
  name: string,
  sql: string,
}

export namespace XMLUfn {
  export interface Data {
    name: string;
  }
}

export type XMLDataType = XMLGrs.Data | XMLUfn.Data;

export namespace XMLGrs {
  export interface Data extends Record<string, any> {
    '?xml'?: Record<string, string>;
    GenrapGrs: GenrapGrs;
  }
  
  type GenrapGrs = {
    rpt: GenrapGrsRpt;
    data: string;
    oddlSchema: GenrapGrsOddlschema;
    RSQueryArg: object[];
    server: any;
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
    content: any;
    headers: any;
    entityParams: any;
    valueParams: any;
    promptingSettings: any;
    '@_defHTabSize': string;
  };
  
  type GenrapGrsOddlschema = {
    er: {
      entities: { elem: ErEntityElement[] };
      rels: string;
      functions: { elem: any };
    };
    mapping: { sql: { entities: { elem: MappingEntityElement[] }; rels: ''; functions: [Object] } };
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