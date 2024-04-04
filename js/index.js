let mouseDown = false;
let startX, scrollLeft;
const slider = document.querySelector('.header-f4-scrollable');

const elementHeight = document.querySelector('header').offsetHeight;
document.documentElement.style.setProperty('--dynamic-height', `${elementHeight}px`);

document.querySelectorAll('.nav-item').forEach(tab => {
  tab.addEventListener('click', function() {
    const targetText = this.textContent.trim();
    const targetElement = document.getElementById(targetText);
    if (targetElement) {

      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });

    }
  });
});


const startDragging = (e) => {
  if (e.type === 'touchstart') {
    startX = e.touches[0].pageX - slider.offsetLeft;
  } else {
    startX = e.pageX - slider.offsetLeft;
  }
  mouseDown = true;
  scrollLeft = slider.scrollLeft;
}

const stopDragging = () => {
  mouseDown = false;
}

const move = (e) => {
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

slider.addEventListener('mousemove', move, false);
slider.addEventListener('mousedown', startDragging, false);
slider.addEventListener('mouseup', stopDragging, false);
slider.addEventListener('mouseleave', stopDragging, false);

slider.addEventListener('touchmove', move, false);
slider.addEventListener('touchstart', startDragging, false);
slider.addEventListener('touchend', stopDragging, false);
