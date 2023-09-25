import $ from "jquery";
import Swiper, { Navigation } from "swiper";

$(function () {
  const resultSlider = new Swiper(".result-slider", {
    modules: [Navigation],
    speed: 400,
    spaceBetween: 20,
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
