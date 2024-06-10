import {
  DefaultErrorMessage,
  InputValidationRule,
  SyncValidationConfig,
  SyncValidationRule,
  ValidationConfig,
  ValidationRule,
} from '../types';
import { DEFAULT_ERROR_MESSAGE, INPUT_VALIDATION_RULE } from '../constants';
import { isMessage, isObject, isRegexp } from '../utils';

export const refactorValidationConfig = (config: ValidationConfig) => {
  return Object.entries(config).reduce((result, [name, rule]) => {
    result[name] = refactorRule(rule);
    return result;
  }, {} as SyncValidationConfig);
};

const refactorRule = (rule: ValidationRule) => {
  // reorder keys
  const reorderedRule = reorderObjectKey(
    rule,
    Object.keys(INPUT_VALIDATION_RULE) as (keyof InputValidationRule)[],
  );
  // sync validation value
  return syncValidationValue(reorderedRule);
};

const reorderObjectKey = <T extends object>(obj: T, keys: (keyof T)[]): T => {
  return keys.reduce((result, key) => {
    if (obj[key]) result[key] = obj[key];
    return result;
  }, {} as T);
};

const syncValidationValue = (rule: ValidationRule): SyncValidationRule => {
  return Object.entries(rule).reduce((result, [name, validationData]) => {
    // get error message type
    const errMsgType = (
      name !== 'pattern'
        ? name
        : isRegexp(rule.pattern)
          ? 'regExp'
          : isObject(rule.pattern)
            ? rule.pattern.value
            : rule.pattern
    ) as keyof DefaultErrorMessage;
    // get default error message by name / pattern
    const defaultErrMsg = getDefaultErrorMessage(errMsgType);
    // sync validation data to object
    // @ts-ignore
    result[name] =
      name !== 'pattern' && isMessage(validationData)
        ? {
            value: true,
            message: validationData,
          }
        : isObject(validationData) && !isRegexp(validationData)
          ? validationData
          : {
              value: validationData,
              message: defaultErrMsg, // default message
            };
    return result;
  }, {} as SyncValidationRule);
};

const getDefaultErrorMessage = (name: keyof DefaultErrorMessage) =>
  DEFAULT_ERROR_MESSAGE[name];
