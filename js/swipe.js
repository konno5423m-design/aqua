document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  const track = carousel.querySelector(".track");
  const slides = carousel.querySelectorAll(".slide");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  const dotsWrap = carousel.querySelector(".dots");

  let index = 0;
  const slideCount = slides.length;

  // =====================
  // ドット生成
  // =====================
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => moveTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = dotsWrap.querySelectorAll(".dot");

  function updateDots() {
    dots.forEach(d => d.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function moveTo(i) {
    index = Math.max(0, Math.min(i, slideCount - 1));
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  function next() {
    if (index < slideCount - 1) moveTo(index + 1);
  }

  function prev() {
    if (index > 0) moveTo(index - 1);
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  // =====================
  // スワイプ処理
  // =====================
let startX = 0;
let currentX = 0;
let dragging = false;

carousel.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  dragging = true;
}, { passive: true });

carousel.addEventListener("touchmove", e => {
  if (!dragging) return;
  currentX = e.touches[0].clientX;
}, { passive: true });

carousel.addEventListener("touchend", () => {
  if (!dragging) return;

  const diff = currentX - startX;

  if (Math.abs(diff) > 50) {
    diff < 0 ? next() : prev();
  }

  dragging = false;
});