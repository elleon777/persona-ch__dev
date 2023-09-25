// import ready from 'Utils/documentReady.js';
import $ from "jquery";
import Swiper, { Mousewheel, EffectFade } from "swiper";
import debounce from "../../js/utils/debounce";

$(function () {
  $(window).on("load", function () {
    if (!$(".preloader").length) {
      return;
    }
    $(".preloader").addClass("preloader--endloaded");
    setTimeout(() => {
      $(".preloader").remove();
    }, 1000);
  });

  const descResponce = $(window).width() > 991;
  function initSwiperMainPage() {
    return new Swiper(".main-page", {
      modules: [Mousewheel, EffectFade],
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      slidesPerView: 1,
      spaceBetween: 0,
      mousewheel: false,
      speed: 300,
      draggable: false,
      allowTouchMove: false,
      on: {
        slideChange: function () {
          if (mainPage.activeIndex === 4) {
            $(".main-page")
              .find(".swiper-slide")
              .eq(mainPage.previousIndex)
              .css("opacity", "0.9");
            return;
          }
        },
        slideChangeTransitionEnd: function () {
          animationAsideItems();
          $(".fadeInUpHide").removeClass("fadeInUpHide");
          mainPage.activeIndex !== 4 &&
            $(".fadeInHide").removeClass("fadeInHide");
        },
      },
    });
  }
  let mainPage = initSwiperMainPage();

  const slidePrevDebounce = debounce(() => {
    mainPage.slidePrev();
  }, mainPage.originalParams.speed);

  const slideNextDebounce = debounce(() => {
    if (mainPage.activeIndex === 4) {
      return;
    }
    mainPage.slideNext();
  }, mainPage.originalParams.speed);

  function destroySwiperMainPage() {
    if (descResponce) {
      return;
    }
    mainPage.destroy();
    mainPage = null;
    $(".swiper-backface-hidden")
      .addClass("swiper-backface-hidden__destroy")
      .removeClass("swiper-backface-hidden");
    $(".swiper-wrapper")
      .addClass("swiper-wrapper__destroy")
      .removeClass("swiper-wrapper");
    return true;
  }
  function deInitSwiperMainPage() {
    $(".swiper-backface-hidden__destroy")
      .addClass("swiper-backface-hidden")
      .removeClass("swiper-backface-hidden__destroy");
    $(".swiper-wrapper__destroy")
      .addClass("swiper-wrapper")
      .removeClass("swiper-wrapper__destroy");
    mainPage = initSwiperMainPage();
    return false;
  }
  function animationBeforeSlideChange() {
    $(".swiper-slide-active")
      .find(".main-page__title")
      .addClass("fadeInUpHide");
    $(".swiper-slide-active").find(".main-page__link").addClass("fadeInUpHide");
    $(".swiper-slide-active").find(".main-page__right").addClass("fadeInHide");
  }

  function animationAsideItems() {
    $(
      $(".main-page__wrapper.swiper-slide-active")
        .find(".main-page__right-item")
        .get()
        .reverse()
    ).each(function (index) {
      $(this).css("animation-delay", `${0.4 + index / 10}s`);
    });
  }

  function startVideoOnActiveSlide() {
    if ($(".swiper-slide").length - 1 == $(".swiper-slide-active").index()) {
      return;
    }
    $(".swiper-slide:not(.swiper-slide-active)")
      .find(".video-bg")
      .each(function () {
        setTimeout(() => {
          $(this)[0].currentTime = 0;
          $(this)[0].pause();
        }, 500);
      });

    $(".swiper-slide-active").find(".video-bg")[0].play();
  }

  function videoController() {
    if (!descResponce) {
      return;
    }
    const slideObserver = new MutationObserver(() => {
      startVideoOnActiveSlide();
    });
    $(".swiper-slide").each(function () {
      slideObserver.observe($(this)[0], {
        attributeFilter: ["class"],
      });
    });

    startVideoOnActiveSlide();
    // eventVideoTimeUpdate();
  }

  function alignLeftAndRightMainPage() {
    if (!descResponce) {
      return;
    }
    $(".main-page__wrapper").each(function (index) {
      if ($(".main-page__wrapper").length - 1 === index) {
        return;
      }
      const elemByAlign = $(this).find(".main-page__right-item").last();
      let elemByAlignChildHeight = 0;
      if (elemByAlign.children().length > 1) {
        elemByAlign.children().each(function () {
          elemByAlignChildHeight += $(this).outerHeight(true);
        });
      } else {
        elemByAlignChildHeight = elemByAlign.children().outerHeight(true);
      }
      const elemByAlignHeight = elemByAlign.outerHeight(true);
      const bottomDistance = (elemByAlignHeight - elemByAlignChildHeight) / 2;
      $(this).find(".main-page__left").css("margin-bottom", bottomDistance);
    });
  }

  if ($(".main-page").length) {
    let isDestroyed = false;
    
    $(window).on("resize", function () {
      if (descResponce) {
        isDestroyed = deInitSwiperMainPage();
        return;
      }
      if (!isDestroyed) {
        isDestroyed = destroySwiperMainPage();
      }
    });
    !isDestroyed && destroySwiperMainPage();

    $(".main-page")[0].addEventListener("wheel", (e) => {
      const isScrollingDown = Math.sign(e.wheelDeltaY);
      if (mainPage.activeIndex === 0 && isScrollingDown > 0) {
        return;
      }
      animationBeforeSlideChange();
      if (isScrollingDown > 0) {
        setTimeout(() => {
          slidePrevDebounce();
        }, mainPage.originalParams.speed);
      } else {
        setTimeout(() => {
          slideNextDebounce();
        }, mainPage.originalParams.speed);
      }
    });
    alignLeftAndRightMainPage();
    videoController();
  }
});
