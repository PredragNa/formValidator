import { ValidatorType } from "../form.interface";
import formatMessage, { messages } from "./messages";

export default (
  name: string,
  value: string,
  validatorList: ValidatorType[]
) => {
  let errorFound = false;
  return validatorList.reduce((acc, validator: ValidatorType) => {
    if (!errorFound) {
      const params = validator.params;
      const result = validator.rule(value, ...params);
      if (value === "") {
        const errorMessageEmpty =
          messages[validator.rule.name as keyof {}]["empty"];
        errorFound = true;
        return formatMessage(errorMessageEmpty, params);
      }
      if (result) {
        return acc;
      }
      if (!result) {
        const ruleName = validator.rule.name;
        const errorMessageIncorect =
          messages[ruleName as keyof {}]["incorrect"];
        errorFound = true;
        return formatMessage(errorMessageIncorect, params);
      }
      return acc;
    }
    return acc;
  }, "");
};
