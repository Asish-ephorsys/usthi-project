// const menuToggle = document.getElementById("menuToggle");
// const navLinks = document.getElementById("navLinks");

// menuToggle.addEventListener("click", () => {
//     navLinks.classList.toggle("active");
// });
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

// our program
// our program

document.querySelectorAll(".toggle-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const content = btn.parentElement;
    const moreText = content.querySelector(".more-text");

    if (moreText.style.display === "block") {
      moreText.style.display = "none";
      btn.innerText = "Show More";
    } else {
      moreText.style.display = "block";
      btn.innerText = "Show Less";
    }
  });
});