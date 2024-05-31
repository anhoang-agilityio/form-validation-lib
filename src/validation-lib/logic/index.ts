import { validateRequired } from './validateRequired';
import { validateMinLength } from './validateMinLength';
import { validateMaxLength } from './validateMaxLength';
import { validateNumberType } from './validateNumberType';
import { validateMinValue } from './validateMinValue';
import { validateMaxValue } from './validateMaxValue';
import { validateDate } from './validateDate';
import { validateMail } from './validateMail';
import { validatePhone } from './validatePhone';
import { validatePattern } from './validatePattern';
import { validateCustomRules } from './validateCustomRules';
import { INPUT_VALIDATION_RULES } from '../constants';
import { FieldValidationParam, InputValidationRules } from '../types';

const _dictionary = {
  required: validateRequired,
  minLength: validateMinLength,
  maxLength: validateMaxLength,
  valueAsNumber: validateNumberType,
  min: validateMinValue,
  max: validateMaxValue,
  valueAsDate: validateDate,
  valueAsMail: validateMail,
  valueAsPhone: validatePhone,
  pattern: validatePattern,
  customRules: validateCustomRules,
};

export const validateField = async (param: FieldValidationParam) => {
  for (const constraint of Object.keys(param.rule)) {
    if (constraint === INPUT_VALIDATION_RULES.customRules) {
      await validateCustomRules(param);
    } else {
      _dictionary[constraint as keyof InputValidationRules](param);
    }
  }
};
