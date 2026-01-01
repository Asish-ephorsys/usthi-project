

const toggleBtn = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Toggle menu
toggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Active link switch
const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    // Close menu on mobile after click
    navLinks.classList.remove("show");
  });
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