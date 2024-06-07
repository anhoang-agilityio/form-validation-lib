export type FieldElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export type TextField = HTMLInputElement | HTMLTextAreaElement;

export type FieldList = RadioNodeList;

export type FieldGroup = FieldElement | FieldList;
