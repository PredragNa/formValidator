import { FieldObject } from "../form.interface";
import { Base } from "./base";
import validate from "../helpers/validate";
import { errorMessageHandler } from "../helpers/messages";

var Slider = require("bootstrap-slider");

export default class Range extends Base {
  slider: any;

  constructor(options: FieldObject) {
    super(options);
    this.slider = new Slider(this.field);

    this.register(this.name, this.getValue(), this.validators);

    this.slider.on("change", this.onChange);
  }

  getValue = () => this.slider.getValue();

  onChange = () => {
    const value = this.getValue();
    const message = validate(this.name, value.toString(), this.validators);
    errorMessageHandler(this.field as HTMLInputElement, message);
    this.update(this.name, value, true, message);
  };
}
