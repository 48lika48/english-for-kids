
//menu
const menuBtn = document.getElementById('menu-btn');
const burgerList = document.getElementById('burger-list');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  burgerList.classList.toggle('show');
});

let menu = document.getElementById('menu');
menu.addEventListener('click', (event) => {
  menu.querySelectorAll('a').forEach(el => el.classList.remove('active'));
  event.target.classList.add('active');
});

//gradient
let checkbox = document.getElementById('checkbox');
checkbox.addEventListener('click', (event) => {
  if(checkbox.checked == true) {
    burgerList.style.background="linear-gradient(to top, #FFCE67, #56CC9D)";
  }
  if(checkbox.checked == false) {
    burgerList.style.background="linear-gradient(to top, #F3969A, #6CC3D5)";
  }
});