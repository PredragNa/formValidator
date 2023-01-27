import {
  Field,
  FieldObject,
  GetFormState,
  Register,
  Update,
  ValidateField,
  ValidatorType,
} from '../form.interface';
import getRulesFromField from '../helpers/getRules';
import { errorMessageHandler } from '../helpers/errorHandler';
import { ERROR_CLASSNAME, FIELD_CLASSNAME } from '../form-validator.constants';

export default abstract class Base {
  update: Update;

  name: string;

  validators: ValidatorType[];

  getFormState: GetFormState;

  register: Register;

  validateField: ValidateField;

  field: Field;

  constructor(options: FieldObject) {
    const {
      field,
      methods: {
        register, update, getFormState, validateField,
      },
    } = options;
    this.update = update;
    this.getFormState = getFormState;
    this.name = field.getAttribute('name') || '';
    this.validators = getRulesFromField(field) || [];
    this.register = register;
    this.field = field;
    this.validateField = validateField;
  }

  abstract getValue(): string | string[] | FileList;

  abstract validate(): string;

  onChange = (field: Field) => {
    const value = this.getValue();
    const message = this.validate();
    errorMessageHandler(field, message);
    this.update(this.name, value, true, message);
  };

  reset() {
    const formField = this.field.closest(`.${FIELD_CLASSNAME}`) as HTMLElement;
    if (formField) {
      formField.classList.remove(ERROR_CLASSNAME);
    }
    this.update(this.name, '', false, '');
  }
}
