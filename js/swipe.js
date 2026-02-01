document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector("#carousel");
  const track = carousel.querySelector(".track");
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  const dotsContainer = carousel.querySelector(".dots");

  let index = 0;
  let isMoving = false;

  // ドット生成
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => moveTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.children;

  function moveTo(i) {
    if (isMoving) return;
    isMoving = true;

    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;

    [...dots].forEach(d => d.classList.remove("active"));
    dots[index].classList.add("active");

    setTimeout(() => {
      isMoving = false;
    }, 400); // transitionと同じ時間
  }

  nextBtn.addEventListener("click", () => moveTo(index + 1));
  prevBtn.addEventListener("click", () => moveTo(index - 1));

  /* スワイプ */
  let startX = 0;

  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
      moveTo(index + 1);
    } else {
      moveTo(index - 1);
    }
  });
});