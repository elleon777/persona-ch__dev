import $ from "jquery";
import Swiper, { Mousewheel, EffectCreative } from "swiper";
import debounce from "Utils/debounce";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { TweenMax } from "gsap/gsap-core";

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
    const slider = document.querySelector(".main-page");
    const interleaveOffset = 1;
    if (descResponce) {
      $(".main-page__wrapper").wrapInner("<div class='main-page__wrap'></div>");
    }
    return new Swiper(slider, {
      modules: [Mousewheel],
      direction: "vertical",
      slidesPerView: 1,
      spaceBetween: 0,
      mousewheel: false,
      speed: 1000, //800
      draggable: false,
      allowTouchMove: false,
      watchSlidesProgress: true,
      on: {
        progress: function () {
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            let slideProgress = swiper.slides[i].progress;
            let innerOffset = swiper.height * interleaveOffset;
            let innerTranslate = slideProgress * innerOffset;
            gsap.set(swiper.slides[i].querySelector(".main-page__wrap"), {
              y: innerTranslate,
            });
          }
        },
        touchStart: function () {
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = "";
          }
        },
        setTransition: function (_, speed) {
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = speed + "ms";
            swiper.slides[i].querySelector(
              ".main-page__wrap"
            ).style.transition = speed + "ms";
          }
        },
        slideChange: function (swiper) {
          const slide = $(".main-page").find(".swiper-slide");
          const lastPrev = slide.eq(3);

          if (mainPage.activeIndex === 4) {
            lastPrev.css("overflow", "visible");
          } else {
            lastPrev.css("overflow", "hidden");
          }
        },
        slideChangeTransitionEnd: function () {
          if (mainPage.activeIndex !== 4) {
            $(".fadeInUpHide").removeClass("fadeInUpHide");
            $(".fadeInHide").removeClass("fadeInHide");
          }
        },
      },
    });
  }

  let mainPage = initSwiperMainPage();

  const slidePrevDebounce = debounce(
    () => {
      animationBeforeSlideChange();
      setTimeout(() => {
        mainPage.slidePrev();
      }, mainPage.originalParams.speed);
    },
    mainPage.originalParams.speed,
    true
  );

  const slideNextDebounce = debounce(
    () => {
      if (mainPage.activeIndex === 4) {
        return;
      }
      animationBeforeSlideChange();
      setTimeout(() => {
        mainPage.slideNext();
      }, mainPage.originalParams.speed);
    },
    mainPage.originalParams.speed,
    true
  );

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
    $(".main-page__wrapper").each(function () {
      $($(this).find(".main-page__right-item").get().reverse()).each(function (
        index
      ) {
        $(this).css(
          "animation-delay",
          `${mainPage.originalParams.speed / 1000 + index / 10}s`
        );
      });
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

    $(".swiper-slide-active").find(".video-bg")[0]?.play();
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
  function gsapMobileParallax() {
    gsap.registerPlugin(ScrollTrigger);
    let getRatio = (el) =>
      window.innerHeight / (window.innerHeight + el.offsetHeight);
    gsap.utils.toArray(".main-page__wrapper").forEach((section, i) => {
      section.bg = section.querySelector(".main-page__mobile-bg");
      gsap.fromTo(
        section.bg,
        {
          backgroundPosition: () =>
            i ? `50% ${window.innerHeight * getRatio(section)}px` : "50% 0px",
        },
        {
          backgroundPosition: () =>
            `50% ${-window.innerHeight * (1 - getRatio(section))}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: () => (i ? "top bottom" : "top top"),
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true, // to make it responsive
          },
        }
      );
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

      if (isScrollingDown > 0) {
        slidePrevDebounce();
      } else {
        slideNextDebounce();
      }
    });
    if (descResponce) {
      animationAsideItems();
    } else {
      gsapMobileParallax();
    }
    alignLeftAndRightMainPage();
    videoController();
  }
});
