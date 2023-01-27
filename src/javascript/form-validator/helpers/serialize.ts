import { FieldValue, FormState } from '../form.interface';
/**
 * Format value from field based on delimiter from field name value
 */
const setPropertyByPath = (
  obj: object,
  path: string,
  value: FieldValue,
): object => {
  const [head, ...rest] = path.split('.');

  return {
    ...obj,
    [head]: rest.length
      ? setPropertyByPath(obj[head as keyof object], rest.join('.'), value)
      : value,
  };
};

export default (formState: FormState) => {
  let form = {};
  Object.entries(formState).forEach(([key, value]) => {
    form = setPropertyByPath(form, key, value.value);
  });
  return form;
};
