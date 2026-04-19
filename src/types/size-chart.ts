export interface SizeRow {
  label: string;
  values: (string | number)[];
}

export interface SizeSection {
  title: string;
  sizeType: string;
  mainTitle: string;
  sizes: (string | number)[];
  rows: SizeRow[];
}
