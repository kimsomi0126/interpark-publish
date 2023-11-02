window.addEventListener("load", function () {
  // 숫자 콤마 출력
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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

      const stateStyle = obj.live_info.state == "LIVE" ? "on" : "";
      const imgStyle = obj.live_info.state == "방송예정" ? "ready" : "";
      const itemProduct = `
        <div class="item-product">
            <a href="${obj.live_product.url}">
              <div class="product-img">
                <img src="${obj.live_product.image}" alt="${
        obj.live_product.name
      }">
              </div>
              <div class="product-info">
                <div class="item-name">
                  <p class="name">${obj.live_product.name}</p>
                </div>
                <div class="item-price" >
                  <span class="sale-percentage">${
                    obj.live_product.discount === 0
                      ? ""
                      : obj.live_product.discount + "%"
                  }</span>
                  <span><b>${numberWithCommas(
                    obj.live_product.price
                  )}</b>원</span>
                </div>
              </div>
            </a>
          </div>
          `;
      const itemTime = `
      <div class="item-time" >
        <p>${obj.live_time.date}</p>
        <b>${obj.live_time.time}</b>
      </div>
      `;
      const tempTag = `
      <div class="swiper-slide">
            <div class="live-slide-item">
              <a href="${obj.live_info.url}">
                <div class="item-img ${imgStyle}">
                  <img src="${obj.live_info.image}" alt="${obj.live_info.name}">
                </div>
                <div class="item-info">
                  <div class="item-title">
                    <span class="live-badge ${stateStyle}">${
        obj.live_info.state
      }</span>
                    <p class="name">${obj.live_info.name}</p>
                  </div>
                </div>
                ${obj.live_info.state == "방송예정" ? itemTime : ""}
              </a>
                ${obj.live_product.open == true ? itemProduct : ""}
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
