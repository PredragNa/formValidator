import Base from './base';
import { FieldObject } from '../form.interface';

export default class Text extends Base {
  constructor(options: FieldObject) {
    super(options);
    this.register(
      this.name,
      this.getValue(),
      this.reset,
      this.validate,
    );

    // Update on Change
    this.field.addEventListener('change', (event) => this.onChange(event.target as HTMLInputElement));
  }

  getValue = () => this.field.value;

  validate = () => this.validateField(this.getValue(), this.validators);

  reset = () => {
    this.field.value = '';
    super.reset();
  };
}
