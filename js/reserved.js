document.addEventListener("DOMContentLoaded", () => {
  const reserved = document.querySelector(".reserved");
  const about = document.querySelector("#about");
  const footer = document.querySelector("footer");
  const menu = document.querySelector("#menulist");

  if (!reserved) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.target === about) {
        reserved.classList.toggle("is-show", !entry.isIntersecting);
      }

      if (entry.target === footer) {
        reserved.classList.toggle("is-hide-footer", entry.isIntersecting);
      }

      if (entry.target === menu) {
        reserved.classList.toggle("cta-hide", entry.isIntersecting);
      }

    });

    // ← AOSに再計算させる
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }

  }, {
    threshold: 0,
    rootMargin: "-80px 0px 0px 0px"
  });

  if (about) observer.observe(about);
  if (footer) observer.observe(footer);
  if (menu) observer.observe(menu);
});