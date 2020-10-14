export interface ValidatorRule {
  message?: string;
  field: string;
  fullField: string;
  form: Record<string, any>;
  rowForm: Record<string, any>;
  type?: string;
  [name: string]: any;
}

export interface Validator<T extends ValidatorRule> {
  (rule: T, value: any, callback: (error?: Error) => void): void;
}
