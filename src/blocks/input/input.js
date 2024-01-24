import ready from "Utils/documentReady.js";
import $ from "jquery";
import Inputmask from "inputmask";

export default function checkValidateInput(selector) {
  return selector
    .find(".input-field[required]")
    .toArray()
    .every((input) => $(input).hasClass("valid"));
}

$(function () {
  $("input[type='tel']").each(function () {
    new Inputmask("+7 999 999-99-99", {
      placeholder: "+7 ___ ___-__-__",
      showMaskOnHover: false,
    }).mask($(this)[0]);
  });
});

ready(function () {
  const formName = document.querySelectorAll("#form__name");
  const formPhone = document.querySelectorAll("#form__tel");
  const formText = document.querySelectorAll("#form__text");
  const formTextArea = document.querySelectorAll("#form__textarea");
  const formReview = document.querySelectorAll("#form__review");
  const formEmail = document.querySelectorAll("#form__mail");

  createValidFormInput(formName, /^[А-я\s]+$/);
  createValidFormInput(formReview);
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
  function validationForm(el, regex) {
    let value = el.value;
    let re = regex;
    if (value === "") {
      el.classList.remove("invalid");
      el.classList.remove("valid");
      return;
    }

    if (regex === "" && value !== "") {
      el.classList.add("valid");
      return;
    }

    if (re.test(value)) {
      el.classList.remove("invalid");
      el.classList.add("valid");
    } else {
      el.classList.remove("valid");
      el.classList.add("invalid");
    }
    if (Object.is(el.getAttribute("required"), null) && value !== "") {
      el.classList.add("valid");
      return;
    }
  }
  function createValidFormInput(elems, regex = "") {
    elems.forEach((el) => {
      validationForm(el, regex);
      el.addEventListener("input", () => {
        validationForm(el, regex);
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
