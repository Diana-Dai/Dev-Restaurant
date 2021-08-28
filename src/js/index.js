/* eslint-disable no-console */
import "../css/style.css";
import "../assets/font/iconfont.css";
import { carouselControler, autoSlide } from "./carousel";

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

const StartMenuBarCommand = (function () {
  const menuTabs = document.getElementById("menu-tabs");
  const tabs = {
    "dinner-tab": "dinner",
    "lunch-tab": "lunch",
    "brunch-tab": "brunch",
    "desert-tab": "desert",
    "wine-tab": "wine",
  };
  let currentTab = "";
  return {
    execute: function () {
      menuTabs.addEventListener("click", (e) => {
        this.getCurrentTab(e);
        this.setMenuTab(e);
        this.setMenuPane(e);
      });
    },
    getCurrentTab: function (e) {
      // Check the current tab
      if (e.target.id || e.target.parentNode.id) {
        if (tabs[e.target.id]) {
          currentTab = e.target.id;
        } else if (tabs[e.target.parentNode.id]) {
          currentTab = e.target.parentNode.id;
        }
      }
    },
    setMenuTab: function (e) {
      // Change the status of the menu tabs
      debugger;
      clearAllActiveStatus(menuTabs);
      document.getElementById(currentTab).classList.add("active");
    },
    setMenuPane: function (e) {
      // Change the status of the menu pane
      [currentTab] = currentTab.split("-");
      currentTab = "#myMenuTabContent #" + currentTab;
      clearAllActiveStatus(document.querySelector("#myMenuTabContent"));
      document.querySelector(currentTab).classList.add("active");
    },
  };
})();

const StartNavBarCommand = {
  execute: function () {
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

const StartCarouselHoverCommand = {
  execute: function () {
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

const StartNavTabsCommand = {
  execute: function () {
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

const StartCarouselCommand = {
  execute: function () {
    const intersectionObserver = new IntersectionObserver(function (entries) {
      // When the target item is in viewPoint
      if (entries[0].intersectionRatio > 0) {
        carouselControler.start();
        return;
      }
      carouselControler.stop();
    });

    // Start observing
    intersectionObserver.observe(document.querySelector(".customers"));
  },
};

const StartScrollAnimationCommand = {
  execute: function () {
    window.addEventListener("scroll", () => {
      const { scrollTop } = document.documentElement;
      // Header
      initStickyHeader(document.querySelector("header"), scrollTop);
    });
  },
};

class OnloadCommander {
  constructor() {
    this.stack = [];
  }
  init() {
    window.onload = () => {
      this.stack.forEach((item) => {
        item.execute();
      });
    };
  }
  add(action) {
    this.stack.push(action);
  }
}

const commander = new OnloadCommander();
commander.add(StartScrollAnimationCommand);
commander.add(StartNavBarCommand);
commander.add(StartMenuBarCommand);
commander.add(StartNavTabsCommand);
commander.add(StartCarouselCommand);
commander.add(StartCarouselHoverCommand);
commander.init();
