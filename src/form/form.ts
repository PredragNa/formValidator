import FormFieldFactory from "./field.factory";
import {
  FormField,
  FormMethodes,
  FormState,
  ValidatorType
} from "./form.interface";
import validate from "./helpers/validate";
import serialize from "./helpers/serialize";
import { errorMessageHandler } from "./helpers/messages";
import { Field } from "./form.interface";

export default class Form {
  form: HTMLFormElement;
  formState: FormState;
  observer: MutationObserver;

  constructor(form: HTMLFormElement) {
    this.form = form;
    this.formState = {};

    this.form.addEventListener("submit", this.onSubmit.bind(this));

    const formFields = this.filterOnlyVisible();

    const formMethodes: FormMethodes = {
      register: this.register.bind(this),
      update: this.update.bind(this),
      getFormState: () => this.formState,
      unRegister: this.unRegister.bind(this)
    };

    new FormFieldFactory(formFields, formMethodes);

    function callback(mutationRecord) {
      console.log("Number of mutations : ", mutationRecord.length);
      for (let i = 0, len = mutationRecord.length; i < len; i += 1) {
        console.log("target : ", mutationRecord[i].target);
        console.log("type : ", mutationRecord[i].type);
        console.log("attributeName : ", mutationRecord[i].attributeName);
        console.log("oldValue : ", mutationRecord[i].oldValue);
      }
    }
    const target = document.getElementById("form");
    const observer = new MutationObserver(callback);

    const config = {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["class"]
    };

    observer.observe(target, config);
  }

  /**
   * Register form field into form validator mediator
   */
  register = (
    name: string,
    value: string | string[],
    validators: ValidatorType[]
  ) => {
    const { formState } = this;
    formState[name as keyof {}] = {
      ...formState[name as keyof {}],
      value,
      validators,
      validated: false,
      errorMessage: false
    };
    return (this.formState = formState);
  };

  unRegister = (name: string) => {
    const { formState } = this;
    delete formState[name];
    console.log("Form field has been removed: ", formState);
  };

  /**
   * Update field value based on registrated event
   */
  update = (
    name: string,
    value: string | string[],
    isValidated: boolean,
    errorMessage: string
  ) => {
    this.formState[name] = {
      ...this.formState[name],
      value,
      validated: isValidated,
      errorMessage
    };
    console.log("Updated form state: ", this.formState);
  };

  findFormElement = (name: string) =>
    Array.from(this.form.elements).find((element) => {
      const formElement = element as HTMLInputElement | HTMLSelectElement;
      return formElement.name === name;
    });

  filterOnlyVisible = () => <Field[]>Array.from(this.form.elements).filter(
      (element) => {
        return (element as Field).offsetParent !== null;
      }
    );

  dynamicChangeHandler(
    mutationsList: MutationRecord[],
    observer: MutationObserver
  ) {
    console.log(mutationsList);
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const formItems = Object.entries(this.formState).reduce(
      (acc, [key, value]) => {
        const field = this.findFormElement(key) as Field;
        const message = validate(key, value.value.toString(), value.validators);
        errorMessageHandler(field, message);
        return {
          ...acc,
          [key]: {
            ...value,
            validated: true,
            errorMessage: message
          }
        };
      },
      {}
    );
    const formHasError = Object.entries(formItems).some(
      ([key, value]) => (value as FormField).errorMessage !== ""
    );
    this.formState = formItems;

    if (formHasError) {
      console.log("Erorr state", this.formState);
      console.log("===============================");
    }

    if (!formHasError) {
      console.log("Success state", this.formState);
      console.log("===============================");
      const formatedState = serialize(this.formState);
      console.log(formatedState);
    }
  }
}
