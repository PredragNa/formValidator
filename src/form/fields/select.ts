import { FieldObject } from "../form.interface";
import { Base } from "./base";
import $ from "jquery";
import select2Init from "select2";

export default class Select extends Base {
  constructor(options: FieldObject) {
    super(options);
    this.register(
      this.name,
      this.getValue(this.field as HTMLSelectElement),
      this.validators
    );
    select2Init();
    $(this.field)
      .select2()
      .on("select2:select", this.onChange.bind(this))
      .on("select2:unselect", this.onChange.bind(this));
  }

  getValue = (element: HTMLSelectElement) =>
    this.filterSelected(element as HTMLSelectElement);

  filterSelected = (element: HTMLSelectElement) => {
    return Array.from(element.options)
      .map((option) => {
        if (option.selected) {
          return option.value;
        }
        return "";
      })
      .filter((value) => value);
  };
}
