const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// news section
/* news section */
// Simple hover animation enhancer (future use)
document.querySelectorAll(".news-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "none";
  });
});