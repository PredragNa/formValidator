export interface FormField {
  name: string;
  value: string | number | string[];
  errorMessage: string | boolean;
  validated: boolean;
  validators: ValidatorType[];
  disabled?: boolean;
}
export interface FormState {
  [name: string]: FormField;
}

export type ValidatorType = {
  rule: (() => boolean) | ((...x: string[]) => void);
  params: string[];
};

export type Field = HTMLInputElement | HTMLSelectElement;

export type Register = (
  name: string,
  value: string | string[],
  validators: ValidatorType[]
) => FormState;

export type UnRegister = (name: string) => void;

export type Update = (
  name: string,
  value: string | string[],
  isValidated: boolean,
  errorMessage: string
) => void;

export interface FormMethodes {
  register: Register;
  unRegister: UnRegister;
  update: Update;
  getFormState: () => FormState;
}

export interface FieldObject {
  field: Field;
  methodes: FormMethodes;
  errorMessage?: string;
}
