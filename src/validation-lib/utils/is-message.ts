import { Message } from '../types';

export const isMessage = (value: unknown): value is Message =>
  typeof value === 'string';
