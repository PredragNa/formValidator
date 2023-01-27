import FieldFactory from './field.factory';
import {
  FormField, FormMethods, FormState, Field, Register, UnRegister, Update, Message,
} from './form.interface';
import { errorMessageHandler } from './helpers/errorHandler';
import isVisible from './helpers/elements';
import FieldValidator from './helpers/field-validator';
import serialize from './helpers/serialize';

export default class FormValidator {
  form: HTMLFormElement;

  formState: FormState;

  messages: Message;

  onSuccess: (state: FormState) => void;

  onError: () => void;

  constructor(
    form: HTMLFormElement,
    onSuccess: (state: FormState) => void,
    onError: () => void,
  ) {
    this.form = form;
    this.onSuccess = onSuccess;
    this.onError = onError;

    const messages = form.getAttribute('data-messages');

    this.messages = JSON.parse(messages);

    this.formState = {};

    this.form.addEventListener('submit', this.onSubmit.bind(this));

    const fieldFalidator = new FieldValidator(this.messages);

    const formMethods: FormMethods = {
      register: this.register.bind(this),
      update: this.update,
      getFormState: () => this.formState,
      unRegister: this.unRegister,
      validateField: fieldFalidator.validateField,
    };

    (() => new FieldFactory(<Field[]>Array.from(this.form.elements), formMethods))();
  }

  // Register form field
  register: Register = (name, value, reset, validate) => {
    const { formState } = this;
    formState[name as keyof object] = {
      ...formState[name as keyof object],
      value,
      validated: false,
      errorMessage: false,
      reset,
      validate,
    };
    this.formState = formState;
  };

  // Remove field from state
  unRegister: UnRegister = (name) => {
    const { formState } = this;
    delete formState[name];
  };

  // Update field value based on registrated event
  update: Update = (name, value, isValidated, errorMessage) => {
    this.formState[name] = {
      ...this.formState[name],
      value,
      validated: isValidated,
      errorMessage,
    };
  };

  findFormElement = (name: string) => Array.from(this.form.elements).find((element) => {
    const formElement = element as HTMLInputElement | HTMLSelectElement;
    return formElement.name === name;
  });

  onSubmit(e: Event) {
    e.preventDefault();
    // Get only visible fields
    const formState = Object.entries(this.formState).reduce(
      (acc, [key, value]) => {
        const field = this.findFormElement(key) as Field;
        if (isVisible(field)) {
          const message = value.validate();
          errorMessageHandler(field, message);
          return {
            ...acc,
            [key]: {
              ...value,
              validated: true,
              errorMessage: message,
            },
          };
        }
        return acc;
      },
      {},
    );

    const formHasError = Object.entries(formState).some(
      ([, value]) => (value as FormField).errorMessage !== '',
    );

    this.formState = formState;

    if (formHasError) {
      this.onError();
    }

    if (!formHasError) {
      // Run onSucess callback function
      const formated = serialize(this.formState);
      this.onSuccess(formated);
    }
  }
}
