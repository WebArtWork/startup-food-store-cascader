const elementHeight = document.querySelector('header').offsetHeight;
document.documentElement.style.setProperty('--dynamic-height', `${elementHeight}px`);
const dropdown_menu = document.querySelector('.header-dropdown');
dropdown_menu.style.top = "-100px";

const button_dropdown = document.querySelector('.header-btns-btn3');
const favourite_button_header = document.querySelector('.header-btns-btn1');
const button_dropdown_exit = document.querySelector('.header-dropdown-exit-btn');
const favourite_button = document.querySelectorAll('.favourite_button');
const favourite_number = document.querySelector('.favourite-number');
const cards = document.querySelectorAll('.card');
let favNum = [];
favourite_number.textContent = favNum.length;

favourite_button.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (!favNum.includes(favourite_button[index].id)) {
          favNum.push(favourite_button[index].id);
          favourite_number.textContent = favNum.length;
          favourite_button[index].style.color = 'var(--secondary_color)';
          //animation part
          favourite_button_header.classList.remove('animated');
          void favourite_button_header.offsetWidth;
          favourite_button_header.classList.add('animated');
      }
      else {
        favNum.splice(favNum.findIndex(item => item === favourite_button[index].id), 1);
        favourite_button[index].style.color = 'white';
        favourite_number.textContent = favNum.length;
      }
      console.log(favNum);
    });
});

cards.forEach((button, index) => {
  button.addEventListener('mouseenter', () => {
    favourite_button[index].style.top = "0";
  });
  button.addEventListener('mouseleave', () => {
    favourite_button[index].style.top = "-40px";
  });
});

button_dropdown_exit.addEventListener('click', () => {
  dropdown_menu.style.top = "-100px";
});

button_dropdown.addEventListener('click', () => {
  if (dropdown_menu.style.top === "-100px") {
    dropdown_menu.style.top = "0px";
  } else if (dropdown_menu.style.top === "0px") {
    dropdown_menu.style.top = "-100px";
  }
});



const button = document.getElementById('redirect_to_location');
button.parentNode.addEventListener('click', function() {
  const destinationURL = button.getAttribute('href');
  console.log(destinationURL);

  window.location.href = destinationURL;
});



document.querySelectorAll('.nav-item').forEach(tab => {
  tab.addEventListener('click', function() {
    const targetText = this.textContent.trim();
    const targetElement = document.getElementById(targetText);
    if (targetElement) {

      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });

    }
  });
});


let mouseDown = false;
let startX, scrollLeft;

function startDragging(e, slider) {
  if (e.type === 'touchstart') {
    startX = e.touches[0].pageX - slider.offsetLeft;
  } else {
    startX = e.pageX - slider.offsetLeft;
  }
  mouseDown = true;
  scrollLeft = slider.scrollLeft;
}

function stopDragging() {
  mouseDown = false;
}

function move(e, slider) {
  e.preventDefault();
  if (!mouseDown) { return; }
  let x;
  if (e.type === 'touchmove') {
    x = e.touches[0].pageX - slider.offsetLeft;
  } else {
    x = e.pageX - slider.offsetLeft;
  }
  const scroll = (x - startX) * 1.5;
  slider.scrollLeft = scrollLeft - scroll;
}

function initializeSlider(slider) {
  slider.addEventListener('mousemove', e => move(e, slider), false);
  slider.addEventListener('mousedown', e => startDragging(e, slider), false);
  slider.addEventListener('mouseup', stopDragging, false);
  slider.addEventListener('mouseleave', stopDragging, false);
  slider.addEventListener('touchmove', e => move(e, slider), false);
  slider.addEventListener('touchstart', e => startDragging(e, slider), false);
  slider.addEventListener('touchend', stopDragging, false);
}

document.querySelectorAll('.reviews').forEach(initializeSlider); 
document.querySelectorAll('.header-f4-scrollable').forEach(initializeSlider);

