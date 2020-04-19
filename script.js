import cards from '/cards.js';

const main = document.getElementById('main');
const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menu-btn');
const burgerList = document.getElementById('burger-list');
const wrapper = document.getElementById('wrapper');
const checkbox = document.getElementById('checkbox');
const rotate = Array.from(document.getElementsByClassName('rotate'));
let numCategory;

// menu
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  burgerList.classList.toggle('show');
});

main.addEventListener('click', () => {
  burgerList.classList.remove('show');
  menuBtn.classList.remove('open');
});

// active
burgerList.addEventListener('click', (event) => {
  menu.querySelectorAll('a').forEach((el) => el.classList.remove('active'));
  event.target.classList.add('active');
});

function activeA(numTarget) {
  menu.querySelectorAll('a').forEach((el) => el.classList.remove('active'));
  menu.querySelectorAll('a')[numTarget].classList.add('active');
}

// gradient
checkbox.addEventListener('click', () => {
  if (checkbox.checked === true) {
    burgerList.style.background = 'linear-gradient(to top, #FFCE67, #56CC9D)';
  }
  if (checkbox.checked === false) {
    burgerList.style.background = 'linear-gradient(to top, #F3969A, #6CC3D5)';
  }
});

// play
function playAudio(url) {
  new Audio(url).play();
}

// change details
function changeDetails(target, numTarget) {
  const category = target.innerHTML;
  const currentImgFront = Array.from(document.getElementsByClassName('cardImgFront'));
  const currentImgBack = Array.from(document.getElementsByClassName('cardImgBack'));
  const currentNameFront = Array.from(document.getElementsByClassName('textFront'));
  const currentNameBack = Array.from(document.getElementsByClassName('textBack'));

  if (cards[0].includes(category)) {
    rotate.forEach((el) => el.classList.remove('none'));
    numCategory = cards[0].indexOf(category) + 1;
    const newImg = cards[numCategory].map((item) => item.image);
    const newNameFront = cards[numCategory].map((item) => item.word);
    const newNameBack = cards[numCategory].map((item) => item.translation);
    Array.from(currentImgFront).forEach((currentValue, index) => {
      currentValue.src = newImg[index];
    });
    Array.from(currentImgBack).forEach((currentValue, index) => {
      currentValue.src = newImg[index];
    });
    Array.from(currentNameFront).forEach((currentValue, index) => {
      currentValue.innerHTML = newNameFront[index];
    });
    Array.from(currentNameBack).forEach((currentValue, index) => {
      currentValue.innerHTML = newNameBack[index];
    });
  } else {
    const arrAudio = cards[numCategory].map((currentValue) => currentValue.audioSrc);
    const currentAudio = arrAudio[numTarget - 1];
    if (checkbox.checked === false) {
      playAudio(currentAudio);
    }
  }
}

// target category
burgerList.onclick = function burgerListCategory(event) {
  const { target } = event;
  if (target.tagName !== 'A') return;
  const childrenA = Array.from(burgerList.children);
  const selectedTarget = target.closest('li');
  const numTarget = childrenA.indexOf(selectedTarget);
  changeDetails(target, numTarget);
  menuBtn.classList.toggle('open');
  burgerList.classList.toggle('show');
  if (target.innerHTML === 'Main Page') {
    rotate.forEach((el) => el.classList.add('none'));
  }
};

wrapper.onclick = function wrapperCategory(event) {
  const target = event.target.closest('.cards').children[0].children[0].children[0];
  if (target.tagName !== 'SPAN') return;
  const childrenDiv = Array.from(document.getElementsByClassName('textFront'));
  const numTarget = childrenDiv.indexOf(target) + 1;
  changeDetails(target, numTarget);
  activeA(numTarget);
};

// cards rotate
rotate.forEach((item) => item.addEventListener('click', () => {
  const parent = item.parentElement.parentElement.parentElement;
  parent.classList.toggle('is-flipped');
}));

Array.from(document.getElementsByClassName('card__face--back')).forEach((item) => item.addEventListener('mouseover', () => {
  const parent = item.parentElement;
  parent.classList.toggle('is-flipped');
  rotate.forEach((el) => el.classList.remove('none'));
}));
