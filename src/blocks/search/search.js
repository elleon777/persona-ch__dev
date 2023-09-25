import $ from "jquery";

$(function () {
  $(".search__close").on("click", function () {
    if ($("body").hasClass("no-scroll")) {
      $("body").removeClass("no-scroll");
    }
    $(".search").removeClass("search--show");
    $(".search").addClass("search--hide");
    setTimeout(() => {
      $(".search").attr("style", "");
    }, 1000);
  });
  $(".header__search").on("click", function () {
    $("body").addClass("no-scroll");
    $(".search").removeClass("search--hide");
    $(".search").addClass("search--show");
    $(".search").css("display", "grid");
  });
});
