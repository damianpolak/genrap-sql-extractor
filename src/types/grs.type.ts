export namespace XMLGrs {
  export type Data = {
    '?xml': XML;
    GenrapGrs: GenrapGrs;
  };

  export type XML = {
    '@_version': string;
    '@_encoding': string;
    '@_standalone': string;
  };

  export type GenrapGrs = {
    rpt: Rpt;
    data: string;
    oddlSchema: OddlSchema;
    RSQueryArg: RSQueryArg[];
    server: Server;
  };

  export type RSQueryArg = {
    DataValue?: number;
    '@_name': string;
  };

  export type OddlSchema = {
    er: Er;
    mapping: OddlSchemaMapping;
  };

  export type Er = {
    entities: ErEntities;
    rels: string;
    functions: ErFunctions;
  };

  export type ErEntities = {
    elem: PurpleElem[];
  };

  export type PurpleElem = {
    attr: Attr;
    '@_key': string;
    '@_isReturnEntity'?: string;
  };

  export type Attr = {
    elem: AttrElem;
  };

  export type AttrElem = FluffyElem[] | TentacledElem;

  export type FluffyElem = {
    type: PurpleType;
    '@_key': string;
    '@_optional': string;
  };

  export type PurpleType = {
    string?: string;
    datetime?: string;
    decimal?: string;
  };

  export type TentacledElem = {
    type: ErTypeClass;
    '@_key': string;
    '@_optional': string;
  };

  export type ErTypeClass = {
    decimal: string;
  };

  export type ErFunctions = {
    elem: StickyElem;
  };

  export type StickyElem = {
    FunctionParam: FunctionParam[];
    returnType: ReturnType;
    '@_key': string;
  };

  export type FunctionParam = {
    type: ErTypeClass;
    mode: Mode;
    '@_name': string;
  };

  export type Mode = {
    in: string;
  };

  export type ReturnType = {
    table: string;
  };

  export type OddlSchemaMapping = {
    sql: SQL;
  };

  export type SQL = {
    entities: SQLEntities;
    rels: string;
    functions: SQLFunctions;
  };

  export type SQLEntities = {
    elem: SQLEntityElem[];
  };

  export type SQLEntityElem = {
    attrs: Attrs;
    '@_key': string;
    '@_sqlTable': string;
    '@_sqlTableQuery'?: string;
    '@_userDefCols'?: string;
    PKColumn?: PKColumn;
  };

  export type PKColumn = {
    erType: ErTypeClass;
    '@_sqlColumn': string;
    '@_sqlType': SQLType;
  };

  export type SQLType = 'CHAR' | 'DATE' | 'VARCHAR2' | 'NUMBER';

  export type Attrs = {
    elem: AttrsElem;
  };

  export type AttrsElem = IndecentElem[] | IndecentElem;

  export type IndecentElem = {
    '@_key': string;
    '@_sqlColumn': string;
    '@_sqlType': SQLType;
    '@_ordinalPos'?: string;
  };

  export type SQLFunctions = {
    elem: HilariousElem;
  };

  export type HilariousElem = {
    def: Def;
    mapping: ElemMapping;
    kind: ElemKind;
    '@_key': string;
    '@_name': string;
    '@_returnSqlType': string;
  };

  export type Def = {
    FunctionParam: FunctionParam[];
    returnType: ReturnType;
  };

  export type ElemKind = {
    query: string;
  };

  export type ElemMapping = {
    SQLFunctionParamMap: SQLFunctionParamMap;
  };

  export type SQLFunctionParamMap = {
    '@_name': string;
    '@_sqlType': string;
  };

  export type Rpt = {
    pageSize: PageSize;
    margin: ParMargin;
    content: RptContent;
    headers: Headers;
    entityParams: EntityParams;
    valueParams: ValueParams;
    promptingSettings: PromptingSettings;
    '@_defHTabSize': string;
  };

  export type RptContent = {
    RSContentElem: PurpleRSContentElem;
  };

  export type PurpleRSContentElem = {
    grid: Grid;
  };

  export type Grid = {
    baseRef: BaseRef;
    margin: GridMargin;
    border: Border;
    RSGridColumn: RSGridColumn[];
    normalHeader: NormalHeader;
    normalFooter: NormalFooter;
    '@_avoidBreakingRows': string;
  };

  export type RSGridColumn = {
    detail: Detail;
  };

  export type Detail = {
    content: DetailContent;
  };

  export type DetailContent = {
    RSContentElem: FluffyRSContentElem;
  };

  export type FluffyRSContentElem = {
    par: PurplePar;
  };

  export type PurplePar = {
    font: Font;
    margin: ParMargin;
    RSParElem: PurpleRSParElem;
    '@_addBorderThickness': string;
  };

  export type PurpleRSParElem = {
    font: Font;
    kind: PurpleKind;
  };

  export type Font = {
    '@_fontName': FontName;
    '@_fontSize': FontSize;
  };

  export type FontName = 'Times New Roman';

  export type FontSize = '12.0pt';

  export type PurpleKind = {
    expr: KindExpr;
  };

  export type KindExpr = {
    expr: ExprExpr;
    formatting: Formatting;
  };

  export type ExprExpr = {
    exprWithId: ExprWithID;
  };

  export type ExprWithID = {
    expr: ExprWithIDExpr;
    '@_id': string;
  };

  export type ExprWithIDExpr = {
    global: Global;
  };

  export type Global = {
    expr: GlobalExpr;
  };

  export type GlobalExpr = {
    expr: DisplayExpr;
    '@_text': string;
  };

  export type DisplayExpr = {
    attribute: DisplayExprAttribute;
  };

  export type DisplayExprAttribute = {
    envRef: PurpleEnvRef;
    attrRef: AttrRef;
    type: AttributeType;
  };

  export type AttrRef = {
    '@_key': string;
  };

  export type PurpleEnvRef = {
    ref: PurpleRef;
    type: TypeClass;
  };

  export type PurpleRef = {
    localExt: LocalEXT;
  };

  export type LocalEXT = {
    '@_stackIx': string;
    '@_itemIx': string;
  };

  export type TypeClass = {
    '@_entityName': EntityName;
  };

  export type EntityName = '' | 'S_JEDN_ORG_NATIVE_WC_NEW' | 'S_YEARS_WC';

  export type AttributeType = {
    string: string;
  };

  export type Formatting = {
    format: Format;
  };

  export type Format = {
    plain: string;
  };

  export type ParMargin = {
    '@_left': string;
    '@_right': string;
    '@_top': string;
    '@_bottom': string;
  };

  export type BaseRef = {
    query: Query;
    '@_ident': string;
  };

  export type Query = {
    expr: QueryExpr;
  };

  export type QueryExpr = {
    iter: Iter;
  };

  export type Iter = {
    forEntity: ForEntity;
  };

  export type ForEntity = {
    domain: Domain;
    filter: Filter;
  };

  export type Domain = {
    userFunct: UserFunct;
  };

  export type UserFunct = {
    name: Name;
    ValueExpr: UserFunctValueExpr[];
  };

  export type UserFunctValueExpr = {
    attribute: ValueExprAttribute;
  };

  export type ValueExprAttribute = {
    envRef: FluffyEnvRef;
    attrRef: AttrRef;
    type: AttributeType;
  };

  export type FluffyEnvRef = {
    ref: FluffyRef;
    type: TypeClass;
  };

  export type FluffyRef = {
    param: string;
  };

  export type Name = {
    '@_fn': string;
  };

  export type Filter = {
    expr: FilterExpr;
    '@_text': string;
  };

  export type FilterExpr = {
    multiExpr: MultiExpr;
  };

  export type MultiExpr = {
    ValueExpr: MultiExprValueExpr[];
    kind: MultiExprKind;
  };

  export type MultiExprValueExpr = {
    binaryExpr?: ValueExprBinaryExpr;
    constVal?: ValueExprConstVal;
  };

  export type ValueExprBinaryExpr = {
    e1: E1;
    e2: PurpleE2;
    kind: IndigoKind;
  };

  export type E1 = {
    unary?: Unary;
    binaryExpr?: E1BinaryExpr;
  };

  export type E1BinaryExpr = {
    e1: DisplayExpr;
    e2: ExprClass;
    kind: FluffyKind;
  };

  export type ExprClass = {
    valueParam: string;
  };

  export type FluffyKind = {
    cmp: PurpleCmp;
  };

  export type PurpleCmp = {
    geq: string;
  };

  export type Unary = {
    expr: ExprClass;
    kind: UnaryKind;
  };

  export type UnaryKind = {
    isNull: string;
  };

  export type PurpleE2 = {
    unary?: Unary;
    binaryExpr?: PurpleBinaryExpr;
  };

  export type PurpleBinaryExpr = {
    e1: DisplayExpr;
    e2: FluffyE2;
    kind: StickyKind;
  };

  export type FluffyE2 = {
    binaryExpr: FluffyBinaryExpr;
  };

  export type FluffyBinaryExpr = {
    e1: ExprClass;
    e2: TentacledE2;
    kind: TentacledKind;
  };

  export type TentacledE2 = {
    constVal: E2ConstVal;
  };

  export type E2ConstVal = {
    type: FluffyType;
    '@_value': string;
  };

  export type FluffyType = {
    integer: string;
  };

  export type TentacledKind = {
    dateAdd: DateAdd;
  };

  export type DateAdd = {
    day: string;
  };

  export type StickyKind = {
    cmp: FluffyCmp;
  };

  export type FluffyCmp = {
    leq: string;
  };

  export type IndigoKind = {
    or?: string;
    and?: string;
  };

  export type ValueExprConstVal = {
    type: TentacledType;
    '@_value': string;
  };

  export type TentacledType = {
    boolean: string;
  };

  export type MultiExprKind = {
    ifElse: string;
  };

  export type Border = {
    top: BottomClass;
    middle: BottomClass;
    bottom: BottomClass;
    vertical: BottomClass;
  };

  export type BottomClass = {
    RSBorderLine: RSBorderLine[];
  };

  export type RSBorderLine = {
    lineStyle: LineStyle;
    color: Color;
    '@_thickness': Thickness;
  };

  export type Thickness = '0.0pt';

  export type Color = {
    transparent: string;
  };

  export type LineStyle = {
    none: string;
  };

  export type GridMargin = {
    '@_left': string;
    '@_right': string;
  };

  export type NormalFooter = {
    RSCell: NormalFooterRSCell[];
    horizBorders: BottomClass;
    vertBorders: BottomClass;
  };

  export type NormalFooterRSCell = {
    content: string;
  };

  export type NormalHeader = {
    RSCell: NormalHeaderRSCell[];
    horizBorders: BottomClass;
    vertBorders: BottomClass;
  };

  export type NormalHeaderRSCell = {
    content: RSCellContent;
  };

  export type RSCellContent = {
    RSContentElem: TentacledRSContentElem;
  };

  export type TentacledRSContentElem = {
    par: FluffyPar;
  };

  export type FluffyPar = {
    font: Font;
    margin: ParMargin;
    RSParElem: FluffyRSParElem;
    '@_addBorderThickness': string;
  };

  export type FluffyRSParElem = {
    font: Font;
    kind: IndecentKind;
  };

  export type IndecentKind = {
    text: string;
  };

  export type EntityParams = {
    elem: EntityParamsElem[];
  };

  export type EntityParamsElem = {
    ref: TypeClass;
    '@_key': string;
    '@_title': string;
  };

  export type Headers = {
    normal: string;
  };

  export type PageSize = {
    orient: Orient;
    '@_width': string;
    '@_height': string;
  };

  export type Orient = {
    landscape: string;
  };

  export type PromptingSettings = {
    elem: PromptingSettingsElem[];
  };

  export type PromptingSettingsElem = {
    displayCondition: DisplayCondition;
    readOnly: ReadOnly;
    paramType: ParamType;
    '@_key': string;
    '@_required': string;
    '@_label': string;
  };

  export type DisplayCondition = {
    allways: string;
  };

  export type ParamType = {
    entity?: Entity;
    singleValue?: SingleValue;
  };

  export type Entity = {
    type: TypeClass;
    displayExpr: DisplayExpr;
  };

  export type SingleValue = {
    type: SingleValueType;
    defaultValue: DefaultValue;
  };

  export type DefaultValue = {
    notSet: string;
  };

  export type SingleValueType = {
    datetime: string;
  };

  export type ReadOnly = {
    never: string;
  };

  export type ValueParams = {
    elem: ValueParamsElem[];
  };

  export type ValueParamsElem = {
    datetime: string;
    '@_key': string;
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
