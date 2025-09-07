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
