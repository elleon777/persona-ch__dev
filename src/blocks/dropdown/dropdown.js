/* global document */

// import ready from 'Utils/documentReady.js';

// ready(function() {
//
// });

import $ from "jquery";

$(".dropdown__caption").on("click", function () {
  if (
    $(".dropdown").hasClass("active") &&
    !$(this).parent().hasClass("active")
  ) {
    $(".dropdown.active").each(function () {
      $(this).removeClass("active");
      $(this).find(".dropdown__content").slideUp();
    });
  }
  if ($(this).parent().hasClass("active")) {
    $(this).parent().removeClass("active");
    $(this).parent().find(".dropdown__content").slideUp();
    return;
  }
  $(this).parent().addClass("active");
  $(this).parent().find(".dropdown__content").slideDown();
});
