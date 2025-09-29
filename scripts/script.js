const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// Fade in effect on entering viewport
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in-item");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2, // value of item visible to trigger effect 02 === 20%
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, observerOptions);

  fadeElements.forEach((element) => {
    observer.observe(element);
  });
});

document.querySelector("#weppler").addEventListener("mouseover", () => {
  let insideText = document.querySelector("#weppler").innerHTML;

  insideText = insideText.replace("We Become", "Weppler");

  document.querySelector("#weppler").innerHTML = insideText;
});

// Countdown Timer

function updateCountdown() {
  const weddingDate = new Date("August 1, 2026 17:30:00").getTime();
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Stacked Gallery Functionality
class StackedGallery {
  constructor() {
    this.cards = document.querySelectorAll(".time-card");
    this.indicators = document.querySelectorAll(".indicator");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.currentIndex = 0;
    this.totalCards = this.cards.length;

    this.init();
  }

  init() {
    // Apply random rotations to each card
    this.applyRandomRotations();

    // Set up event listeners
    this.setupEventListeners();

    // Initialize the gallery - ensure first image is on top
    this.currentIndex = 0;
    this.updateGallery();
  }

  applyRandomRotations() {
    this.cards.forEach((card, index) => {
      // Generate random rotation between -15 and 15 degrees
      const rotation = (Math.random() - 0.5) * 30;
      card.style.transform = `rotate(${rotation}deg)`;

      // Add slight random offset for more natural stacking
      const offsetX = (Math.random() - 0.5) * 20;
      const offsetY = (Math.random() - 0.5) * 20;
      card.style.transform += ` translate(${offsetX}px, ${offsetY}px)`;
    });
  }

  setupEventListeners() {
    // Navigation buttons
    this.prevBtn.addEventListener("click", () => this.previousCard());
    this.nextBtn.addEventListener("click", () => this.nextCard());

    // Indicator dots
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToCard(index));
    });

    // Card clicks
    this.cards.forEach((card, index) => {
      card.addEventListener("click", () => this.goToCard(index));
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.previousCard();
      if (e.key === "ArrowRight") this.nextCard();
    });

    // Scroll wheel navigation
    // const galleryContainer = document.querySelector(".gallery-container");
    // galleryContainer.addEventListener("wheel", (e) => {
    //   e.preventDefault();
    //   if (e.deltaY > 0) {
    //     this.nextCard();
    //   } else {
    //     this.previousCard();
    //   }
    // });
  }

  nextCard() {
    this.currentIndex = (this.currentIndex + 1) % this.totalCards;
    this.updateGallery();
  }

  previousCard() {
    this.currentIndex =
      (this.currentIndex - 1 + this.totalCards) % this.totalCards;
    this.updateGallery();
  }

  goToCard(index) {
    this.currentIndex = index;
    this.updateGallery();
  }

  updateGallery() {
    // Remove active class from all cards and indicators
    this.cards.forEach((card) => card.classList.remove("active"));
    this.indicators.forEach((indicator) =>
      indicator.classList.remove("active")
    );

    // Add active class to current card and indicator
    this.cards[this.currentIndex].classList.add("active");
    this.indicators[this.currentIndex].classList.add("active");

    // Update z-index for stacking effect
    this.cards.forEach((card, index) => {
      let zIndex;
      if (index === this.currentIndex) {
        zIndex = 20; // Top of stack - higher than CSS default
      } else if (index < this.currentIndex) {
        zIndex = this.currentIndex - index + 1; // Cards before current
      } else {
        zIndex = this.totalCards - (index - this.currentIndex) + 1; // Cards after current
      }
      card.style.zIndex = zIndex;
    });
  }
}

// Initialize the gallery when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Small delay to ensure all elements are rendered
  setTimeout(() => {
    new StackedGallery();
  }, 100);
});
