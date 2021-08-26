/* eslint-disable no-console */
import "../css/style.css";

import { carouselControler, autoSlide } from "./carousel";

function checkViewPoint(el, scrollTop) {
  const viewPortHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const { offsetTop } = el;
  const height = el.offsetHeight;
  const top = offsetTop - scrollTop - viewPortHeight;
  // When the element comes into the view
  return top <= 0 && top >= -height - viewPortHeight;
}

function initCarouselAnimation(isInViewPoint, animatedElement) {
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

function initStickyHeader(header, scrollTop) {
  const height = header.offsetHeight;
  if (scrollTop > height) {
    toggleClass(true, header, "active");
  } else {
    toggleClass(false, header, "active");
  }
}

function clearAllActiveStatus(el) {
  el.childNodes.forEach((item) => {
    // Exclude empty node and text node
    if (item.nodeName !== "#text" && !/\s/.test(item.nodeValue)) {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      }
    }
  });
}

const menuTabsControler = {
  tabs: {
    "dinner-tab": "dinner",
    "lunch-tab": "lunch",
    "brunch-tab": "brunch",
    "desert-tab": "desert",
    "wine-tab": "wine",
  },
  init: function () {
    document.getElementById("menu-tabs").addEventListener("click", (e) => {
      this.func(e);
    });
  },
  func: function (e) {
    let currentTab = "";

    // Check the current tab
    if (e.target.id || e.target.parentNode.id) {
      if (this.tabs[e.target.id]) {
        currentTab = e.target.id;
      } else if (this.tabs[e.target.parentNode.id]) {
        currentTab = e.target.parentNode.id;
      }
    }

    // Change the status of the menu this.tabs
    clearAllActiveStatus(document.getElementById("menu-tabs"));
    document.getElementById(currentTab).classList.add("active");

    [currentTab] = currentTab.split("-");
    currentTab = "#myMenuTabContent #" + currentTab;

    // Change the status of the menu pane
    clearAllActiveStatus(document.querySelector("#myMenuTabContent"));
    document.querySelector(currentTab).classList.add("active");
  },
};

const navBarControler = {
  init: function () {
    document.getElementById("navbar-toggler").addEventListener("click", () => {
      return document.body.classList.contains("navbar-open")
        ? document.body.classList.remove("navbar-open")
        : document.body.classList.add("navbar-open");
    });
    document.getElementById("navbar-close").addEventListener("click", () => {
      document.body.classList.remove("navbar-open");
    });
    document.querySelector("#navbar ul").addEventListener("click", () => {
      document.body.classList.remove("navbar-open");
    });
  },
};

const carouselHoverControler = {
  init: function () {
    // eslint-disable-next-line func-names
    document.querySelector(".carousel-container").onmouseenter = function () {
      autoSlide.stop();
    };

    // eslint-disable-next-line func-names
    document.querySelector(".carousel-container").onmouseleave = function () {
      autoSlide.start();
    };
  },
};

const navTabControler = {
  init: function () {
    const intersectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach((item) => {
        const targetTab = document.getElementById("tab-" + item.target.id);
        // When the target item is in viewPoint
        if (item.intersectionRatio > 0 && targetTab) {
          clearAllActiveStatus(document.getElementById("nav-list"));
          targetTab.parentNode.classList.add("active");
        }
      });
    });
    document.querySelectorAll("#nav-list li a").forEach((item) => {
      const href = item.getAttribute("href");
      // Start observing
      intersectionObserver.observe(document.querySelector(href));
    });
  },
};
const scrollAnimationControler = {
  init: function () {
    window.addEventListener("scroll", () => {
      const { scrollTop } = document.documentElement;

      // Carousel
      initCarouselAnimation(
        checkViewPoint(document.querySelector(".customers"), scrollTop),
        carouselControler
      );

      // Header
      initStickyHeader(document.querySelector("header"), scrollTop);
    });
  },
};

class Commander {
  constructor() {
    this.stack = [];
  }
  init() {
    this.stack.forEach((item) => {
      item.init();
    });
  }
  add(action) {
    this.stack.push(action);
  }
}

window.onload = () => {
  const commander = new Commander();
  commander.add(scrollAnimationControler);
  commander.add(navBarControler);
  commander.add(menuTabsControler);
  commander.add(carouselHoverControler);
  commander.add(navTabControler);
  commander.init();
};
