export const isRegexp = (value: unknown): value is RegExp =>
  value instanceof RegExp;
