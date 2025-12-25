const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
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