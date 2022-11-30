import { FormField, FormState } from "../form.interface";
/**
 * Format value from field based on delimiter from field name value
 */
const setPropertyByPath = (
  path: string,
  form: any,
  val: string | number | string[]
) => {
  const parts = path.split(".");
  let prop = form;
  if (parts.length === 1) {
    form[path] = val;
  }
  for (let i = 0; i < parts.length - 1; i++) {
    if (prop[parts[i]] === undefined) {
      prop[parts[i]] = {};
    }
    prop = prop[parts[i]];
  }
  prop[parts[parts.length - 1]] = val;
};

export default (formState: FormState) => {
  const form = {};
  Object.entries(formState).forEach(([key, value]) => {
    setPropertyByPath(key, form, value.value);
  });
  return form;
};
