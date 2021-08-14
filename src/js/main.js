const carouselParent = document.querySelector(".customers");
const carouselControler = new CarouselControler();

// Mark the status of the carousel
var isCarouselOn = false;

function checkViewPoint(el) {
  const viewPortHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const offsetTop = el.offsetTop;
  const scrollTop = document.documentElement.scrollTop;
  const top = offsetTop - scrollTop - viewPortHeight;
  if (top <= 0) {
    if (top <= -viewPortHeight) {
      if (isCarouselOn) {
        isCarouselOn = false;
        isOutViewPoint();
      }
    } else {
      if (!isCarouselOn) {
        isCarouselOn = true;
        isInViewPoint();
      }
    }
  } else {
    if (isCarouselOn) {
      isCarouselOn = false;
      isOutViewPoint();
    }
  }
}

//Activate the carousel when the user scroll to the location of carousel
function isInViewPoint() {
  carouselControler.start();
}

//Desactivate the carousel when the user scroll out of the location of carousel
function isOutViewPoint() {
  carouselControler.stop();
}

window.addEventListener("scroll", () => {
  checkViewPoint(carouselParent);
});
