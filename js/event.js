window.addEventListener("load", function () {
  const fileName = "event.json";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", fileName);
  xhr.send();

  xhr.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);

      makeHtmlTag(json);
    }
  };

  function makeHtmlTag(_res) {
    let HtmlEventTag = ``;
    for (i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["event_" + index];
      const tempTag = `
      <div class="swiper-slide">
        <div class="event-slide-item">
          <a href="${obj.url}">
            <div class="item-img">
              <img src="${obj.image}" alt="${obj.alt}">
          </div>
          </a>
        </div>
      </div>
      `;

      HtmlEventTag += tempTag;
    }
    showHtmlTag(HtmlEventTag);
  }

  function showHtmlTag(_html) {
    const EventSlide = ".event-slide .swiper-wrapper";
    const tag = document.querySelector(EventSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper() {
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
  }
});
