window.addEventListener("load", function () {
  const fileName = "tour.json";

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
    let HtmlTourTag = "";
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["tour_" + index];

      const tempTag = `
      <div class="swiper-slide">
        <div class="tour-slide-item">
          <a href="${obj.url}">
            <div class="item-img">
              <img src="${obj.image}" alt="${obj.name}">
            </div>
            <div class="item-info">
              <span class="tour-badge">${obj.cate}</span>
              <div class="item-name">
                <span class="benefit">${obj.benefit}</span>
                <p class="name">${obj.name}</p>
              </div>
              <div class="item-price">
                <span><b>${obj.price}</b>원~</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    `;

      HtmlTourTag += tempTag;
    }

    showHtmlTag(HtmlTourTag);
  }

  function showHtmlTag(_html) {
    const TourSlide = ".tour-slide .swiper-wrapper";
    const tag = document.querySelector(TourSlide);
    tag.innerHTML = _html;
    makeSwiper();
  }

  function makeSwiper() {
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
  }
});
