/* eslint-disable no-debugger */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-use-before-define */
const carouselWrapper = document.querySelector(".carousel-wrapper");
const slidesNum = carouselWrapper.childElementCount;
// Mark the status of the carousel
let isCarouselOn = false;
// Start from the second image
let currentSlide = 1;
let preSlide = 0;

const utils = {
  next() {
    carouselWrapper.style.transition = "0.8s";
    preSlide = currentSlide;
    currentSlide += 1;
    utils.startSlider(preSlide, currentSlide);

    if (currentSlide >= slidesNum + 1) {
      // If currentSlide is the lastfake, change the point to the first one
      setTimeout(() => {
        utils.resetToStart();
        currentSlide = 1;
      }, 800);
    }
  },
  startSlider() {
    changeSlides(currentSlide);
    changePagination(preSlide, currentSlide);

    function changeSlides(cslide) {
      carouselWrapper.style.transform = "translateX(" + -100 * cslide + "%)";
    }
    function changePagination(prslide, cslide) {
      const paginations = document.querySelectorAll(".pagination span");
      if (paginations.length > 0) {
        if (prslide !== "undefined") {
          if (prslide === 0) {
            prslide = slidesNum;
          }
          if (prslide === slidesNum + 1) {
            prslide = 1;
          }
        }
        paginations[prslide - 1].classList.remove("selected");
        if (cslide !== "undefined") {
          if (cslide === 0) {
            cslide = slidesNum;
          }
          if (cslide === slidesNum + 1) {
            cslide = 1;
          }
          paginations[cslide - 1].classList.add("selected");
        }
      }
    }
  },
  resetToStart() {
    carouselWrapper.style.transition = "0s";
    carouselWrapper.style.transform = "translateX( -100%)";
  },
  prev() {
    carouselWrapper.style.transition = "0.8s";
    preSlide = currentSlide;
    currentSlide -= 1;
    utils.startSlider(preSlide, currentSlide);
    // If currentSlide is the firstfake, change the point to the last one
    if (currentSlide <= 0) {
      setTimeout(() => {
        utils.resetToEnd();
        currentSlide = slidesNum;
      }, 800);
    }
  },
  resetToEnd() {
    carouselWrapper.style.transition = "0s";
    carouselWrapper.style.transform = "translateX(" + -slidesNum * 100 + "%)";
  },
  // Activate the left and right button to control carousel
  activateCarousel() {
    const btnLeft = document.querySelector(".control-btn-left");
    const btnRight = document.querySelector(".control-btn-right");
    if (btnLeft) btnLeft.addEventListener("click", utils.prev);
    if (btnRight) btnRight.addEventListener("click", utils.next);
  },
  //  Add a clone img at the front and at the end
  addClones() {
    const fakefirst = carouselWrapper.children[0].cloneNode(true);
    const fakelast = carouselWrapper.children[slidesNum - 1].cloneNode(true);
    carouselWrapper.insertAdjacentHTML("afterBegin", fakelast.outerHTML);
    carouselWrapper.insertAdjacentHTML("beforeEnd", fakefirst.outerHTML);
  },
};

const carouselControler = {
  instance: "",
  isCarouselOn: "",
  start() {
    if (!isCarouselOn) {
      isCarouselOn = true;

      // check if it's the first time
      if (!this.instance) {
        this.instance = true;
        utils.addClones();
        utils.activateCarousel();
        autoSlide.start();
      } else {
        autoSlide.start();
      }
    }
  },
  stop() {
    if (isCarouselOn) {
      isCarouselOn = false;
      autoSlide.stop();
    }
  },
};

// Control automatic carousel
const autoSlide = {
  controler: "",
  start() {
    this.controler = setInterval(utils.next, 3000);
  },
  stop() {
    clearInterval(this.controler);
  },
};

export { carouselControler, autoSlide };
