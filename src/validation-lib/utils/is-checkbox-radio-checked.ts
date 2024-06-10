export const isCheckboxRadioChecked = (
  field: HTMLInputElement | RadioNodeList,
) => {
  if (field instanceof RadioNodeList) {
    for (const option of field) {
      if (option instanceof HTMLInputElement && option.checked) return true;
    }
    return false;
  }
  return field.checked;
};
