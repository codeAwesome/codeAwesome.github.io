var ripple = document.querySelectorAll('.ripple-container');

[].forEach.call(ripple, function(e) {

  e.addEventListener('click', function(e) {

    var offset = this.parentNode.getBoundingClientRect();
    var effect = this.querySelector('.ripple-effect');

    effect.style.top = '25px'
    effect.style.left = '25px'
    this.classList.add('ripple-effect-animation');

  }, false);

  e.addEventListener('animationend', removeAnimation);
  e.addEventListener('webkitAnimationEnd', removeAnimation);
  e.addEventListener('oanimationend', removeAnimation);
  e.addEventListener('MSAnimationEnd', removeAnimation);
});

function removeAnimation() {
  if (this.classList) {
    this.classList.remove('ripple-effect-animation');
  } else {
    this.className = this.className.replace(new RegExp('(^|\\b)' + 'ripple-effect-animation'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
}
