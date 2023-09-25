import ready from "Utils/documentReady.js";
import $ from "jquery";

export default function checkValidateInput(selector) {
  return selector
    .find(".input-field[required]")
    .toArray()
    .every((input) => $(input).hasClass("valid"));
}

ready(function () {
  const formName = document.querySelectorAll("#form__name");
  const formPhone = document.querySelectorAll("#form__tel");
  const formText = document.querySelectorAll("#form__text");
  const formTextArea = document.querySelectorAll("#form__textarea");
  const formEmail = document.querySelectorAll("#form__mail");

  createValidFormInput(formName, /[А-Яа-я]*?\s[А-Яа-я]*/);
  createValidFormInput(formText, /[А-я]/);
  createValidFormInput(formTextArea, /[А-я]/);
  createValidFormInput(
    formEmail,
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  createValidFormInput(
    formPhone,
    // eslint-disable-next-line no-useless-escape
    /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
  );

  function createValidFormInput(elems, regex) {
    elems.forEach((el) => {
      el.addEventListener("focusout", () => {
        let value = el.value;
        let re = regex;
        if (!el.getAttribute("required") && value !== "") {
          el.classList.add("valid");
          return;
        }
        if (value === "") {
          el.classList.remove("invalid");
          el.classList.remove("valid");
          return;
        }

        if (re.test(value)) {
          el.classList.remove("invalid");
          el.classList.add("valid");
        } else {
          el.classList.remove("valid");
          el.classList.add("invalid");
        }
      });
    });
  }
});

$(function () {
  $(".input-file-field").on("change", function () {
    const file = this.files[0];
    const MAX_SIZE = 10 * 1024 ** 2; // 10mb
    if (file.size > MAX_SIZE) {
      $(this).siblings(".input-file-field")[0].value = "";
      $(this).parent().addClass("invalid");
      $(this).siblings(".input-file-text").text("Прикрепить файл");
      return;
    }
    $(this).siblings(".input-file-text").text(file.name);
    $(this).siblings(".input-file-icon").find("path").eq(0).hide();
  });
  $(".input-file-icon").on("click", function () {
    $(this).find("path").eq(0).show();
    $(this).siblings(".input-file-field")[0].value = "";
    $(this).siblings(".input-file-text").text("Прикрепить файл");
  });
});
