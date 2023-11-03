// 모든 js는 html 로드 후 실행해야 안전함
window.addEventListener("load", function () {
  // 숫자 콤마 출력
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // 추천상품 슬라이드 기능
  // 코딩 시나리오 작성 : 의사코드
  //1. 외부데이터 호출

  // 외부 데이터 파일 명.json
  const fileName = "recommend.json";
  // 외부데이터 가져오기
  const xhr = new XMLHttpRequest();
  // 외부파일 열기 (GET 방식으로 파일 열어주기)
  xhr.open("GET", fileName);
  // 실행
  xhr.send();
  // 데이터 전송상태 체크
  xhr.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      //가독성을 위해 코드를 변수에 담는다.
      const res = event.target.response;

      //res를 전달해서 html 태그를 만든다.
      // 데이터를 정리해서 전달하는것이 관례
      //전달받은 문자열 js에서 사용하도록 json 해석(parse)하여 객체화 {}한다
      const json = JSON.parse(res);
      makeHtmlTag(json["tab-1"]);
      const tabButtons = document.querySelectorAll(".recommend-tab .tab-btn");
      const bookSlide = document.querySelector(".recommend-slide");
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

  //html 태그 만드는 기능
  function makeHtmlTag(_res) {
    let HtmlRecommendTag = "";
    // 반복문(몇번인지 알때 for, 모를때 while)
    // for (초기값; 조건; 증감) {반복 하고 싶은일}
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["good_" + index];

      let tempTag = ``;
      if (i === _res.total - 1) {
        // 여기서 바로가기 버튼을 출력한다.
        tempTag = `
        <div class="swiper-slide">
          <div class="slide-item-more">
            <a href="${obj.url}">
              <i><img src="images/btn_moreProduct.svg" alt="전체보기"></i> 
              <p>전체보기</p>
            </a>
          </div>
        </div>
        `;
      } else {
        //일반적인 코드를 출력한다.
        tempTag = `
        <div class="swiper-slide">
          <div class="recommend-slide-item">
            <a href="${obj.url}">
              <div class="item-img">
                <img src="${obj.image}" alt="${obj.name}">
              </div>
              <div class="item-info">
                <div class="item-price">
                  <span class="sale-percentage">${
                    obj.discount === 0 ? "" : obj.discount + "%"
                  }</span>
                  <span><b>${numberWithCommas(obj.price)}</b>원</span>
                </div>
                <div class="item-name">${obj.name}</div>
              </div>
            </a>
          </div>
        </div>
      `;
      }

      HtmlRecommendTag += tempTag;
    }

    showHtmlTag(HtmlRecommendTag);
  }

  function showHtmlTag(_html) {
    //3. Swiper에 백틱 배치
    const RecommendSlide = ".recommend-slide .swiper-wrapper";
    const tag = document.querySelector(RecommendSlide);
    tag.innerHTML = _html;
    // Swiper 만들고 실행하기
    makeSwiper();
  }

  function makeSwiper() {
    //4. Swiper 실행
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
  }
});
