window.addEventListener("load", function () {
  const fileName = "live.json";

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
    let HtmlLiveTag = ``;
    for (i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["live_" + index];

      const state = obj.state;
      const stateStyle = state == "LIVE" ? "on" : "";
      const imgStyle = state == "방송예정" ? "ready" : "";
      const timeStyle = state == "LIVE" ? "none" : state == "VOD" ? "none" : "";
      const itemStyle = state == "방송예정" ? "none" : "";

      console.log(stateStyle);

      const tempTag = `
      <div class="swiper-slide">
        <div class="live-slide-item">
          <a href="${obj.url}">
            <div class="item-img ${imgStyle}">
              <img src="${obj.background}" alt="${obj.name}">
            </div>
            <div class="item-info">
              <div class="item-title">
                <span class="live-badge ${stateStyle}">${obj.state}</span>
                <p class="name">${obj.name}</p>
              </div>
              <div class="item-time ${timeStyle}" >
                <p>10월 27일 (금)</p>
                <b>11:00</b>
              </div>
              <div class="item-product ${itemStyle}">
                <a href="${obj.product_url}">
                  <div class="product-img">
                    <img src="${obj.product_img}" alt="${obj.product_name}">
                  </div>
                  <div class="product-info">
                    <div class="item-name">
                      <p class="name">${obj.product_name}</p>
                    </div>
                    <div class="item-price" >
                      <span class="sale-percentage">${obj.discount}%</span>
                      <span><b>6,900</b>원</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </a>
        </div>
      </div>
      `;
      HtmlLiveTag += tempTag;
    }
    showHtmlTag(HtmlLiveTag);
  }

  function showHtmlTag(_html) {
    const LiveSlide = ".live-slide .swiper-wrapper";
    const tag = document.querySelector(LiveSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper() {
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
  }
});
