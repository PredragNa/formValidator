export const rules = {
  required: (value: string) => "" !== value,

  notzero: (value: string) => parseInt(value, 10) > 0,

  integer: (value: string) => new RegExp(/^[0-9]+$/gi).test(value),

  float: (value: number) => {
    const testValue = value.toString().replace(/,/, ".");
    return (
      rules.integer(testValue) ||
      new RegExp(/^([0-9])+(\.)([0-9]+$)/gi).test(testValue)
    );
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
    return new RegExp(/^[a-zA-Z\sа-яА-ЯёЁ-]+$/g).test(value);
  },

  lastname: (value: string) => {
    return rules.name(value);
  },

  phone: (value: string) => {
    const test = value.replace(/[^0-9]+/gi, "").match(/[0-9]+/gi);
    if (test && test[0].length < 6) {
      return false;
    }
    return new RegExp(
      /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/g
    ).test(value);
  },

  email: (value: string) => {
    return new RegExp(
      /^(("[\w-\s]+")|([\w\-]+(?:\.[\w\-]+)*)|("[\w-\s]+")([\w\-]+(?:\.[\w\-]+)*))(@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    ).test(value);
  },

  maxLength: (value: string, ...params: string[]) => {
    return rules.max(value.replace(/\s{2,}/g, " ").length, ...params);
  },

  minLength: (value: string, ...params: string[]) => {
    return rules.min(value.replace(/\s{2,}/g, " ").length, ...params);
  },

  maxFileSize: (value: string, ...params: string[]) => {
    var i,
      l = value.length,
      unitsOffset = 1;

    switch (params[1].toLowerCase()) {
      case "b":
        unitsOffset = 1;
        break;

      case "kb":
        unitsOffset = 1024;
        break;

      case "mb":
        unitsOffset = 1048576;
        break;

      case "gb":
        unitsOffset = 1073741824;
        break;

      case "tb":
        unitsOffset = 1099511627776;
        break;
    }

    for (i = 0; i < l; i += 1) {
      if (parseFloat(value[i]) > parseFloat(params[0]) * unitsOffset) {
        return false;
      }
    }

    return true;
  }
};
