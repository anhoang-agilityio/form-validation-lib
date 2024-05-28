type ValidationResponseRule = {
  responseElement: HTMLElement;
  message?: string;
  className?: string[] | string;
  style?: CSSStyleDeclaration;
};

type ValidationResponse = Partial<
  Record<'validResponse' | 'errorResponse', ValidationResponseRule>
>;

type ValidationOption<Type extends boolean | number | RegExp> =
  | Type
  | ({ value: Type } & ValidationResponse);

type CustomRules = Record<
  string,
  {
    validationFunc: (...args: any[]) => boolean; // return true if valid, otherwise false
  } & ValidationResponse
>;

type ValidationOptions = Partial<{
  required: ValidationOption<boolean>;
  minLength: ValidationOption<number>;
  maxLength: ValidationOption<number>;
  min: ValidationOption<number>;
  max: ValidationOption<number>;
  pattern: ValidationOption<RegExp>;
  valueAsNumber: ValidationOption<boolean>;
  valueAsDate: ValidationOption<boolean>;
  customRules: CustomRules;
  validationEvent: 'change' | 'blur' | 'submit';
}>;

interface HTMLInputElement {
  registerValidation: (options: ValidationOptions) => void;
}
