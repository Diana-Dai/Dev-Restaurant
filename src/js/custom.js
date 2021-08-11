import "../css/bootstrap.min.css";

// The bootstrap has to be imported before custom.css
// Because custom.css overwrites the classes in bootstrap.min.css
import "../css/custom.css";

const bgSwiperPreBtn = document.querySelector(".bg-prev");
const bgSwiperNexBtn = document.querySelector(".bg-next");
const bgSwiperPreElm = document.querySelectorAll(".carousel-item")[0];
const bgSwiperNexElm = document.querySelectorAll(".carousel-item")[1];
const insSwiperPreBtn = document.querySelector(".ins-prev");
const insSwiperNexBtn = document.querySelector(".ins-next");
const insSwiper = document.querySelector(".ins-carousel-inner");
const productSwiperPreBtn = document.querySelector(".pro-prev");
const productSwiperNexBtn = document.querySelector(".pro-next");
const productSwiper = document.querySelector(".pro-carousel-inner");
const carouselImgs = document.querySelectorAll(".carousel-img");
const optionItems = document.querySelectorAll(".option-item");
const signIn = document.querySelector(".sign-in");
const createNew = document.querySelector(".create-new");

function getStyle(obj, attr) {
  return obj.currentStyle
    ? obj.currentStyle[attr]
    : getComputedStyle(obj)[attr];
}

if (bgSwiperNexBtn && bgSwiperPreBtn) {
  bgSwiperPreBtn.addEventListener("click", () => {
    bgSwiperPreElm.classList.toggle("carousel-item-active");
    bgSwiperNexElm.classList.toggle("carousel-item-active");
  });
  bgSwiperNexBtn.addEventListener("click", () => {
    bgSwiperNexElm.classList.toggle("carousel-item-active");
    bgSwiperPreElm.classList.toggle("carousel-item-active");
  });
}
if (insSwiperPreBtn && insSwiperNexBtn) {
  insSwiperPreBtn.addEventListener("click", () => {
    let swiperPos = parseInt(getStyle(insSwiper, "transform").split(", ")[4]);

    if (swiperPos > -3040) {
      insSwiper.classList.add("animation");
      swiperPos -= 380;
      insSwiper.style.transform = `translateX(${swiperPos}px)`;
    } else {
      insSwiper.classList.remove("animation");
      insSwiper.style.transform = "translateX(-760px)";
    }
  });

  insSwiperNexBtn.addEventListener("click", () => {
    let swiperPos = parseInt(getStyle(insSwiper, "transform").split(", ")[4]);
    if (swiperPos < -760) {
      insSwiper.classList.add("animation");
      swiperPos += 380;
      insSwiper.style.transform = `translateX(${swiperPos}px)`;
    } else {
      insSwiper.classList.remove("animation");
      insSwiper.style.transform = "translateX(-3040px)";
    }
  });
}
if (productSwiperPreBtn && productSwiperNexBtn) {
  productSwiperPreBtn.addEventListener("click", () => {
    let swiperPos = parseInt(
      getStyle(productSwiper, "transform").split(", ")[4]
    );

    if (swiperPos > -2248) {
      productSwiper.classList.add("animation");
      swiperPos -= 281;
      console.log(swiperPos);

      productSwiper.style.transform = `translateX(${swiperPos}px)`;
    } else {
      productSwiper.classList.remove("animation");
      productSwiper.style.transform = "translateX(-281px)";
    }
  });

  productSwiperNexBtn.addEventListener("click", () => {
    let swiperPos = parseInt(
      getStyle(productSwiper, "transform").split(", ")[4]
    );
    if (swiperPos < -281) {
      productSwiper.classList.add("animation");
      swiperPos += 281;
      console.log(swiperPos);
      productSwiper.style.transform = `translateX(${swiperPos}px)`;
    } else {
      productSwiper.classList.remove("animation");
      productSwiper.style.transform = "translateX(-2248px)";
    }
  });
}

if (optionItems) {
  optionItems.forEach((i, item) => {
    i.addEventListener("click", () => {
      i.classList.add("active");
      carouselImgs[item].classList.add("active");
      for (let j = 0; j <= 2; j++) {
        if (i !== item) {
          optionItems[i].classList.remove("active");
          carouselImgs[i].classList.remove("active");
        }
      }
    });
  });
}
if (signIn) {
  signIn.addEventListener("click", () => {
    signIn.parentNode.classList.toggle("open");
  });
}
if (createNew) {
  createNew.addEventListener("click", () => {
    createNew.parentNode.classList.toggle("open");
  });
}

// Scroll event

const header = document.querySelector("#scrollable");
const headerHideOnly = document.querySelector("#scrollable-hideonly");
if (header) {
  window.addEventListener("scroll", () => {
    const scrollY =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollY < 400) {
      header.classList.remove("header-unpinned");
      header.classList.add("fixed-dark");
    } else if (scrollY > 400) {
      header.classList.add("header-unpinned");
      header.classList.remove("fixed-dark");
    } else {
      header.classList.remove("fixed-dark");
      header.classList.add("header-pinned");
      header.classList.remove("header-unpinned");
    }
  });
}
if (headerHideOnly) {
  window.addEventListener("scroll", () => {
    const scrollY =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollY < 400) {
      headerHideOnly.classList.remove("header-unpinned");
    } else {
      headerHideOnly.classList.add("header-unpinned");
    }
  });
}
