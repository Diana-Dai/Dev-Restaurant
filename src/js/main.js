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

function toggleClass(isActive, animatedElement, className) {
  if (isActive) {
    animatedElement.classList.add(className);
  } else {
    animatedElement.classList.remove(className);
  }
}

function stickyHeader(header, scrollTop) {
  const height = header.offsetHeight;
  if (scrollTop > height) {
    toggleClass(true, header, "active");
  } else {
    toggleClass(false, header, "active");
  }
}

//Scroll Control
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

//Navbar Control
const navbarToggler = document.getElementById("navbar-toggler");
const navbar = document.getElementById("navbar");
navbarToggler.addEventListener("click", () => {
  if (!document.body.classList.contains("navbar-open")) {
    document.body.classList.add("navbar-open");
    return;
  }
  document.body.classList.remove("navbar-open");
});
document.getElementById("navbar-close").addEventListener("click", () => {
  document.body.classList.remove("navbar-open");
});
navbar.querySelector("ul").addEventListener("click", (e) => {
  document.body.classList.remove("navbar-open");
});

// Menu Tabs Control
const menuTabs = document.getElementById("menu-tabs");
menuTabs.addEventListener("click", (e) => {
  const tabs = {
    "dinner-tab": "dinner",
    "lunch-tab": "lunch",
    "brunch-tab": "brunch",
    "desert-tab": "desert",
    "wine-tab": "wine",
  };
  let currentTab = "";

  // Check the current tab
  if (e.target.id || e.target.parentNode.id) {
    if (tabs.hasOwnProperty(e.target.id)) {
      currentTab = e.target.id;
    } else if (tabs.hasOwnProperty(e.target.parentNode.id)) {
      currentTab = e.target.parentNode.id;
    }
  }
  // Change the status of the menu tabs
  menuTabs.childNodes.forEach((item) => {
    changeNodeStatus(item);
  });
  document.getElementById(currentTab).classList.add("active");

  // Change the status of the menu pane
  currentTab = currentTab.split("-")[0];
  currentTab = "#myMenuTabContent" + " #" + currentTab;
  console.log(currentTab);
  document.querySelector("#myMenuTabContent").childNodes.forEach((item) => {
    changeNodeStatus(item);
  });
  document.querySelector(currentTab).classList.add("active");
});

function changeNodeStatus(item) {
  // Exclude empty node and text node
  if (item.nodeName !== "#text" && !/\s/.test(item.nodeValue)) {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
  }
}
