/* eslint-disable no-new */
import Text from './fields/text';
import { FieldObject, Field, FormMethods } from './form.interface';
import { FieldType } from './form-validator.constants';

const create = (options: FieldObject) => {
  const type = options.field.getAttribute('type');
  const name = options.field.getAttribute('name');
  if (name && type) {
    switch (type) {
      case FieldType.TEXT:
      case FieldType.PASSWORD:
      case FieldType.EMAIL:
        new Text(options);
        break;
      default:
      { /* empty */ }
    }
  }
};

export default class {
  constructor(fields: Field[], methods: FormMethods) {
    fields.forEach((field) => {
      create({
        field: field as HTMLInputElement | HTMLSelectElement,
        methods,
      });
    });
  }
}
