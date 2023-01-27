import { rules } from './rules';
import { ValidatorType } from '../form.interface';

export default (field: Element) => {
  const definedRules = field.getAttribute('data-rule');
  if (definedRules?.length) {
    const rulesList = definedRules.split('|');
    return rulesList.reduce<ValidatorType[]>((acc, currentRuleDefinition) => {
      const ruleParams = currentRuleDefinition.split('-');
      const currentRule = ruleParams[0];
      const currentParams = ruleParams.splice(1);
      return [
        ...acc,
        {
          rule: rules[currentRule as keyof object],
          params: currentParams,
        },
      ];
    }, []);
  }
  return [];
};
