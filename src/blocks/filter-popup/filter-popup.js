import $ from "jquery";

$(function () {
  if ($(".filter-popup").length) {
    let showClass = null;
    let hideClass = null;
    if ($(".filter-popup").css("right") !== "auto") {
      showClass = "filter-popup--rightShow";
      hideClass = "filter-popup--rightHide";
    } else {
      showClass = "filter-popup--leftShow";
      hideClass = "filter-popup--leftHide";
    }
    // $(".detail__filter").on("click", ".filter-popup--open", function () {
    //   $("body").addClass("no-scroll");
    //   $("body").append($(".filter-popup"));
    //   $(".filter-popup").removeClass(hideClass);
    //   $(".filter-popup").addClass(showClass);
    //   $(".filter-popup").show();
    // });
    $(".filter-popup__close").on("click", function () {
      if ($("body").hasClass("no-scroll")) {
        $("body").removeClass("no-scroll");
      }
      $(".filter-popup").removeClass(showClass);
      $(".filter-popup").addClass(hideClass);
      setTimeout(() => {
        $(".filter-popup").hide();
        $(".filter-popup").removeClass(hideClass);
      }, 400);
    });

    $(document).on("click", function (e) {
      if ($(".filter-popup--open").is(e.target)) {
        if (!$("body").children(".filter-popup").length) {
          $("body").append($(".filter-popup"));
        }
        $("body").addClass("no-scroll");
        $(".filter-popup").removeClass(hideClass);
        $(".filter-popup").addClass(showClass);
        $(".filter-popup").show();
      }
      if (
        !$(".filter-popup").is(e.target) &&
        $(".filter-popup").has(e.target).length === 0 &&
        !$(".filter-popup--open").is(e.target)
      ) {
        if ($("body").hasClass("no-scroll")) {
          $("body").removeClass("no-scroll");
        }
        $(".filter-popup").removeClass(showClass);
        $(".filter-popup").addClass(hideClass);
        setTimeout(() => {
          $(".filter-popup").hide();
          $(".filter-popup").removeClass(hideClass);
        }, 400);
      }
    });
    $(document).on("keyup", function (e) {
      if (e.key == "Escape" && $(".filter-popup").hasClass(showClass)) {
        if ($("body").hasClass("no-scroll")) {
          $("body").removeClass("no-scroll");
        }
        $(".filter-popup").removeClass(showClass);
        $(".filter-popup").addClass(hideClass);
        setTimeout(() => {
          $(".filter-popup").hide();
          $(".filter-popup").removeClass(hideClass);
        }, 400);
      }
    });

    $(".filter-popup__item").on("click", function () {
      $(".filter-popup__item").removeClass("selected");
      $(this).addClass("selected");
    });
  }
});
