// Swiper 실행
const swiperTicket = new Swiper(".ticket-slide", {
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 26,
  speed: 300,
  navigation: {
    nextEl: ".ticket-btn.next",
    prevEl: ".ticket-btn.prev",
  },
});
