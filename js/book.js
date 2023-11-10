window.addEventListener("load", function () {
  // 숫자 콤마 출력
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fileName = "book.json";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", fileName);
  xhr.send();

  xhr.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);

      makeHtmlTag(json["tab-1"]);

      const tabButtons = document.querySelectorAll(".book-tab .tab-btn");
      const bookSlide = document.querySelector(".book-slide");
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
    let HtmlBookTag = ``;
    for (i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["book_" + index];
      const tempTag = `
      <div class="swiper-slide">
        <div class="book-slide-item">
          <a href="${obj.url}">
            <div class="item-img">
              <img src="${obj.image}" alt="${obj.name}">
            </div>
            <div class="item-info">
              <div class="item-name">
                <p class="name">${obj.name}</p>
              </div>
              <div class="item-price">
                <span><b>${numberWithCommas(obj.price)}</b>원</span>
              </div>
            </div>
          </a>
        </div>
      </div>
      `;
      HtmlBookTag += tempTag;
    }
    showHtmlTag(HtmlBookTag);
  }

  function showHtmlTag(_html) {
    const BookSlide = ".book-slide .swiper-wrapper";
    const tag = document.querySelector(BookSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper() {
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
      breakpoints: {
        1280: {
          slidesPerView: 5,
        },
        767: {
          slidesPerView: 3,
        },
      },
    });
  }
});
