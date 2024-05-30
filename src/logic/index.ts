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

export default {
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
