import {
  CustomValidationRules,
  FormValidationConfig,
  ValidationOption,
  ValidationOptions,
} from './types';

HTMLFormElement.prototype.registerValidation = function (
  config: FormValidationConfig,
): void {
  const defaultConfig: FormValidationConfig = {
    validationStrategy: 'submit',
    revalidationStrategy: 'input',
    disableSubmitButton: false,
    shouldFocusError: true,
    integrateWithNativeValidation: true,
  };

  const finalConfig = Object.assign(defaultConfig, config);

  // handle states of subscribed inputs
  // form validate function: return 1. isValid 2. errors of each subscribed input
  // registered input validate function: return 1. isValid 2.error: type & message => save on private obj and expose by getters
  // for example, when submitting, first preventDefault(), then call formValidate() => return an object ...
  // how to mark a form element as invalid state
  // validate() function of inputs: call each constraintValidate() function => return an object reflect valid/invalid state of input
  // constraintValidate(): 1 for each constraint: required, minLength, maxLength,...
  // when validate() function of an input is called: update input state object - then change style of input
  // how to change style ??? a function: 2 types of function: validRespond & invalidRespond: param: ResponseObj --- return: void
  // what change style function do: update class - update inline style - change text
  // we cannot change the native input state as valid / invalid to match respective pseudo classes. There is no way to do that, even in react-hook-form
  // so three things above are all our changing style functions do
  // cannot integrate with native validation: because collecting its type of issue is hard ???
  // should we need type of issues ? what do we do with it ? simply no currently
  // what do we do with multiple forms subscription ??? --> save the best for the last :')
  // things back to build state objects: the flow ???
  // our target is
};

HTMLInputElement.prototype.registerValidation = (options) => {
  for (const constraint of Object.keys(options)) {
    const value = options[constraint as keyof ValidationOptions];
    if (value === undefined) continue;
    switch (constraint) {
      case 'required':
        if (typeof value === 'boolean') {
          if (value) {
          }
        }
    }
  }
};
