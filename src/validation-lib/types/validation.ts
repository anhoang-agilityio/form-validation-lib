import { DEFAULT_ERROR_MESSAGE, INPUT_VALIDATION_RULE } from '../constants';

export type InputValidationRule = typeof INPUT_VALIDATION_RULE;

export type DefaultErrorMessage = typeof DEFAULT_ERROR_MESSAGE;

export type Message = string;

export type Pattern = 'email' | 'number' | 'date' | 'phone' | RegExp;

export type ValidationFunc = (value: string) => boolean | Promise<boolean>; // return true if valid, otherwise false

type ValidationValue = boolean | string | number | Pattern | ValidationFunc;

export type ValidationValueMessage<
  TValidationValue extends ValidationValue = ValidationValue,
> = {
  value: TValidationValue;
  message: string;
};

export type ValidationRule = Partial<{
  required: boolean | string | ValidationValueMessage<boolean>;
  minLength: number | ValidationValueMessage<number>;
  maxLength: number | ValidationValueMessage<number>;
  pattern: Pattern | ValidationValueMessage<Pattern>;
  minValue: number | ValidationValueMessage<number>;
  maxValue: number | ValidationValueMessage<number>;
  customRule: ValidationValueMessage<ValidationFunc>;
}>;

export type SyncValidationRule = Partial<{
  required: ValidationValueMessage<boolean>;
  minLength: ValidationValueMessage<number>;
  maxLength: ValidationValueMessage<number>;
  pattern: ValidationValueMessage<Pattern>;
  minValue: ValidationValueMessage<number>;
  maxValue: ValidationValueMessage<number>;
  customRule: ValidationValueMessage<ValidationFunc>;
}>;

export type ValidationConfig = Record<string, ValidationRule>;

export type SyncValidationConfig = Record<string, SyncValidationRule>;

export type FieldError = {
  type: string;
  message: string;
};

export type FormError = Partial<Record<string, FieldError>>;
