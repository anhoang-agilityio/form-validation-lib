import { DEFAULT_ERROR_MESSAGE } from '../constants';
import {
  FormError,
  ValidationRule,
  ValidationRule,
  CustomValidationRule,
  CustomValidationValue,
} from '../types';

type paramType = {
  formError: FormError;
  fieldName: string;
  constraint: string;
  rule:
    | Exclude<
        ValidationRule[keyof ValidationRule],
        CustomValidationRule | undefined
      >
    | CustomValidationValue;
};

export const updateFormError = ({
  formError,
  fieldName,
  constraint,
  rule,
}: paramType): void => {
  formError[fieldName] = {
    ...formError[fieldName],
    [constraint]:
      typeof rule === 'object' && rule.message
        ? rule.message
        : DEFAULT_ERROR_MESSAGE[
            constraint as Exclude<keyof ValidationRule, 'customRules'>
          ],
  };
};
