document.addEventListener("DOMContentLoaded", () => {
  const options = {
  perMove: 1, 
  gap: 16,
  cover: true,　
  heightRatio: 0.5,
  updateOnMove: true,
  padding: '5rem',
  type: 'loop',
  focus:'center',
}


const splide = new Splide(".splide", options);
splide.mount(window.splide.Extensions);})

document.addEventListener("DOMContentLoaded", () => {


  function initCarousel(carouselId, trackClass, slideClass) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const track = carousel.querySelector(trackClass);
    let slides = Array.from(track.children);
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");
    const dotsWrap = carousel.querySelector(".dots");

    // クローン
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    slides = Array.from(track.children);

    let index = 1;
    const slideCount = slides.length;

    track.style.transform = `translateX(-${index * 100}%)`;

    // ドット
    const realCount = slideCount - 2;
    dotsWrap.innerHTML = "";
    for (let i = 0; i < realCount; i++) {
      const dot = document.createElement("span");
      dot.className = "dot";
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => moveTo(i + 1));
      dotsWrap.appendChild(dot);
    }
    const dots = dotsWrap.querySelectorAll(".dot");

    function updateDots() {
      dots.forEach(d => d.classList.remove("active"));
      dots[(index - 1 + realCount) % realCount].classList.add("active");
    }

    function moveTo(i, animate = true) {
      track.style.transition = animate ? "transform .4s ease" : "none";
      index = i;
      track.style.transform = `translateX(-${index * 100}%)`;
      updateDots();
    }

    function next() {
      moveTo(index + 1);
    }

    function prev() {
      moveTo(index - 1);
    }

    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);

    track.addEventListener("transitionend", () => {
      if (slides[index] === firstClone) moveTo(1, false);
      if (slides[index] === lastClone) moveTo(slides.length - 2, false);
    });

    // スワイプ
    let startX = 0;
    let currentX = 0;
    let dragging = false;

    carousel.addEventListener("touchstart", e => {
      startX = currentX = e.touches[0].clientX;
      dragging = true;
    }, { passive: true });

    carousel.addEventListener("touchmove", e => {
      if (!dragging) return;
      currentX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener("touchend", () => {
      if (!dragging) return;
      const diff = currentX - startX;
      if (Math.abs(diff) > 50) diff < 0 ? next() : prev();
      dragging = false;
    });
  }

  initCarousel("carousel", ".track", ".slide");
  initCarousel("carousel2", ".track2", ".slide2");

});

  // AOS
  AOS.init();
