window.addEventListener("load", function () {
  const navbar = document.querySelector(".header");
  const navbarHeight = navbar.scrollHeight / 2;
  const myBtn = document.querySelector("#mypage-bt");
  const myLink = document.querySelector(".mypage-pop");
  let btnStatus = true;

  document.addEventListener("scroll", function () {
    if (window.scrollY > navbarHeight) {
      navbar.classList.add("scroll");
    } else {
      navbar.classList.remove("scroll");
    }
  });

  myBtn.addEventListener("click", function () {
    if (btnStatus === true) {
      btnStatus = false;
      myLink.classList.add("on");
    } else {
      btnStatus = true;
      myLink.classList.remove("on");
    }
  });
});
