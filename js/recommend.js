// Swiper 실행
const swiperRecommend = new Swiper(".recommend-slide", {
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 26,
  speed: 300,
  navigation: {
    nextEl: ".recommend-btn.next",
    prevEl: ".recommend-btn.prev",
  },
});
