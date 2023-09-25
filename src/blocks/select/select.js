import $ from "jquery";

$(function () {
  if ($("select").length) {
    console.log("select")
    $("select").each(function () {
      var $this = $(this),
        numberOfOptions = $(this).children("option").length;

      $this.addClass("select-hidden");
      $this.wrap('<div class="select"></div>');
      $this.after(
        '<div class="select-styled"><span class="select-styled__subtitle"></span><span class="select-styled__title"></span></div>'
      );

      var $styledSelect = $this.next("div.select-styled");
      $styledSelect
        .find(".select-styled__subtitle")
        .text($this.attr("data-title"));
      $styledSelect.find(".select-styled__title").text("Выбранный пункт");

      var $list = $("<ul />", {
        class: "select-options",
      }).insertAfter($styledSelect);

      for (var i = 0; i < numberOfOptions; i++) {
        $("<li />", {
          text: $this.children("option").eq(i).text(),
          rel: $this.children("option").eq(i).val(),
          "data-category": $this.children("option").eq(i).data("category"),
        }).appendTo($list);
      }

      var $listItems = $list.children("li");

      $styledSelect.on("click", function (e) {
        e.stopPropagation();
        $("div.select-styled.active")
          .not(this)
          .each(function () {
            $(this)
              .removeClass("active")
              .next("ul.select-options")
              .removeClass("open");
            $(this).parent().removeClass("expand");
          });
        $(this)
          .toggleClass("active")
          .next("ul.select-options")
          .toggleClass("open");
        $(this).parent().toggleClass("expand")
      });

      $listItems.on("click", function (e) {
        e.stopPropagation();
        $styledSelect
          .find(".select-styled__title")
          .text($(this).text())
          .parent()
          .removeClass("active");
        $this.val($(this).attr("rel"));
        $list.removeClass("open");
        $(this).closest(".select").removeClass("expand");
      });

      $(document).on("click", function () {
        $styledSelect.removeClass("active");
        $list.removeClass("open");
      });
    });
  }
});
