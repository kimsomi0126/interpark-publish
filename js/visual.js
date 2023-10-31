window.addEventListener("load", function () {
  // 백엔드 Response 데이터
  /* 
    전체 비주얼 슬라이드 갯수 : 7개
    슬라이드 당 필요한 항목 : 이미지 url , 클릭시 이동 url
 */

  const xh = new XMLHttpRequest(); // fatch > axios > async
  xh.open("GET", "visual.json");
  xh.send();

  xh.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      // 문자열을 js에서 사용하는 json 데이터로 변환
      const result = JSON.parse(event.target.response);
      makeVisualSlideHtml(result);
    }
  };

  //visual 슬라이드 내용 채우기
  function makeVisualSlideHtml(_data) {
    const visualRes = _data;
    // 출력
    let visualHtml = "";

    // total 수 만큼 반복 ( for는 true인 경우에만 반복한다.)
    for (let i = 1; i <= visualRes.total; i++) {
      let temp = `
  <div class="swiper-slide">
      <div class="visual-slide-item">
          <a href="${visualRes["visual_" + i].url}">
              <img src="${visualRes["visual_" + i].file}" alt="${
        visualRes["visual_" + i].title
      }"/>
          <a/>
      </div>
  </div>
`;
      visualHtml += temp;
    }

    // 자료 출력할 곳 지정
    const visualSlide = document.querySelector(".visual-slide .swiper-wrapper");

    visualSlide.innerHTML = visualHtml;

    // Swiper 실행
    var swiper = new Swiper(".visual-slide", {
      slidesPerView: 2,
      spaceBetween: 24,
      loop: true,
      speed: 500,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".visual-btn.next",
        prevEl: ".visual-btn.prev",
      },
    });
  }
});
