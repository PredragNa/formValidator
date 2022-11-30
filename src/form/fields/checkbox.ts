import { FieldObject } from "../form.interface";
import { Base } from "./base";

export default class Checkbox extends Base {
  constructor(options: FieldObject) {
    super(options);
    this.register(this.name, this.getValue(this.field), this.validators);

    // Update on Change
    this.field.addEventListener("change", this.onChange);
  }

  getValue = (element: Element) => {
    const { getFormState } = this;
    const isChecked = (element as HTMLInputElement).checked;
    const value = (element as HTMLInputElement).value;
    const form = getFormState();
    let listOfValues = (form[this.name]
      ? form[this.name].value
      : []) as string[];
    if (isChecked) {
      if (!listOfValues) {
        return [value];
      }
      return [...listOfValues, value];
    }

    if (!isChecked && !listOfValues) {
      return [""];
    }

    return [...listOfValues].filter((listValue) => listValue !== value);
  };
}
