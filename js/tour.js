// Swiper 실행
const swiperTour = new Swiper(".tour-slide", {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 26,
  speed: 300,
  navigation: {
    nextEl: ".tour-btn.next",
    prevEl: ".tour-btn.prev",
  },
});
