// Swiper 실행
const swiperLive = new Swiper(".live-slide", {
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 26,
  speed: 300,
  navigation: {
    nextEl: ".live-btn.next",
    prevEl: ".live-btn.prev",
  },
});
