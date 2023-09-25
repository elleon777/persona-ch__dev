import $ from "jquery";
import Swiper from "swiper";
import loadScriptPromise from "Utils/loadScript.js";

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: Math.round(box.top + window.scrollY),
    right: Math.round(box.right + window.scrollX),
    bottom: Math.round(box.bottom + window.scrollY),
    left: Math.round(box.left + window.scrollX),
  };
}
function isSlideInWrapper() {
  const result = {
    prev: null,
    contains: [],
    next: null,
  };
  const galleryCoords = getCoords($(".lending-gallery__inner")[0]);
  $(".swiper-slide").each(function () {
    if (
      getCoords($(this)[0]).left >= galleryCoords.left &&
      galleryCoords.right >= getCoords($(this)[0]).right
    ) {
      result.contains.push($(this));
    }
  });
  result.prev = $(result.contains[0]).prev();
  result.next = $(result.contains[result.contains.length - 1]).next();
  return result;
}

export const lendingGallery = new Swiper(".lending-gallery__inner", {
  slidesPerView: "auto",
  spaceBetween: 20,
  autoHeight: true,
  draggable: true,
  on: {
    init: () => {
      $(".swiper-slide").on("click", function (e) {
        if ($(e.currentTarget).is(isSlideInWrapper().next)) {
          e.preventDefault();
          lendingGallery.slideNext();
          return;
        }
      });
    },
    slideChangeTransitionEnd: () => {
      $(".swiper-slide").off("click");
      $(".swiper-slide").on("click", function (e) {
        if (
          isSlideInWrapper().contains.some((slide) =>
            $(e.currentTarget).is(slide)
          )
        ) {
          return;
        }
        if ($(e.currentTarget).is(isSlideInWrapper().next)) {
          e.preventDefault();
          lendingGallery.slideNext();
          return;
        }
        if ($(e.currentTarget).is(isSlideInWrapper().prev)) {
          e.preventDefault();
          lendingGallery.slidePrev();
          return;
        }
      });
    },
  },
});
$(function () {
  $(".lending-gallery__inner .swiper-slide")
    .find("img")
    .each(function () {
      $(this)[0]
        .decode()
        .then(() => {
          const maxWidthImg =
            $(this).width() > $(window).width()
              ? $(window).width()
              : $(this).width();
          $(this).closest(".swiper-slide").css("max-width", maxWidthImg);
        })
        .finally(() => {
          lendingGallery.update();
        });
    });
});
$(function () {
  if ($(".lending-clinic__images").length) {
    loadScriptPromise(
      "https://cdn.jsdelivr.net/gh/dixonandmoe/rellax@master/rellax.min.js"
    ).then(() => {
      // eslint-disable-next-line no-undef
      const rellax = new Rellax(".rellax");
    });
  }
  function bannerHidden() {
    const banner = $(".lending__banner");
    if ($(window).scrollTop() > banner.height() && !banner.hasClass("hidden")) {
      banner.addClass("hidden");
    }
    if ($(window).scrollTop() < banner.height() && banner.hasClass("hidden")) {
      banner.removeClass("hidden");
    }
  }
  if ($(".lending__banner").length) {
    $(window).on("scroll", bannerHidden);
    bannerHidden();
  }
  function isOverflowed(el) {
    return el.scrollWidth > el.offsetWidth || el.scrollHeight > el.offsetHeight;
  }
  if ($(".lending-infographics").length) {
    $(".lending-infographics__item-bar")
      .first()
      .find(".line span")
      .each(function (i) {
        const stage = $(".lending-infographics__stages").find("span").eq(i);
        if (i != 4 && i != 0) {
          stage.offset({
            left:
              $(".line span").width() / 2 +
              $(this).offset().left -
              stage.width() / 2,
          });
        } else {
          stage.css("pointer-events", "none");
        }
      });

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let lastScrollTop = 0;
            const scrolledToBlock = $(this).scrollTop();
            $(window).on("scroll", function () {
              const winScroll =
                document.body.scrollTop ||
                document.documentElement.scrollTop - scrolledToBlock;
              const height =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

              let scrolled = (winScroll / height) * 100;

              var posit = $(this).scrollTop();
              if (posit > lastScrollTop && $(window).width() < 991) {
                $(".lending-infographics__wrapper")[0].scrollLeft +=
                  scrolled / 9;
              } else {
                $(".lending-infographics__wrapper")[0].scrollLeft -=
                  scrolled / 9;
              }
              lastScrollTop = posit;

              $(".lending-infographics")
                .find(".progress")
                .each(function () {
                  $(this).css(
                    "width",
                    Number(($(this).attr("data-multiplyer") || 2) * scrolled) +
                      "%"
                  );
                });
            });
            observer.unobserve($(".lending-infographics")[0]);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      }
    );

    observer.observe($(".lending-infographics")[0]);

    $(".lending-infographics__stages")
      .find("span")
      .on("click", function (e) {
        const popupItem = $(".lending-infographics__popup-item");
        const currentIndex = $(this).index();
        const currentPopup =
          popupItem.eq(currentIndex).prev().length !== 0
            ? popupItem.eq(currentIndex).prev()
            : popupItem.last();  

        
      
          if ($(window).width() < 991) {
            currentPopup
              .closest(".lending-infographics__popup")
              .addClass("active");
            $(this).addClass("active");
            currentPopup.show();
            $("body").addClass("no-scroll");
            $("header").hide();
          } else {
            const popupPosition = {
              left:
                $(e.currentTarget).offset().left +
                $(e.currentTarget).outerWidth() / 2 -
                currentPopup.outerWidth() / 2,
              top:
                $(e.currentTarget).offset().top -
                $(".lending__banner").height() +
                40,
            };
            if (popupPosition.left < 0) {
              popupPosition.left = 0;
              currentPopup.find("span").css("left", e.pageX);
            }
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            $(".lending-infographics__popup-item").attr("style", "");
            currentPopup.show().css(popupPosition);

            if (isOverflowed($("body")[0])) {
              popupPosition.left =
                popupPosition.left -
                (currentPopup.outerWidth() -
                  ($("body").width() - popupPosition.left));
              currentPopup.css(popupPosition);
              currentPopup
                .find("span")
                .css(
                  "left",
                  currentPopup.outerWidth() - $(this).width() + e.offsetX - 70
                );
            }
          }
      });
    $(document).on("click", function (e) {
      if (
        !$(e.target).closest(".lending-infographics__popup-item").length &&
        !$(".lending-infographics__stages").find("span").is(e.target)
      ) {
        $(".lending-infographics__stages").find("span").removeClass("active");
        $(".lending-infographics__popup-item").hide();
      }
    });
    $(".lending-infographics__popup-item").on("click", "span", function name() {
      $(".lending-infographics__stages").children("span").removeClass("active");
      $(".lending-infographics__popup").removeClass("active");
      $(this).parent().attr("style", "");
      $("body").removeClass("no-scroll");
      $("header").show();
    });
  }

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $(entry.target).addClass("animation");
          observer.unobserve(entry.target);
          setTimeout(() => {
            $(entry.target).removeClass("observer");
          }, 1000);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }
  );

  const arr = document.querySelectorAll(".observer");
  arr.forEach((i) => {
    observer.observe(i);
  });
});

if ($(".melinvest-design").length) {
  if ($(window).width() > 1024) {
    $(".melinvest-design__img > img")
      .decode()
      .then(() => {
        $(".melinvest-design__list").css(
          "max-height",
          $(".melinvest-design__img > img").height()
        );
      });
  }

  Fancybox.bind("[data-fancybox]", {});
}
