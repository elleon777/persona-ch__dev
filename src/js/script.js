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
import styleVarController from "./utils/styleVarController";

$(function () {
  styleVarController.addStyleVar(
    `--header-height`,
    `${$("header").height()}px`
  );
  styleVarController.addStyleVar(
    `--scroll-width`,
    window.innerWidth - document.documentElement.clientWidth + "px"
  );
  $(window).on("resize", function () {
    styleVarController.updateStyleVar(
      `--header-height`,
      `${$("header").height()}px`
    );
    styleVarController.addStyleVar(
      `--scroll-width`,
      window.innerWidth - document.documentElement.clientWidth + "px"
    );
  });
  function vhFix() {
    let ornt = innerWidth > innerHeight ? "land" : "port";
    let prev = innerHeight;
    let vh = prev * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("load", () => {
      setTimeout(() => {
        let vh = innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      }, 1);
    });

    window.addEventListener("resize", () => {
      let current = innerWidth > innerHeight ? "land" : "port";
      if (ornt !== current) {
        let vh = innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
        ornt = current;
      }
    });
  }
  vhFix();

  if ($(".youtube").length) {
    $(".youtube").each(function () {
      try {
        const youtubeUrl = $(this)
          .find("[data-fancybox]")
          .attr("href")
          .match(/(v=.*)/g)[0]
          .replace("v=", "");
        $(this)
          .find("[data-fancybox]")
          .append(
            "<img src=https://img.youtube.com/vi/" + youtubeUrl + "/0.jpg>"
          )
          .append("<span class='play'></span>");
      } catch (err) {
        console.warn("youtube error \n", err);
      }
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
          tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="4" y="27" width="32" height="2" transform="rotate(-45 4 27)" fill="white"/> <rect x="5" y="4" width="32" height="2" transform="rotate(45 5 4)" fill="white"/> </svg></button>',
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
});
