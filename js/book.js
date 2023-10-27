// Swiper 실행
const swiperBook = new Swiper(".book-slide", {
  slidesPerView: 5,
  slidesPerGroup: 5,
  spaceBetween: 26,
  speed: 300,
  navigation: {
    nextEl: ".book-btn.next",
    prevEl: ".book-btn.prev",
  },
});
