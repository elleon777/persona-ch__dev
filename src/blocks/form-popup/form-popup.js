import $ from "jquery";

$(function () {
  function createPopupToggle(btnEl, popupEl) {
    let currentBtnEl = null;
    if (!btnEl.length) {
      return;
    }
    $(btnEl).on("click", function () {
      $("body").addClass("no-scroll");
      $(popupEl).removeClass("form-popup--hide");
      $(popupEl).addClass("form-popup--show");
      $(popupEl).show();
      if ($(window).width() <= 991) {
        currentBtnEl = $(this);
        $(this).hide();
      }
    });
    $(".form-popup__close").on("click", function () {
      if ($("body").hasClass("no-scroll")) {
        $("body").removeClass("no-scroll");
      }
      $(this).closest(popupEl).removeClass("form-popup--show");
      $(this).closest(popupEl).addClass("form-popup--hide");
      setTimeout(() => {
        $(this).closest(popupEl).hide();
        $(this).closest(popupEl).removeClass("form-popup--hide");
      }, 500);
      if ($(window).width() <= 991) {
        currentBtnEl?.show();
      }
    });
    $(document).on("click", function (e) {
      if (
        $(".form-popup__container").has(e.target).length === 0 &&
        $(popupEl).hasClass("form-popup--show") &&
        !$(e.target).closest(btnEl).is(btnEl)
      ) {
        $(popupEl).removeClass("form-popup--show");
        $(popupEl).addClass("form-popup--hide");
        setTimeout(() => {
          $(popupEl).hide();
          $(popupEl).removeClass("form-popup--hide");
        }, 500);
        if ($(window).width() <= 991) {
          currentBtnEl.show();
        }
        if ($("body").hasClass("no-scroll")) {
          $("body").removeClass("no-scroll");
        }
      }
    });
    $(document).on("keyup", function (e) {
      if (e.key == "Escape" && $(popupEl).hasClass("form-popup--show")) {
        $("body").removeClass("no-scroll");
        $(popupEl).removeClass("form-popup--show");
        $(popupEl).addClass("form-popup--hide");
        setTimeout(() => {
          $(popupEl).hide();
          $(popupEl).removeClass("form-popup--hide");
        }, 500);
        if ($(window).width() <= 991) {
          currentBtnEl?.show();
        }
      }
    });
  }
  createPopupToggle(".form__enroll-open", ".form-enroll__popup");
  createPopupToggle(".form__callback-open", ".form-callback__popup");
  createPopupToggle(".form__review-open", ".form-review__popup");
  createPopupToggle(".form__feedback-open", ".form-feedback__popup");
});
