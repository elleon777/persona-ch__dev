import checkValidateCheckbox from "../form-checkbox/form-checkbox.js";
import checkValidateInput from "../input/input.js";

function checkValidateSend(selector) {
  checkValidateInput(selector) && checkValidateCheckbox(selector);
  if (checkValidateInput(selector) && checkValidateCheckbox(selector)) {
    selector.find(".form-send").removeAttr("disabled");
  } else {
    selector.find(".form-send").attr("disabled", "disabled");
  }
}

export default checkValidateSend;
