export type ValidationResponseRule = {
  responseElement: HTMLElement;
  message?: string;
  className?: string[] | string | (() => void);
  style?: CSSStyleDeclaration;
};

export type ValidationResponse = Partial<
  Record<'validResponse' | 'inValidResponse', ValidationResponseRule>
>;

export type ValidationOption<Type extends boolean | number | RegExp> =
  | Type
  | ({ value: Type } & ValidationResponse);

export type CustomValidationRules = Record<
  string,
  {
    validationFunc: (...args: any[]) => boolean | Promise<boolean>; // return true if valid, otherwise false
  } & ValidationResponse
>;

export type ValidationOptions = Partial<{
  required: ValidationOption<boolean>;
  minLength: ValidationOption<number>;
  maxLength: ValidationOption<number>;
  min: ValidationOption<number>;
  max: ValidationOption<number>;
  pattern: ValidationOption<RegExp>;
  valueAsNumber: ValidationOption<boolean>;
  valueAsDate: ValidationOption<boolean>;
  valueAsMail: ValidationOption<boolean>;
  customRules: CustomValidationRules;
}>;

export type FormValidationConfig = Partial<{
  validationStrategy: 'input' | 'change' | 'submit';
  revalidationStrategy: 'input' | 'change' | 'submit';
  disableSubmitButton: boolean;
  shouldFocusError: boolean;
  integrateWithNativeValidation: boolean;
}>;

export type ErrorObj = {
  type: string;
  message: string;
};

declare global {
  interface HTMLFormElement {
    registerValidation: (config: FormValidationConfig) => void;
    validate: () => {
      formValue: object;
      formError: null | Record<string, ErrorObj>;
    };
  }

  interface HTMLInputElement {
    registerValidation: (options: ValidationOptions) => void;
    validate: () => { value: string; error: null | ErrorObj };
  }
}
