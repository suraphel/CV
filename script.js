'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault(); // stops a link  tog from scrolling up
  //:  <a class="nav__link nav__link--btn btn--show-modal" href="#"
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// adds event listner to all the buttons : querySelectorAll and is an array
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

// Modern way of doing this is :
// Shall apply to all the buttons
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal)); // btnsOpenModal is a node list

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// smooth scrolling : Learn More
const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  section1.scrollIntoView({ behavior: 'smooth' });
});

// events bubbling : adding an event handler to an element and the parent elements also

/*

const feature = document.querySelector('.nav__link');
feature.addEventListener('click', function (e) {
  this.style.backgroundColor = 'red';
  console.log('Link', e.target, e.currentTarget); // what was clicked, same element that is being clikec but the events happens to bubble up
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = 'red';
  console.log('container', e.target, e.currentTarget); // where th e clicked happened
});
document.querySelector('.nav').addEventListener('click', function (e) {
  console.log(this === e.currentTarget);

  e.currentTarget.style.backgroundColor = 'green';
  console.log('nav', e.target, e.currentTarget); // where th e clicked happened
});

// page navigation using event delegation for smooth scrolling
feature.scrollIntoView({ behavior: 'smooth' });
*/

// document.querySelectorAll('.nav__links').forEach(ele =>
//   ele.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// );

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// Dom traversing : browsing the dom

const h1 = document.querySelector('h1');
// walk downwards selecting child
const down = h1.children;
const sele = h1.querySelectorAll('.highlight');
// console.log(down, sele);

// h1.firstElementChild.style.backgroundColor = 'yellow';
// h1.lastElementChild.style.backgroundColor = 'red';
// climbing the dom
// h1.parentElement.style.color = 'orangered';

// the closest header to the h1 element
// closest find parent element swhile the query sleector finds the children no matter how far in the don they are
// h1.closest('.header').style.backgroundColor = 'brown';

// sybling
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// Tabbed components
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const collection = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();

  // which button has been clicked
  const clicked = e.target.closest('.operations__tab'); // gives which button has been clicked
  console.log(clicked);
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  clicked.classList.add('operations__tab--active');

  // containt area  : based on the button clicked
  console.log(clicked.dataset.tab);

  collection.forEach(p => p.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu Fading out other links
// will need event listner, pick the selected link,
const navMenu = document.querySelector('.nav');

// toggle function
const navFader = function (e) {
  e.preventDefault();
  console.log(e.target);

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(ele => {
      if (ele !== link) ele.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

navMenu.addEventListener('mouseover', navFader.bind(0.5));

//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const sibling = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     sibling.forEach(ele => {
//       if (ele !== link) ele.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });
// to undo the above code
navMenu.addEventListener('mouseout', navFader.bind(1));

// sticky nav bar
// find the nov bar

const init = section1.getBoundingClientRect();
// console.log(init);

const navBar = document.querySelector('.nav');

// window.addEventListener('scroll', function () {
//   // var sticky = navBar.offsetTop;
//   if (window.scrollY > init.top) {
//     navBar.classList.add('sticky');
//   } else {
//     navBar.classList.remove('sticky');
//   }
// });

//The intersection of API : Listens to the intersection of elements

const header = document.querySelector('.header');

const navHeight = navBar.getBoundingClientRect().height;

const stickyNav = function (arr) {
  const entry = arr[0];

  if (!entry.isIntersecting) {
    navBar.classList.add('sticky');
  } else {
    navBar.classList.remove('sticky');
  }
};

const values = { root: null, threshold: 0, rootMargin: `-${navHeight}px` };

const headerOberver = new IntersectionObserver(stickyNav, values);

headerOberver.observe(header); // what to observe?

// Revealing sections using the intersecton observer

// element to be worked on : section
const section = document.querySelector('.section');
section.classList.add('sectionHidden');

// action to be taken
const action = function (arr) {
  const entry = arr[0];
  if (!entry.isIntersecting) {
    section.classList.remove('sectionHidden');
  } else {
    section.classList.add('sectionHidden');
  }
};
// values
const obj = { root: null, threshold: 0 };

// const sectionReveler = new IntersectionObserver(obj, action);

// Lazy loading for site efficency

// All pic with data source attribure
const target = document.querySelectorAll('img[data-src]');

// what to observe

//action
const loadImg = function (arr, observer) {
  const entry = arr[0];
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  // stop the observing from here onwards
  observer.unobserve(entry.target);
};

const lazyLoading = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // will speed the loading before we get here
});

target.forEach(img => lazyLoading.observe(img));

// The testimonial slider

// concept : moves to the right and left : in circle ;
// has clickable indicator at the bottom
// moves to one side by 100% in the X axis : + to the rit and - to the left.

//1 . get them to lay side by side
const slider = document.querySelectorAll('.slide');
const btnrit = document.querySelector('.slider__btn--right');
const btnleft = document.querySelector('.slider__btn--left');

const dotContainer = document.querySelector('.dots');

// const sliders = document.querySelector('.slider');
// sliders.style.transform = 'scale(0.3) translateX(-800px) ';

const dotFunction = function () {
  slider.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class = "dots__dot" data-slide="${i}"></button> `
    );
  });
};
dotFunction();

slider.forEach((ele, i) => (ele.style.transform = `translateX(${100 * i}%)`));

let currentpositon = 0;
const maxSlide = slider.length - 1;

btnrit.addEventListener('click', function (e) {
  e.preventDefault();
  if (currentpositon === maxSlide) {
    currentpositon = 0; //circle back to the begninng
  } else {
    currentpositon++;
  }
  // currentpositon++; // 1

  // for the left wing
  slider.forEach(
    (ele, i) =>
      (ele.style.transform = `translateX(${100 * (i - currentpositon)}%)`)
  );
});

btnleft.addEventListener('click', function (e) {
  e.preventDefault();
  if (currentpositon === 0) return;
  currentpositon--; // 1
  // for the left wing
  slider.forEach(
    (ele, i) =>
      (ele.style.transform = `translateX(${100 * (i - currentpositon)}%)`)
  );
});

// sliders.style.overflow = ' visible';

// adding keyboard keys
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    if (currentpositon === maxSlide) {
      currentpositon = 0; //circle back to the begninng
    } else {
      currentpositon++;
    }
    // currentpositon++; // 1

    // for the left wing
    slider.forEach(
      (ele, i) =>
        (ele.style.transform = `translateX(${100 * (i - currentpositon)}%)`)
    );
  } else {
    if (currentpositon === 0) return;
    currentpositon--; // 1
    // for the left wing
    slider.forEach(
      (ele, i) =>
        (ele.style.transform = `translateX(${100 * (i - currentpositon)}%)`)
    );
  }
});

// Testimonial indicator
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    console.log(slide);
    // now go to that sport
    currentpositon = slide - 1;

    if (currentpositon === maxSlide) {
      currentpositon = 0; //circle back to the begninng
    } else {
      currentpositon++;
    }
    // currentpositon++; // 1

    // for the left wing
    slider.forEach(
      (ele, i) =>
        (ele.style.transform = `translateX(${100 * (i - currentpositon)}%)`)
    );
  }
});

// dot highlighter

const highlight = function (e, slide) {
  document
    .querySelectorAll('dots__dot')
    .forEach(ele => ele.classList.remove('dots--dot--active'));
  console.log(e);
};

highlight();
//)----------------------------------------"---------------------------------

/*
console.log(document.documentElement);

// Selecting elements from the dom

const sel = document.querySelector('.header');
console.log(sel);
const querySelectorAll = document.querySelectorAll('.section');
console.log(querySelectorAll);

const selD = document.getElementById('section--1');
console.log(sel);

const selTag = document.getElementsByTagName('button');
console.log(selTag);

// creating and inserting an element
const created = document.createElement('div');
created.classList.add('cookie-message');
created.innerHTML =
  ' This is a test on how to create and insert an element to the dom <button class="btn btn--close-cookie"> Close cookie </button>';

// inserting it into the dom
sel.append(created);

// deleting an element
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  created.remove();
});

created.style.backgroundColor = '#37383d';

//Attributes
//in html src,alt, class, id are all attributes

// data attribute used when making ui

// event propagatjionn
*/
