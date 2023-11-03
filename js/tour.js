window.addEventListener("load", function () {
  // 숫자 콤마 출력
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fileName = "tour.json";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", fileName);
  xhr.send();

  xhr.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);

      makeHtmlTag(json["tab-1"]);

      const tabButtons = document.querySelectorAll(".tour-tab .tab-btn");
      const bookSlide = document.querySelector(".tour-slide");
      tabButtons.forEach(function (button, index) {
        button.addEventListener("click", function () {
          const category = button.getAttribute("data-category");
          const categoryData = json[category];
          makeHtmlTag(categoryData);

          // 모든 탭 버튼에서 "on" 클래스 제거
          tabButtons.forEach(function (btn) {
            btn.classList.remove("on");
            bookSlide.classList.remove(btn.getAttribute("data-category"));
          });

          // 클릭한 탭 버튼에 "on" 클래스 추가
          button.classList.add("on");
          bookSlide.classList.add(category);
        });
      });
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
            ${
              obj.cate === ""
                ? ""
                : `<span class="tour-badge">${obj.cate}</span>`
            }
              <div class="item-name">
                <span class="benefit">${obj.benefit}</span>
                <p class="name">${obj.name}</p>
              </div>
              <div class="item-price">
                <span><b>${numberWithCommas(obj.price)}</b>원~</span>
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
