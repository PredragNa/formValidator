export interface FormField {
  name: string;
  value: FieldValue;
  errorMessage: string | boolean;
  validated: boolean;
  reset: (formElement: Field) => void;
  validate: () => string;
}

export interface FormState {
  [name: string]: FormField;
}

export type ValidatorType = {
  rule: (() => boolean) | ((x: string | string[], ...params: string[]) => void);
  params: string[];
};

export type Message = {
  [name: string]: {
    empty: string,
    incorrect: string,
  }
};

export type Field = HTMLInputElement | HTMLSelectElement;

export type FieldValue = string | string[] | FileList;

export type Register = (
  name: string,
  value: FieldValue,
  reset: (formField: Field) => void,
  validate: () => string
) => void;

export type UnRegister = (name: string) => void;

export type Update = (
  name: string,
  value: FieldValue,
  isValidated: boolean,
  errorMessage: string
) => void;

export type GetFormState = () => FormState;

export type ValidateField = (value: string | string[], validatorList: ValidatorType[]) => string;

export interface FormMethods {
  register: Register;
  unRegister: UnRegister;
  update: Update;
  getFormState: GetFormState;
  validateField: ValidateField;
}

export interface FieldObject {
  field: Field;
  methods: FormMethods;
  errorMessage?: string;
}
