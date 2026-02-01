document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  const track = carousel.querySelector(".track");
  let slides = Array.from(track.children);
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  const dotsWrap = carousel.querySelector(".dots");

  // クローン作成
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
    if (animate) {
      track.style.transition = "transform .4s ease";
    } else {
      track.style.transition = "none";
    }
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
    if (slides[index].isSameNode(firstClone)) {
      moveTo(1, false);
    }
    if (slides[index].isSameNode(lastClone)) {
      moveTo(slides.length - 2, false);
    }
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
});
