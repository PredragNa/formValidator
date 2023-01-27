import {
  ERROR_CLASSNAME,
  FIELD_CLASSNAME,
  FORM_MESSAGE_CLASSNAME,
  ICON_ERROR,
  ICON_SUCCESS,
  INFO_ICON_CLASSNAME,
  SUCCESS_CLASSNAME,
} from '../form-validator.constants';

import { Field } from '../form.interface';

// apply message text, add/remove error classes
export const errorMessageHandler = (field: Field, message: string) => {
  const formField = field.closest(`.${FIELD_CLASSNAME}`);
  if (formField) {
    const infoIcon = formField.querySelector(`.${INFO_ICON_CLASSNAME}`);
    const errorMessageElement = formField.querySelector(`.${FORM_MESSAGE_CLASSNAME}`);
    if (errorMessageElement) {
      if (message) {
        formField?.classList.add(ERROR_CLASSNAME);
        infoIcon?.classList.add(ICON_ERROR);
        infoIcon?.classList.remove(ICON_SUCCESS);

        errorMessageElement.textContent = message;
        return;
      }

      formField?.classList.remove(ERROR_CLASSNAME);
      infoIcon?.classList.remove(ICON_ERROR);
      formField?.classList.add(SUCCESS_CLASSNAME);
      infoIcon?.classList.add(ICON_SUCCESS);
      errorMessageElement.textContent = '';
    }
  }
};

// Format error
export default (string: string, params: string[]) => string.replace(/\{(\d+)\}/gi, (match, number) => (match && params[number] ? params[number] : ''));
