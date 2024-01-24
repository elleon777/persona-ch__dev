import checkValidateCheckbox from "../form-checkbox/form-checkbox.js";
import checkValidateSelect from "../form-select/form-select.js";
import checkValidateInput from "../input/input.js";

function checkValidate(selector) {
  return (
    checkValidateInput(selector) &&
    checkValidateCheckbox(selector) &&
    checkValidateSelect(selector)
  );
}

function checkValidateSend(selector) {
  // checkValidate(selector);
  if (checkValidate(selector)) {
    selector.find(".form-send").removeAttr("disabled");
  } else {
    selector.find(".form-send").attr("disabled", "disabled");
  }
}

export default checkValidateSend;
