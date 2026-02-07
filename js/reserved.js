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

document.addEventListener("DOMContentLoaded", () => {
  const reserved = document.querySelector(".reserved");
  const footer = document.querySelector("footer");

  if (!reserved || !footer) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          reserved.classList.add("is-hide-footer");
        } else {
          reserved.classList.remove("is-hide-footer");
        }
      });
    },
    {
      root: null,
      threshold: 0
    }
  );

  observer.observe(footer);


  
});

const menuSection = document.querySelector('#menulist');
const cta = document.querySelector('.reserved');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cta.classList.add('cta-hide');
      } else {
        cta.classList.remove('cta-hide');
      }
    });
  },
  {
    threshold: 0.2
  }
);

observer.observe(menuSection);