import $ from "jquery";

$(function () {
  function clickHeaderDropdownDesktop() {
    const initialClass = $(".header").hasClass("header--dark")
      ? "header--dark"
      : "header--white";
    $(document).off("click", ".header__dropdown-btn");
    return () => {
      $(document).on("click", ".header__dropdown-btn", function () {
        if (
          $(".header__dropdown-btn").hasClass("active") &&
          !$(this).hasClass("active")
        ) {
          $(".header__dropdown-btn").removeClass("active");
          $(".header__dropdown").hide();
        }
        // Если меню открыто
        if ($(".header__dropdown").is(":visible")) {
          closeVisibleDropDownDesktop(initialClass);
          return;
        }

        if ($(".header").hasClass("header--dark")) {
          $(".header").removeClass("header--dark").addClass("header--white");
          $(".header").css("background", "#f2f6ff");
        }

        $(this).next().slideToggle().css("display", "grid");
        $(".header").addClass("header--open");
        $(this).toggleClass("active");

        closeHeaderMouse(initialClass);
        closeHeaderEsc(initialClass);
      });
    };
  }
  let closureClickHeaderDropdownDesktop = clickHeaderDropdownDesktop();

  function closeHeaderMouse(initialClass) {
    $(document).one("click", function (e) {
      if (
        !$(".header").is(e.target) &&
        $(".header").has(e.target).length === 0 &&
        $(".header__dropdown-btn").hasClass("active")
      ) {
        closeVisibleDropDownDesktop(initialClass);
      }
    });
  }
  function closeHeaderEsc(initialClass) {
    $(document).one("keyup", function (e) {
      if (e.key == "Escape" && $(".header__dropdown-btn").hasClass("active")) {
        closeVisibleDropDownDesktop(initialClass);
      }
    });
  }
  function closeVisibleDropDownDesktop(initialClass) {
    $(".header__dropdown").slideUp();
    setTimeout(() => {
      if ($(".header").hasClass("header--white")) {
        $(".header").removeClass("header--white").addClass(initialClass);
      }
      $(".header").removeClass("header--open");
      $(".header").removeAttr("style");
      $(".header__dropdown-btn").removeClass("active");
    }, 400);
  }

  function clickHeaderDropdownMobile() {
    $(document).on("click", ".header__dropdown-btn", function () {
      const currentItem = $(this).text().trim();
      const prevItem = $(this)
        .closest("ul")
        .siblings(".dropdown__submenu-title")
        .text()
        .trim();
      $(this).closest(".dropdown__submenu").addClass("dropdown__submenu--show");
      $(".header__menu").children("ul").css("transform", "translateX(-100vw)");
      $(this)
        .siblings(".dropdown__submenu")
        .show()
        .children(".dropdown__submenu-title")
        .text(currentItem);
      $(this)
        .siblings(".dropdown__submenu")
        .children(".dropdown__submenu-back")
        .text(prevItem || currentItem);
      $(".header__top").hide();
    });
  }

  function stretchHeaderCall() {
    if ($(".main-page").length && $(window).width() === 1024) {
      return;
    }
    if (!$(".footer").length) {
      return;
    }
    if (!$(".fixed-btn").length) {
      $(".header__call").clone().appendTo(".header__bottom .header__wrapper");
      $(".header__call")
        .first()
        .addClass("fixed-btn")
        .addClass("fixed-btn--call");
    }

    $(".fixed-btn").appendTo("body");
    const options = {
      rootMargin: "0px",
      threshold: [0.99],
    };
    const trueCallback = function (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $(".fixed-btn").addClass("open");
          if ($(".footer").hasClass("footer--dark")) {
            $("body").css("background", "#0b133d");
          } else {
            $("body").css("background", "#f2f6ff");
          }
        } else {
          $(".fixed-btn").removeClass("open");
          $("body").removeAttr("style");
        }
      });
    };
    const observer = new IntersectionObserver(trueCallback, options);
    const target = $(".footer")[0];

    observer.observe(target);
  }
  function observerChangeThemeSeeAlso() {
    if ($(".see-also").length) {
      const observer = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) {
            console.log("see also");
            if (!$(".header").hasClass("header--open")) {
              $(".header")
                .addClass("header--dark")
                .removeClass("header--white");
            }
            closureClickHeaderDropdownDesktop = clickHeaderDropdownDesktop();
            closureClickHeaderDropdownDesktop();
          } else {
            if (!$(".header").hasClass("header--open")) {
              $(".header")
                .removeClass("header--dark")
                .addClass("header--white");
            }
            closureClickHeaderDropdownDesktop = clickHeaderDropdownDesktop();
            closureClickHeaderDropdownDesktop();
          }
        },
        {
          rootMargin: `-${$(".header").height()}px 0px 0px 0px`,
          threshold: [0],
        }
      );
      observer.observe($(".lending__inner")[0]);
    }
  }

  function headerDesktopMenuScrollFade() {
    $(".header__bottom .tabs__content-block").on("scroll", function () {
      const scrollEnd =
        this.scrollHeight === this.scrollTop + this.clientHeight;
      if (scrollEnd) {
        $(this).parent().addClass("scroll-end");
        setTimeout(() => {
          $(this).parent().css("z-index", -1);
        }, 300);
      } else {
        $(this).parent().removeClass("scroll-end");
        $(this).parent().removeAttr("style");
      }
    });
  }

  if ($(window).width() >= 1024) {
    closureClickHeaderDropdownDesktop();
    observerChangeThemeSeeAlso();
    headerDesktopMenuScrollFade();
  } else {
    clickHeaderDropdownMobile();
  }
  if ($(window).width() <= 1024) {
    stretchHeaderCall();
  }

  $(".dropdown__submenu-back").on("click", function () {
    if (
      $(this)
        .closest(".dropdown__submenu--show")
        .hasClass("dropdown__submenu--show")
    ) {
      $(this)
        .closest(".dropdown__submenu--show")
        .removeClass("dropdown__submenu--show");
      $(this).parent().removeAttr("style");
    } else {
      $(this).closest("ul").removeAttr("style");
      $(".dropdown__submenu").removeAttr("style");
      $(".header__top").show();
    }
  });

  $(".header__mobile")
    .find(".header__menu")
    .on("click", function () {
      $(".header").toggleClass("header--mobile_menu");
      $(this).siblings(".header__phone").toggle();
      $(".header__search").toggle();
      $(".dropdown__submenu").removeAttr("style");
      $(".header__menu").children("ul").removeAttr("style");
      if ($("body").hasClass("no-scroll")) {
        $("body").removeClass("no-scroll");
        $(".header__top").removeAttr("style");
      }
      if ($(".header").hasClass("header--mobile_menu")) {
        $("body").addClass("no-scroll");
      }
    });
});
