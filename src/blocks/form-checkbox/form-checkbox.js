function checkValidateCheckbox(selector) {
  return selector
    .find(".form-checkbox input[type='checkbox']")
    .prop("checked");
}


export default checkValidateCheckbox;
