export enum TableColumnType {
  TEXT = 'text',
  DATE = 'date',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
}

export interface CommonTableColumn {
  fieldId: string;
  headerName: string;
  dataType?: TableColumnType;
  format?: string;
}
