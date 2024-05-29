export const DEFAULT_MESSAGE = {
  required: 'This field must be required',
  minLength: 'This field is not acquired the minimum length',
  maxLength: 'This field is beyond the maximum length',
  valueAsNumber: 'This field must be a number',
  min: 'This field is not acquired the minimum value',
  max: 'This field is beyond the maximum value',
  valueAsDate: 'This field must be a date',
  valueAsMail: 'This field must be a mail',
  pattern: 'This field must follow the pattern',
};

export const INPUT_VALIDATION_RULES = {
  required: 'required',
  minLength: 'minLength',
  maxLength: 'maxLength',
  valueAsNumber: 'valueAsNumber',
  min: 'min',
  max: 'max',
  valueAsDate: 'valueAsDate',
  valueAsMail: 'valueAsMail',
  pattern: 'pattern',
  customRules: 'customRules',
} as const;
