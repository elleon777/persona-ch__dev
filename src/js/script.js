// /* global document console */

// import ready from 'Utils/documentReady.js';
// import getScrollSize from 'Utils/getScrollSize.js';

// ready(function() {
//    ('DOM героически построен!');
//   // Добавление кастомного свойства с системной шириной скролла
//   document.documentElement.style.setProperty('--css-scroll-size', `${getScrollSize()}px`);
// });
// import Swiper JS

import $ from "jquery"; // Перед использованием установить как зависимость
import { Fancybox } from "@fancyapps/ui/dist/fancybox/fancybox.esm.js";
import { lendingGallery } from "../blocks/lending/lending";

$(function () {
  function vhFix() {
    let ornt = window.innerWidth > window.innerHeight ? "land" : "port";
    let prev = window.innerHeight;
    let vh = prev * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("load", () => {
      setTimeout(() => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      }, 1);
    });

    window.addEventListener("resize", () => {
      let current = window.innerWidth > window.innerHeight ? "land" : "port";
      if (ornt !== current) {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
        ornt = current;
      }
    });
  }
  vhFix();
  if ($(".youtube").length) {
    $(".youtube").each(function () {
      const youtubeUrl = $(this)
        .find("[data-fancybox]")
        .attr("href")
        .match(/(v=.*)/g)[0]
        .replace("v=", "");
      $(this)
        .find("[data-fancybox]")
        .append("<img src=https://img.youtube.com/vi/" + youtubeUrl + "/0.jpg>")
        .append("<span class='play'></span>");
    });
  }

  Fancybox.bind("[data-fancybox]", {
    Thumbs: {
      type: "",
    },
    Carousel: {
      Navigation: {
        nextTpl:
          '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.8257 28.5L28 16M28 16L15.8257 3.5M28 16L1 16" stroke="white" stroke-width="2"/></svg>',
        prevTpl:
          '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.1743 3.5L4 16M4 16L16.1743 28.5M4 16L31 16" stroke="white" stroke-width="2"/></svg>',
      },
    },
    Toolbar: {
      items: {
        infobar: {
          tpl: '<div class="fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span>из<span data-fancybox-count></span></div>',
        },
        close: {
          tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="27" width="32" height="2" transform="rotate(-45 4 27)" fill="white"/><rect x="5" y="4" width="32" height="2" transform="rotate(45 5 4)" fill="white"/></svg></button>',
        },
      },
      display: {
        left: ["infobar"],
        right: ["close"],
      },
    },
    on: {
      done: () => {
        const dataIndexSlide =
          Fancybox.getSlide()?.el?.getAttribute("data-index");
        lendingGallery.slideTo(dataIndexSlide);
      },
    },
  });
  if ($("select").length) {
    console.log("select");
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
        $(this).parent().toggleClass("expand");
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
