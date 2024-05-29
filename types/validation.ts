//   Required Field Validation: Determine if a field is mandatory.
//   String Length Validation: Ensure the input string length is within the allowed range.
//   Email Format Validation: Verify if the email is in the correct format.
//   Phone Number Validation: Verify if the phone number is in the correct format.
//   Numeric Value Validation: Ensure the input value is a number and within the allowed range.
//   Date Value Validation: Ensure the input value is a valid date.
//   Custom Validation: Allow users to define custom validation functions

type CustomValidationRules = Record<
  string,
  {
    validationFunc: (...args: any[]) => boolean | Promise<boolean>; // return true if valid, otherwise false
    message: string;
  }
>;

type ValidationMessage = {
  message?: string;
};

export type ValidationConfig = Partial<{
  required: ValidationMessage;
  minLength: { value: number } & ValidationMessage;
  maxLength: { value: number } & ValidationMessage;
  valueAsNumber: ValidationMessage;
  min: { value: number } & ValidationMessage;
  max: { value: number } & ValidationMessage;
  valueAsDate: ValidationMessage;
  valueAsMail: { value: true } & ValidationMessage;
  pattern: { pattern: RegExp } & ValidationMessage;
  customRules: CustomValidationRules;
}>;

export type FormError = Partial<Record<string, Record<string, string>>>;

export type ValidateFunc = () => FormError;
