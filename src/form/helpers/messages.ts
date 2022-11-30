import { Field } from "../form.interface";

export const messages = {
  required: {
    empty: "This field is required",
    incorrect: "Incorrect value"
  },
  notzero: {
    empty: "Please make a selection",
    incorrect: "Incorrect value"
  },
  integer: {
    empty: "Enter an integer value",
    incorrect: "Incorrect integer value"
  },
  float: {
    empty: "Enter an float number",
    incorrect: "Incorrect float"
  },
  min: {
    empty: "Enter more",
    incorrect: "Enter more"
  },
  max: {
    empty: "Enter less",
    incorrect: "Enter less"
  },
  between: {
    empty: "Enter the between {0}-{1}",
    incorrect: "Enter the between {0}-{1}"
  },
  name: {
    empty: "Please, enter your name",
    incorrect: "Incorrect name"
  },
  lastname: {
    empty: "Please, enter your lastname",
    incorrect: "Incorrect lastname"
  },
  phone: {
    empty: "Please, enter the phone number",
    incorrect: "Incorrect phone number"
  },
  email: {
    empty: "Please, enter your email address",
    incorrect: "Incorrect email address"
  },
  length: {
    empty: "Please, Enter a minimum of {0} characters and a maximum of {1}",
    incorrect:
      "Incorrect. Enter a minimum of {0} characters and a maximum of {1}"
  },
  minLength: {
    empty: "Please, enter at least {0} characters",
    incorrect: "You have entered less than {0} characters"
  },
  maxLength: {
    empty: "Please, enter at maximum {0} characters",
    incorrect: "You have entered more than {0} characters"
  },
  maxFileSize: {
    empty: "The size of one or more selected files larger than {0} {1}",
    incorrect: "The size of one or more selected files larger than {0} {1}"
  },
  fileExtension: {
    empty: "Select file",
    incorrect: "One or more files have an invalid type"
  }
};

export const errorMessageHandler = (field: Field, message: string) => {
  const formField = field.closest(".js-field");
  if (formField) {
    const errorMessageElement = formField.querySelector(".js-form-message");
    if (errorMessageElement) {
      if (message) {
        formField.classList.add("has-error");
        return (errorMessageElement.textContent = message);
      }

      formField.classList.remove("has-error");
      return (errorMessageElement.textContent = "");
    }
  }
};

export const hideErrorMessage = (field: HTMLFormElement) => {
  const formField = field.closest(".js-field");
  if (formField) {
    formField.classList.remove("has-error");
  }
};

export default (string: string, params: string[]) => {
  return string.replace(/\{(\d+)\}/gi, (match, number) => {
    return match && params[number] ? params[number] : "";
  });
};
