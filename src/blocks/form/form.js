import $ from "jquery";
import checkValidateSend from "../form-send/form-send";

$(function () {
  $(".form")
    .find(".input-field")
    .on("input", function () {
      setTimeout(() => {
        checkValidateSend($(this).closest(".form"));
      }, 0);
    });
  $(".form")
    .find(".form-checkbox")
    .on("change", "input[type='checkbox']", function () {
      checkValidateSend($(this).closest(".form"));
    });
  $(".form")
    .on("change", "select", function () {
      checkValidateSend($(this).closest(".form"));
    });
});
