import { Message, ValidatorType } from '../form.interface';
import formatMessage from './errorHandler';

export default class FieldValidator {
  messages: Message;

  constructor(messages: Message) {
    this.messages = messages;
  }

  validateField = (value: string | string[], validatorList: ValidatorType[]) => {
    let errorFound = false;
    return validatorList.reduce((acc: string, validator: ValidatorType) => {
      if (!errorFound) {
        const { params } = validator;
        const result = validator.rule(value, ...params);
        if (value === '') {
          const errorMessageEmpty = this.messages[validator.rule.name].empty;
          errorFound = true;
          return formatMessage(errorMessageEmpty, params);
        }
        if (result) {
          return acc;
        }
        if (!result) {
          const ruleName = validator.rule.name;
          const errorMessageIncorect = this.messages[ruleName].incorrect;
          errorFound = true;
          return formatMessage(errorMessageIncorect, params);
        }
        return acc;
      }
      return acc;
    }, '');
  };
}
