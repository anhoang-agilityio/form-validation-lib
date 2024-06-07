import { validateRequired } from './validateRequired';
import { validateMinLength } from './validateMinLength';
import { validateMaxLength } from './validateMaxLength';
import { validateMinValue } from './validateMinValue';
import { validateMaxValue } from './validateMaxValue';
import { validatePattern } from './validatePattern';
import { validateCustomRule } from './validateCustomRule.ts';
import { INPUT_VALIDATION_RULE } from '../constants';
import { FieldValidationParam, ValidationRule } from '../types';

const _dictionary = {
  required: validateRequired,
  minLength: validateMinLength,
  maxLength: validateMaxLength,
  pattern: validatePattern,
  minValue: validateMinValue,
  maxValue: validateMaxValue,
  customRule: validateCustomRule,
};

export const validateField = async (param: FieldValidationParam) => {
  for (const constraint of Object.keys(param.rule)) {
    if (constraint === INPUT_VALIDATION_RULE.customRule) {
      await validateCustomRule(param);
    } else {
      _dictionary[constraint as keyof ValidationRule](param);
    }
  }
};
