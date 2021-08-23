function checkViewPoint(el, scrollTop) {
  const viewPortHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const offsetTop = el.offsetTop;
  const height = el.offsetHeight;
  const top = offsetTop - scrollTop - viewPortHeight;
  // When the element comes into the view
  if (top <= 0 && top >= -height - viewPortHeight) {
    return true;
  }

  return false;
}

function triggerAnimation(isInViewPoint, animatedElement) {
  if (isInViewPoint) {
    animatedElement.start();
  } else {
    animatedElement.stop();
  }
}

function toggleClass(isInViewPoint, animatedElement) {
  if (isInViewPoint) {
    animatedElement.classList.add("active");
  } else {
    animatedElement.classList.remove("active");
  }
}

function stickyHeader(header, scrollTop) {
  const height = header.offsetHeight;
  if (scrollTop > height) {
    toggleClass(true, header);
  } else {
    toggleClass(false, header);
  }
}

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  // Carousel
  console.log(scrollTop);
  const carouselParent = document.querySelector(".customers");
  triggerAnimation(
    checkViewPoint(carouselParent, scrollTop),
    new CarouselControler()
  );

  // Header
  const header = document.querySelector("header");
  stickyHeader(header, scrollTop);
});
