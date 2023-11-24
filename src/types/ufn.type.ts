export namespace XMLUfn {
  export type Data = {
    '?xml': XML;
    GenrapUfn: GenrapUfn;
  };

  export type XML = {
    '@_version': string;
    '@_encoding': string;
    '@_standalone': string;
  };

  export type GenrapUfn = {
    ufn: Ufn;
  };

  export type Ufn = {
    UFUserDefEnt: UFUserDefEnt[];
    server: Server;
    UFDefKey: UFDefKey[];
  };

  export type UFDefKey = {
    PKColumn?: PKColumn;
    '@_entName': string;
  };

  export type PKColumn = {
    erType: ErType;
    '@_sqlColumn': string;
    '@_sqlType': string;
  };

  export type ErType = {
    decimal: string;
  };

  export type UFUserDefEnt = {
    ent: Ent;
    entKind: EntKind;
    '@_name': string;
  };

  export type Ent = {
    SPResultCol: SPResultCol[];
  };

  export type SPResultCol = {
    type: SPResultColType;
    '@_name': string;
    '@_isKeyCol': string;
  };

  export type SPResultColType = {
    type: TypeType;
    '@_optional': string;
  };

  export type TypeType = {
    decimal?: string;
    datetime?: string;
    string?: string;
  };

  export type EntKind = {
    userQuery: string;
  };

  export type Server = {
    oracle: Oracle;
  };

  export type Oracle = {
    descriptor: Descriptor;
    '@_user': string;
  };

  export type Descriptor = {
    jdbcThin: JDBCThin;
  };

  export type JDBCThin = {
    '@_address': string;
    '@_database': string;
  };
}
