// === GALERIA CONTROLES NOVA ===
document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.querySelector(".gallery__grid");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!galleryGrid || !prevBtn || !nextBtn) return;

  function getSlideDistance() {
    const firstImg = galleryGrid.querySelector("img");
    if (!firstImg) return 320;
    const styles = getComputedStyle(galleryGrid);
    const gap = parseInt(styles.columnGap) || 16;
    return firstImg.clientWidth + gap;
  }

  function updateButtons() {
    prevBtn.disabled = galleryGrid.scrollLeft <= 0;
    const maxScroll = galleryGrid.scrollWidth - galleryGrid.clientWidth - 1;
    nextBtn.disabled = galleryGrid.scrollLeft >= maxScroll;
  }

  prevBtn.addEventListener("click", () => {
    galleryGrid.scrollBy({ left: -getSlideDistance(), behavior: "smooth" });
    setTimeout(updateButtons, 300);
  });

  nextBtn.addEventListener("click", () => {
    galleryGrid.scrollBy({ left: getSlideDistance(), behavior: "smooth" });
    setTimeout(updateButtons, 300);
  });

  galleryGrid.addEventListener("scroll", updateButtons);
  updateButtons();
});
