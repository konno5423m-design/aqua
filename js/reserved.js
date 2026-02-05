const target = document.querySelector('#about');
const reserved = document.querySelector('.reserved');

if (target && reserved) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        reserved.classList.remove('is-show');
      } else {
        reserved.classList.add('is-show');
      }
    });
  }, {
    rootMargin: '-80px 0px 0px 0px', // ← header分ずらす
    threshold: 0
  });

  observer.observe(target);
}