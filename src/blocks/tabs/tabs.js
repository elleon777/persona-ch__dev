import $ from "jquery";

$(function () {
  if ($(".tabs").length) {
    $(".tabs").each(function () {
      $(this).find("li").first().addClass("active");
      $(this).find(".tabs__content-block").first().addClass("active");
    });
  }
  $("ul.tabs__caption-inner").on("click", "li:not(.active)", function () {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active")
      .closest("div.tabs")
      .find("div.tabs__content-block")
      .removeClass("active")
      .eq($(this).index())
      .addClass("active");
  });
});
