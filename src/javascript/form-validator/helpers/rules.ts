// eslint-disable-next-line import/prefer-default-export
export const rules = {
  required: (value: string | string[]) => value !== '' && value.length !== 0,

  notzero: (value: string) => parseInt(value, 10) > 0,

  integer: (value: string) => /^[0-9]+$/gi.test(value),

  float: (value: string | number) => {
    if (
      typeof value === 'number'
      && !Number.isNaN(value)
      && !Number.isInteger(value)
    ) {
      return true;
    }

    return false;
  },

  min: (value: number, ...params: string[]) => {
    if (rules.float(value)) {
      return value >= parseFloat(params[0]);
    }
    return value >= parseInt(params[0], 10);
  },

  max: (value: number, ...params: string[]) => {
    if (rules.float(value)) {
      return value <= parseFloat(params[0]);
    }
    return value <= parseInt(params[0], 10);
  },

  name: (value: string) => {
    if (value.length > 0 && value.length < 2) {
      return false;
    }

    return /^[a-zA-Z\sа-яА-ЯёЁ-]+$/g.test(value);
  },

  lastname: (value: string) => rules.name(value),

  phone: (value: string) => {
    const test = value.replace(/[^0-9]+/gi, '').match(/[0-9]+/gi);
    if (test && test[0].length < 6) {
      return false;
    }

    return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(value);
  },

  email: (value: string) => /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value),

  maxLength: (value: string, ...params: string[]) => rules.max(value.replace(/\s{2,}/g, ' ').length, ...params),

  minLength: (value: string, ...params: string[]) => rules.min(value.replace(/\s{2,}/g, ' ').length, ...params),

  maxFileSize: (value: string, ...params: string[]) => {
    const valueInNumber = parseInt(value, 10);
    const valueTarget = params[0];
    let unitsOffset = 1;

    switch (params[1].toLowerCase()) {
      case 'b':
        unitsOffset = 1;
        break;

      case 'kb':
        unitsOffset = 1024;
        break;

      case 'mb':
        unitsOffset = 1048576;
        break;

      case 'gb':
        unitsOffset = 1073741824;
        break;

      case 'tb':
        unitsOffset = 1099511627776;
        break;
      default: unitsOffset = 1;
    }
    if ((valueInNumber / unitsOffset) < parseInt(valueTarget, 10)) {
      return true;
    }

    return false;
  },

  fileExtension(extension: string, ...params: string[]) {
    return params.includes(extension.toLowerCase());
  },

  between: (value: string, ...params: string[]) => {
    const isFloatNumber = rules.float(value);
    const isInteger = rules.integer(value);

    if (isFloatNumber) {
      const floatValue = parseFloat(value);
      const minValue = parseFloat(params[0]);
      const maxValue = parseFloat(params[1]);
      return floatValue >= minValue
        && floatValue <= maxValue;
    }
    if (isInteger) {
      const integerValue = parseInt(value, 10);
      const minValue = parseInt(params[0], 10);
      const maxValue = parseInt(params[1], 10);
      return integerValue >= minValue && integerValue <= maxValue;
    }
    return false;
  },
};
