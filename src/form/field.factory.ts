import Text from "./fields/text";
import Checkbox from "./fields/checkbox";
import Radio from "./fields/radio";
import Range from "./fields/range";
import { FieldObject, Field, FormMethodes } from "./form.interface";
import Select from "./fields/select";

export default class {
  constructor(fields: Field[], methodes: FormMethodes) {
    fields.forEach((field) => {
      this.create({
        field: field as HTMLInputElement | HTMLSelectElement,
        methodes
      });
    });
  }

  create(options: FieldObject) {
    const type = options.field.getAttribute("type");
    const name = options.field.getAttribute("name");
    if (name && type) {
      switch (type) {
        case "text":
        case "password":
        case "email":
          new Text(options);
          break;
        case "checkbox":
          new Checkbox(options);
          break;
        case "radio":
          new Radio(options);
          break;
        case "select-one":
        case "select-multiple":
          new Select(options);
          break;
        case "range":
          new Range(options);
          break;
        default:
          console.log(`There is no field with type: ${type}.`);
      }
    }
  }
}
