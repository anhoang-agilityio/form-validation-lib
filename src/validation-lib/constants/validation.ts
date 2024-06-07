export const DEFAULT_ERROR_MESSAGE = {
  required: 'This field must be required',
  minLength: 'This field is not acquired the minimum length',
  maxLength: 'This field is beyond the maximum length',
  number: 'This field must be a number',
  date: 'This field must be a valid date',
  email: 'This field must be a valid mail',
  phone: 'This field must be a valid phone number',
  regExp: 'This field must follow the pattern',
  minValue: 'This field is not acquired the minimum value',
  maxValue: 'This field is beyond the maximum value',
};

export const INPUT_VALIDATION_RULE = {
  required: 'required',
  minLength: 'minLength',
  maxLength: 'maxLength',
  pattern: 'pattern',
  minValue: 'minValue',
  maxValue: 'maxValue',
  customRule: 'customRule',
} as const;
