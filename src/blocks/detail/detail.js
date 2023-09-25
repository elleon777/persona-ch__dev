import $ from "jquery";

$(function () {
  const isDesktop = $(window).width() > 991;
  // function sliceIntoChunks(arr, chunkSize) {
  //   const res = [];
  //   for (let i = 0; i < arr.length; i += chunkSize) {
  //     const chunk = arr.slice(i, i + chunkSize);
  //     res.push(chunk);
  //   }
  //   return res;
  // }

  // function setHeightGridRow() {
  //   if ($(window).width() < 600) {
  //     return;
  //   }
  //   const columnCount = $(window).width() > 1024 ? 3 : 2;
  //   const arrChunks = sliceIntoChunks($(".new-preview"), columnCount);
  //   $(arrChunks).each(function () {
  //     const arr = [];
  //     $(this).each(function () {
  //       arr.push($(this).children().outerHeight());
  //     });
  //     $(this).height(Math.max(...arr));
  //   });
  // }
  // setHeightGridRow();
  if ($(".detail__footer").length) {
    $(window).on("scroll", function () {
      if (
        $(window).scrollTop() >
        $(".detail__top").css("padding-bottom").replace("px", "")
      ) {
        $(".detail__bottom").css("background-position", "0 150px");
      }
      if (
        $(window).scrollTop() <
        $(".detail__top").css("padding-bottom").replace("px", "")
      ) {
        $(".detail__bottom").attr("style", "");
      }
    });
  } else {
    $(".detail__bottom").css("background-position", "0 150px");
  }
  function setReadMore(elemClass, countLine, mobileCountLine = countLine) {
    $(elemClass).each(function () {
      const lineHeight = $(this).css("line-height").replace("px", "");
      let elemHeight = $(this).height();
      if (elemHeight === 0) {
        elemHeight;

        $(elemClass).clone().addClass("remove").appendTo("body").css({
          position: "absolute",
          visibility: "hidden",
          display: "block",
        });

        elemHeight = $(".remove").height();

        elemHeight;

        $(".remove").remove();
      }
      if (elemHeight > lineHeight * countLine) {
        if ($(window).width() < 991) {
          countLine = mobileCountLine;
        }
        $(this).addClass("ellipsis");
        $(this)[0].style.cssText = `-webkit-line-clamp: ${countLine}`;
        $(this).after(
          '<button class="read-more"><span>Читать полностью</span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 16.6307L12.6977 17.3471L12 18.0266L11.3023 17.3471L12 16.6307ZM3.32271 6.78362L12.6977 15.9143L11.3023 17.3471L1.92729 8.21638L3.32271 6.78362ZM11.3023 15.9143L20.6773 6.78362L22.0727 8.21638L12.6977 17.3471L11.3023 15.9143Z" fill="#0F1F3F"/></svg></button>'
        );
      }
    });
    $(elemClass)
      .next(".read-more")
      .on("click", function () {
        $(this).prev().toggleClass("ellipsis");
        if ($(this).prev().hasClass("ellipsis")) {
          $(this).children("span").text("Читать полностью");
        } else {
          $(this).children("span").text("Свернуть");
        }
      });
  }
  setReadMore(".detail-service__desc", 3, 4);
  setReadMore(".review__desc", 8, 4);

  if ($(".detail .tabs").length) {
    const marginTabsTop = isDesktop ? 0 : 8;
    const paddingTabsTop = $("header").height() + marginTabsTop;
    const detailTabsCaption = $(".detail .tabs__caption");
    detailTabsCaption.css("top", paddingTabsTop);
  }
});
