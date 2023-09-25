import $ from "jquery";

$(function () {
  $(".time-popup__open").on("click", function () {
    $("body").addClass("no-scroll");
    $(".header").find(".time-popup").removeClass("time-popup--hide");
    $(".header").find(".time-popup").addClass("time-popup--show");
    $(".header").find(".time-popup").show();
  });
  $(".time-popup__close").on("click", function () {
    if ($("body").hasClass("no-scroll")) {
      $("body").removeClass("no-scroll");
    }
    $(".time-popup").removeClass("time-popup--show");
    $(".time-popup").addClass("time-popup--hide");
    setTimeout(() => {
      $(".time-popup").hide();
      $(".time-popup").removeClass("form-popup--hide");
    }, 500);
  });
  $(document).on("click", function (e) {
    if (
      !$(".time-popup").is(e.target) &&
      !$(e.target).closest(".time-popup__open").is(".time-popup__open") &&
      $(".time-popup").has(e.target).length === 0 &&
      $(".time-popup").hasClass("time-popup--show")
    ) {
      if ($("body").hasClass("no-scroll")) {
        $("body").removeClass("no-scroll");
      }
      $(".time-popup").removeClass("time-popup--show");
      $(".time-popup").addClass("time-popup--hide");
      setTimeout(() => {
        $(".time-popup").hide();
        $(".time-popup").removeClass("form-popup--hide");
      }, 500);
    }
  });
  $(document).on("keyup", function (e) {
    if (e.key == "Escape" && $(".time-popup").hasClass("time-popup--show")) {
      if ($("body").hasClass("no-scroll")) {
        $("body").removeClass("no-scroll");
      }
      $(".time-popup").removeClass("time-popup--show");
      $(".time-popup").addClass("time-popup--hide");
      setTimeout(() => {
        $(".time-popup").hide();
        $(".time-popup").removeClass("form-popup--hide");
      }, 500);
    }
  });
});
