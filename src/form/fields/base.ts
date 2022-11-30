import {
  Field,
  FieldObject,
  GetFormState,
  Register,
  Update,
  ValidatorType
} from "../form.interface";
import getRulesFromField from "../helpers/getRules";
import validate from "../helpers/validate";
import { errorMessageHandler } from "../helpers/messages";

export abstract class Base {
  update: Update;
  name: string;
  validators: ValidatorType[];
  getFormState: GetFormState;
  register: Register;
  field: Field;

  constructor(options: FieldObject) {
    const {
      field,
      methodes: { register, update, getFormState }
    } = options;
    this.update = update;
    this.getFormState = getFormState;
    this.name = field.getAttribute("name") || "";
    this.validators = getRulesFromField(field) || [];
    this.register = register;
    this.field = field;
  }

  abstract getValue(
    element: Element | HTMLSelectElement | HTMLInputElement
  ): string | string[];

  onChange = (event: Event) => {
    const value = this.getValue(event.target as HTMLInputElement);
    const message = validate(this.name, value.toString(), this.validators);
    errorMessageHandler(event.target as Field, message);
    this.update(this.name, value, true, message);
  };
}
