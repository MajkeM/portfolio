// Simple slider logic for .slider

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slider-track .slide");
  const dots = document.querySelectorAll(".slider-dot");
  const leftArrow = document.querySelector(".slider-arrow-left");
  const rightArrow = document.querySelector(".slider-arrow-right");
  const bgCurrent = document.getElementById("slider-background-current");
  const bgNext = document.getElementById("slider-background-next");
  let current = 0;
  // Array of background images for each slide
  const backgroundImages = [
    "images/portfolioToPortfolio.png",
    "images/bouci.png",
    "images/DHgravirovani-logo.png",
    "images/time-is-magic.png",
    "images/stupidGamesBG.jpeg",
    "images/moreCS.jpg",
  ];
  // Set initial background
  if (bgCurrent) bgCurrent.src = backgroundImages[0];
  if (bgNext) bgNext.src = backgroundImages[0];

  function animateBg(direction, nextIdx) {
    if (!bgCurrent || !bgNext) return;
    // Set next image src and initial state
    bgNext.src = backgroundImages[nextIdx];
    bgNext.style.opacity = 1;
    // Remove all animation classes
    bgCurrent.className = "slider-background";
    bgNext.className = "slider-background";
    // Set initial positions
    if (direction === "right") {
      bgNext.classList.add("slide-in-right-start");
    } else {
      bgNext.classList.add("slide-in-left-start");
    }
    // Force reflow
    void bgNext.offsetWidth;
    // Animate
    if (direction === "right") {
      bgCurrent.classList.add("slide-out-left");
      bgNext.classList.remove("slide-in-right-start");
      bgNext.classList.add("slide-in-right");
    } else {
      bgCurrent.classList.add("slide-out-right");
      bgNext.classList.remove("slide-in-left-start");
      bgNext.classList.add("slide-in-left");
    }
    // After animation, swap roles
    setTimeout(() => {
      bgCurrent.src = backgroundImages[nextIdx];
      bgCurrent.className = "slider-background";
      bgNext.className = "slider-background";
      bgNext.style.opacity = 0;
    }, 500); // match CSS transition duration
  }

  function showSlide(idx, direction = "right") {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === idx);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === idx);
    });
    // Move the track (optional, for sliding effect)
    const track = document.querySelector(".slider-track");
    track.style.transform = `translateX(-${idx * 100}%)`;
    // Animate background
    if (bgCurrent && bgNext && backgroundImages[idx]) {
      animateBg(direction, idx);
    }
  }

  leftArrow.addEventListener("click", function () {
    const prev = current;
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current, "left");
  });
  rightArrow.addEventListener("click", function () {
    const prev = current;
    current = (current + 1) % slides.length;
    showSlide(current, "right");
  });
  dots.forEach((dot, i) => {
    dot.addEventListener("click", function () {
      const direction = i > current ? "right" : "left";
      current = i;
      showSlide(current, direction);
    });
  });
  // Initialize
  showSlide(current);
});
