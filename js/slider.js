// Photo slider/carousel logic for the "View photos" button on
// experience and project cards. Opens a modal overlay with prev/next
// navigation and dot indicators.

let sliderPhotos = [];
let sliderIndex = 0;

function buildSliderModal() {
  if (document.getElementById("photo-slider-modal")) return;

  const modal = document.createElement("div");
  modal.id = "photo-slider-modal";
  modal.className = "slider-modal hidden";
  modal.innerHTML = `
    <div class="slider-overlay"></div>
    <div class="slider-box">
      <button class="slider-close" aria-label="Close">&times;</button>
      <img class="slider-image" src="" alt="Project photo" />
      <div class="slider-controls">
        <button class="slider-arrow slider-prev" aria-label="Previous">&#10094;</button>
        <div class="slider-dots"></div>
        <button class="slider-arrow slider-next" aria-label="Next">&#10095;</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector(".slider-overlay").addEventListener("click", closeSlider);
  modal.querySelector(".slider-close").addEventListener("click", closeSlider);
  modal.querySelector(".slider-prev").addEventListener("click", () => moveSlider(-1));
  modal.querySelector(".slider-next").addEventListener("click", () => moveSlider(1));

  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("hidden")) return;
    if (e.key === "Escape") closeSlider();
    if (e.key === "ArrowLeft") moveSlider(-1);
    if (e.key === "ArrowRight") moveSlider(1);
  });
}

function openSlider(photos) {
  if (!photos || photos.length === 0) return;
  sliderPhotos = photos;
  sliderIndex = 0;

  const modal = document.getElementById("photo-slider-modal");
  renderSliderDots();
  updateSliderImage();
  modal.classList.remove("hidden");
  document.body.classList.add("slider-open");
}

function closeSlider() {
  const modal = document.getElementById("photo-slider-modal");
  modal.classList.add("hidden");
  document.body.classList.remove("slider-open");
}

function moveSlider(direction) {
  sliderIndex = (sliderIndex + direction + sliderPhotos.length) % sliderPhotos.length;
  updateSliderImage();
}

function updateSliderImage() {
  const modal = document.getElementById("photo-slider-modal");
  modal.querySelector(".slider-image").src = sliderPhotos[sliderIndex];

  modal.querySelectorAll(".slider-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === sliderIndex);
  });
}

function renderSliderDots() {
  const dotsWrap = document.querySelector("#photo-slider-modal .slider-dots");
  dotsWrap.innerHTML = sliderPhotos.map((_, i) =>
    `<span class="slider-dot${i === 0 ? " active" : ""}" data-index="${i}"></span>`
  ).join("");

  dotsWrap.querySelectorAll(".slider-dot").forEach(dot => {
    dot.addEventListener("click", () => {
      sliderIndex = Number(dot.dataset.index);
      updateSliderImage();
    });
  });
}

// Event delegation: catches clicks on "View photos" buttons even though
// experience/project cards are generated dynamically by render.js
function setupSliderTriggers() {
  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest(".view-photos-btn");
    if (!btn) return;

    const photos = JSON.parse(decodeURIComponent(btn.dataset.photos || "[]"));
    openSlider(photos);
  });
}