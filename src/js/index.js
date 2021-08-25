/* eslint-disable no-console */
import '../css/style.css'

import { carouselControler, autoSlide } from './carousel'

function checkViewPoint(el, scrollTop) {
  const viewPortHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  const { offsetTop } = el
  const height = el.offsetHeight
  const top = offsetTop - scrollTop - viewPortHeight
  // When the element comes into the view
  return top <= 0 && top >= -height - viewPortHeight
}

function triggerAnimation(isInViewPoint, animatedElement) {
  if (isInViewPoint) {
    animatedElement.start()
  } else {
    animatedElement.stop()
  }
}

function toggleClass(isActive, animatedElement, className) {
  if (isActive) {
    animatedElement.classList.add(className)
  } else {
    animatedElement.classList.remove(className)
  }
}

function stickyHeader(header, scrollTop) {
  const height = header.offsetHeight
  if (scrollTop > height) {
    toggleClass(true, header, 'active')
  } else {
    toggleClass(false, header, 'active')
  }
}
function changeNodeStatus(item) {
  // Exclude empty node and text node
  if (item.nodeName !== '#text' && !/\s/.test(item.nodeValue)) {
    if (item.classList.contains('active')) {
      item.classList.remove('active')
    }
  }
}

window.onload = () => {
  // Scroll Control
  window.addEventListener('scroll', () => {
    const { scrollTop } = document.documentElement

    // Carousel
    triggerAnimation(
      checkViewPoint(document.querySelector('.customers'), scrollTop),
      carouselControler
    )

    // Header
    stickyHeader(document.querySelector('header'), scrollTop)
  })

  // Navbar Control
  document.getElementById('navbar-toggler').addEventListener('click', () => {
    if (!document.body.classList.contains('navbar-open')) {
      document.body.classList.add('navbar-open')
      return
    }
    document.body.classList.remove('navbar-open')
  })
  document.getElementById('navbar-close').addEventListener('click', () => {
    document.body.classList.remove('navbar-open')
  })
  document
    .getElementById('navbar')
    .querySelector('ul')
    .addEventListener('click', () => {
      document.body.classList.remove('navbar-open')
    })

  // Menu Tabs Control
  document.getElementById('menu-tabs').addEventListener('click', (e) => {
    const tabs = {
      'dinner-tab': 'dinner',
      'lunch-tab': 'lunch',
      'brunch-tab': 'brunch',
      'desert-tab': 'desert',
      'wine-tab': 'wine',
    }
    let currentTab = ''

    // Check the current tab
    if (e.target.id || e.target.parentNode.id) {
      if (tabs[e.target.id]) {
        currentTab = e.target.id
      } else if (tabs[e.target.parentNode.id]) {
        currentTab = e.target.parentNode.id
      }
    }
    // Change the status of the menu tabs
    document.getElementById('menu-tabs').childNodes.forEach((item) => {
      changeNodeStatus(item)
    })
    document.getElementById(currentTab).classList.add('active')

    // Change the status of the menu pane
    ;[currentTab] = currentTab.split('-')
    currentTab = '#myMenuTabContent #' + currentTab
    document.querySelector('#myMenuTabContent').childNodes.forEach((item) => {
      changeNodeStatus(item)
    })
    document.querySelector(currentTab).classList.add('active')
  })

  // eslint-disable-next-line func-names
  document.querySelector('.carousel-container').onmouseenter = function () {
    autoSlide.stop()
  }

  // eslint-disable-next-line func-names
  document.querySelector('.carousel-container').onmouseleave = function () {
    autoSlide.start()
  }
}
