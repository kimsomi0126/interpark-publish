window.addEventListener("load", function () {
  const fileName = "ticket.json";
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
    let HtmlTicketTag = ``;
    for (i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["ticket_" + index];
      let tempTag = `
      
      `;

      i === _res.total - 1
        ? (tempTag = `
        <div class="swiper-slide">
          <div class="slide-item-more">
            <a href="${obj.url}">
              <i><img src="images/btn_moreProduct.svg" alt="전체보기"></i> 
              <p>전체보기</p>
            </a>
          </div>
        </div>
        `)
        : (tempTag = `
        <div class="swiper-slide">
          <div class="ticket-slide-item">
            <a href="${obj.url}">
              <div class="item-img">
                <img src="${obj.image}" alt="${obj.name}">
              </div>
              <div class="item-info">
                <div class="item-name">
                  <p class="name">${obj.name}</p>
                  <p class="place">${obj.place}</p>
                  <p class="duration">${obj.duration}</p>
                </div>
                <div class="ticket-badge">
                ${
                  obj.badge == "좌석우위"
                    ? `<span class="blue-badge">${obj.badge}</span>`
                    : `<span class="red-badge">${obj.badge}</span>`
                }
                  
                </div>
              </div>
            </a>
          </div>
        </div>
    `);

      HtmlTicketTag += tempTag;
    }
    showHtmlTag(HtmlTicketTag);
  }

  function showHtmlTag(_html) {
    const TicketSlide = ".ticket-slide .swiper-wrapper";
    const tag = document.querySelector(TicketSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper() {
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
  }
});
