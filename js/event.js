// Swiper 실행
const swiperEvent = new Swiper(".event-slide", {
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 26,
  speed: 400,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".event-btn.next",
    prevEl: ".event-btn.prev",
  },
});
