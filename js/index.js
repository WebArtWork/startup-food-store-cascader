const elementHeight = document.querySelector('header').offsetHeight;
document.documentElement.style.setProperty('--dynamic-height', `${elementHeight}px`);

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

