import $ from "jquery";

$(function () {
  if ($(".review").length) {
    $(".review__images").each(function (i) {
      $(this)
        .find("[data-fancybox]")
        .attr("data-fancybox", "review-" + i);
    });
  }
});
