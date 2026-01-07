

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



// get in touch api
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-box form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector('input[placeholder="Your Name"]').value.trim();
    const email = form.querySelector('input[placeholder="Email Address"]').value.trim();
    const phone = form.querySelector('input[placeholder="Phone Number"]').value.trim();
    const message = form.querySelector('textarea[placeholder="Type Your Message"]').value.trim();

    if (!name || !email || !phone || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const contactData = {
      name,
      email,
      phone,
      message,
    };

    try {
      const response = await fetch("https://your-api-url.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        alert("Thank you! Your message has been sent successfully.");
        form.reset();
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  });
});
