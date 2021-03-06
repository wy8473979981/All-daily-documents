export interface AsyncDictionaryParams {
  form?: Record<string, any>;
  q?: string;
  store?: any;
}

export interface AsyncDict {
  __value: string | number;
  __label: string;
  [name: string]: any;
}

export interface AsyncDictFn {
  (form: Record<string, any>): Promise<AsyncDict[]>;
}
