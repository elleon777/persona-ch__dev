import $ from 'jquery';

$(function () {
  $(".alert__close").on("click", function () {
    $(this).closest(".alert").remove();
  })
})