const carouselWrapper = document.querySelector(".carousel-wrapper");
const carouselContainer = document.querySelector(".carousel-container");
const slidesNum = carouselWrapper.childElementCount;
//Start from the second image
let currentSlide = 1;
let preSlide = 0;

class CarouselControler {
  constructor() {
    this.instance = "";
    this.controlButtons = true;
  }
  start() {
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
  stop() {
    autoSlide.stop();
  }
}

//Control automatic carousel
class AutoSlide {
  constructor() {
    this.controler = "";
  }
  start() {
    this.controler = setInterval(utils.next, 3000);
  }
  stop() {
    clearInterval(this.controler);
  }
}
const autoSlide = new AutoSlide();

const utils = {
  next: function () {
    carouselWrapper.style.transition = "0.8s";
    preSlide = currentSlide;
    currentSlide++;
    utils.startSlider(preSlide, currentSlide);

    if (currentSlide === slidesNum + 1) {
      //If currentSlide is the lastfake, change the point to the first one
      setTimeout(() => {
        utils.resetToStart();
        currentSlide = 1;
      }, 800);
    }
  },
  startSlider: function () {
    changeSlides(currentSlide);
    changePagination(preSlide, currentSlide);

    function changeSlides(currentSlide) {
      carouselWrapper.style.transform =
        "translateX(" + -100 * currentSlide + "%)";
    }
    function changePagination(preSlide, currentSlide) {
      const paginations = document.querySelectorAll(".pagination span");
      if (paginations.length > 0) {
        if (preSlide !== "undefined")
          if (preSlide === 0) {
            preSlide = slidesNum;
          }
        if (preSlide === slidesNum + 1) {
          preSlide = 1;
        }
        paginations[preSlide - 1].classList.remove("selected");
        if (currentSlide !== "undefined") {
          if (currentSlide === 0) {
            currentSlide = slidesNum;
          }
          if (currentSlide === slidesNum + 1) {
            currentSlide = 1;
          }
          paginations[currentSlide - 1].classList.add("selected");
        }
      }
    }
  },
  resetToStart: function () {
    carouselWrapper.style.transition = "0s";
    carouselWrapper.style.transform = "translateX( -100%)";
  },
  prev: function () {
    carouselWrapper.style.transition = "0.8s";
    preSlide = currentSlide;
    currentSlide--;
    utils.startSlider(preSlide, currentSlide);
    //If currentSlide is the firstfake, change the point to the last one
    if (currentSlide === 0) {
      setTimeout(() => {
        utils.resetToEnd();
        currentSlide = slidesNum;
      }, 800);
    }
  },
  resetToEnd: function () {
    carouselWrapper.style.transition = "0s";
    carouselWrapper.style.transform = "translateX(" + -slidesNum * 100 + "%)";
  },
  //Activate the left and right button to control carousel
  activateCarousel: function () {
    const btnLeft = document.querySelector(".control-btn-left");
    const btnRight = document.querySelector(".control-btn-right");
    if (btnLeft) btnLeft.addEventListener("click", utils.prev);
    if (btnRight) btnRight.addEventListener("click", utils.next);
  },
  //  Add a clone img at the front and at the end
  addClones: function () {
    const fakefirst = carouselWrapper.children[0].cloneNode(true);
    const fakelast = carouselWrapper.children[slidesNum - 1].cloneNode(true);
    carouselWrapper.insertAdjacentHTML("afterBegin", fakelast.outerHTML);
    carouselWrapper.insertAdjacentHTML("beforeEnd", fakefirst.outerHTML);
  },
};

carouselContainer.onmouseenter = function () {
  autoSlide.stop();
};

carouselContainer.onmouseleave = function () {
  autoSlide.start();
};
