const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// photo effect
const cards = document.querySelectorAll(".team-card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        card.classList.add("active");

        setTimeout(() => {
            card.classList.remove("active");
        }, 500);
    });
});