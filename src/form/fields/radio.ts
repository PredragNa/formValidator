import { FieldObject } from "../form.interface";
import { Base } from "./base";

export default class Radio extends Base {
  constructor(options: FieldObject) {
    super(options);

    this.register(this.name, this.getValue(this.field), this.validators);

    // Update on Change
    this.field.addEventListener("change", this.onChange);
  }

  getValue = (element: Element) => (element as HTMLInputElement).value;
}
