'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector(`#section--1`);
const nav = document.querySelector('.nav')
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))



btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Button scrollTo

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' })
})

////////////////////////////////////////////////// 
// Page Navigation 

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault()
//     const id = this.getAttribute('href')
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
//   })
// })

document.querySelector('.nav__links').addEventListener('click', function (e) {

  e.preventDefault()

  // Matching stretegy 
  if (e.target.classList.contains('nav__link')) {

    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})


// Tabbed Component




// tabs.forEach(t => t.addEventListener('click', () => console.log('tab'))) /// bad PRACTICE do not do like this

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault()
  const clicked = e.target.closest('.operations__tab')
  console.log(clicked)
  // guard clause 
  if (!clicked) return;

  // remove tab

  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))


  // active tab
  clicked.classList.add('operations__tab--active')



  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

})

// Manu fade animation 

const handleHover = function (e) {

  if (e.target.classList.contains('nav__link')) {
    const link = e.target
    const sibilings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')


    sibilings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    })
    logo.style.opacity = this
  }
}

// Passing argument into handler

nav.addEventListener('mouseover', handleHover.bind(0.5))

nav.addEventListener('mouseout', handleHover.bind(1))

// Sticky navigation

// const initialCoords = section1.getBoundingClientRect()

// window.addEventListener('scroll', function () {

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky')
//   else { nav.classList.remove('sticky') }
// })

// Sticky navigation :  Intersection  Observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => console.log(entry))
// }

// const obsOption = {
//   root: null,
//   threshold: [0, 0.2],
// }

// const observer = new IntersectionObserver(obsCallback, obsOption)
// observer.observe(section1)

const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height

// console.log(navHeight) 

const stickeyNav = function (entries) {
  const [entry] = entries


  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickeyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header)

// Reveal sections

const allSection = document.querySelectorAll('.section')

const revealSection = function (entries, observer) {
  const [entry] = entries

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden')

  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,

})

allSection.forEach(function (section) {
  sectionObserver.observe(section)
  // section.classList.add('section--hidden')
})

// Lazy loading images

const allImg = document.querySelectorAll('img[data-src]')

const changeImg = function (entries, observer) {
  const [entry] = entries

  if (!entry.isIntersecting) return;

  // replace src with data src
  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(changeImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
})

allImg.forEach(function (section) {
  imgObserver.observe(section)

})

// Slider


const slider = document.querySelector('.slider')
const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')

let curSlide = 0
const maxSlide = slides.length;

// slider.style.transform = 'scale(0.7) translateX(-100px)'
// slider.style.overflow = 'visible'


const goToSlide = function (slide) {
  slides.forEach((s, i) => s.style.transform = `translateX( ${100 * (i - slide)}%)`)
}

goToSlide(0)

// Next slide

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0
  } else {

    curSlide++;
  }
  goToSlide(curSlide)
}
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1
  } else {

    curSlide--;
  }
  goToSlide(curSlide)
}

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////


/*

console.log(document.documentElement)
console.log(document.head)
console.log(document.body)

const header = document.querySelector('.header')

const allSections = document.querySelectorAll('.section')
console.log(allSections)

const allButtons = document.getElementsByTagName('button')
console.log(allButtons)


// Creating and  inserting elements

// .insertAdjecentHTML

const message = document.createElement('div')

message.classList.add('cookie-message')
message.textContent = 'We use cookies  for improved functionality and analytics'
message.innerHTML = 'We use cookies  for improved functionality and analytics <button class = "btn btn--close-cookie"> got it ! </button> '
// header.prepend(message)
header.append(message)

// header.before(message)
// header.after(message)

// header.prepend(message.cloneNode(true))

document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove()
})

// Styles

message.style.background = '#37383d'

message.style.width = '104.6%'

console.log(getComputedStyle(message).color)

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'

document.documentElement.style.setProperty('--color-primary', 'orangered')

//  Attributes

const logo = document.querySelector('.nav__logo')
console.log(logo.alt)

logo.alt = 'Minimalist shit'

console.log(logo.src)
console.log(logo.className)

console.log(logo.getAttribute('src'))

const link = document.querySelector('.twitter-link')
console.log(link.href)
console.log(link.getAttribute('href'))

console.log(logo.dataset.versionNumber)

// Classes
logo.classList.add()
logo.classList.remove()
logo.classList.toggle()
logo.classList.contains()




const alertH1 = function (e) {
  alert('AddeventListenter: Great! You are reading the ')


  h1.removeEventListener('mouseenter', alertH1)
}

const h1 = document.querySelector('h1');

h1.addEventListener('mouseenter', alertH1)



// rgb(255,255,255)
const randomInt = (min, max) => Math.floor((Math.random() * max - min + 1) + min)
const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`
console.log(randomColor(0, 255))

document.querySelector('.nav__link').addEventListener('click', function (e) {

  console.log('LINK')
})

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log('LINK')
})

document.querySelector('.nav').addEventListener('click', function (e) {
  console.log('LINK')

const h1 = document.querySelector('h1');

// Going downwards: child 

console.log(h1.querySelectorAll('.highlight'))


console.log(h1.childNodes)

console.log(h1.children)
console.log(h1.firstElementChild.style.color = 'white')
console.log(h1.lastElementChild.style.color = 'orangered')

// Going upwards : parent 

console.log(h1.parentNode)
console.log(h1.parentElement)

h1.closest('.header').style.background = 'var(--gradient-secondary)'

//  Going sideways : sibilings 

console.log(h1.previousElementSibling)
console.log(h1.nextElementSibling)

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(el => { if (el !== h1) el.style.transform = `scale(0.5)` })

*/

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('hello PARSE DOM tree bulit')
})

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e)
})

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e)
//   e.returnValue = ''
// })

// window.addEventListener('beforeunload', function (e) {
//   // Only works if the page has had user interaction
//   e.preventDefault();
//   e.returnValue = ''; // triggers the default browser confirmation dialog
// });
