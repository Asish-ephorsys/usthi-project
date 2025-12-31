// const menuToggle = document.getElementById("menuToggle");
// const navLinks = document.getElementById("navLinks");

// menuToggle.addEventListener("click", () => {
//     navLinks.classList.toggle("active");
// });
// donate button
const donateBtn = document.getElementById("donateBtn");
const donateOverlay = document.getElementById("donateOverlay");
const closeDonate = document.getElementById("closeDonate");

const payBtn = document.getElementById("payBtn");
const thankyouOverlay = document.getElementById("thankyouOverlay");
const closeThankyou = document.getElementById("closeThankyou");

const alertOverlay = document.getElementById("captchaAlert");
const closeAlert = document.getElementById("closeAlert");

const captchaQ = document.getElementById("captchaQ");
const captchaInput = document.getElementById("captchaInput");

let captchaAnswer = 0;

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  captchaAnswer = a + b;
  captchaQ.textContent = `${a} + ${b} =`;
  captchaInput.value = "";
}

donateBtn.onclick = e => {
  e.preventDefault();
  generateCaptcha();
  donateOverlay.style.display = "flex";
};

closeDonate.onclick = () => donateOverlay.style.display = "none";

payBtn.onclick = () => {
  const name = fullName.value.trim();
  const phone = phone.value.trim();
  const address = address.value.trim();
  const captcha = captchaInput.value.trim();
  const terms = terms.checked;

  if (!name || !phone || !address || !captcha || !terms) {
    alert("Please fill all required fields");
    return;
  }

  if (parseInt(captcha) !== captchaAnswer) {
    alertOverlay.style.display = "flex";
    generateCaptcha();
    return;
  }

  const amount = document.querySelector("input[name='amount']:checked").value;

  new Razorpay({
    key: "rzp_test_1234567890",
    amount: amount * 100,
    currency: "INR",
    name: "USTHI FOUNDATION",
    description: "Donation",
    handler: () => {
      donateOverlay.style.display = "none";
      thankyouOverlay.style.display = "flex";
    }
  }).open();
};

closeAlert.onclick = () => alertOverlay.style.display = "none";
closeThankyou.onclick = () => thankyouOverlay.style.display = "none";


// end

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

// our testimonial page
const testimonials = [
    {
        image: "image/managing img2.jpeg",
        text: "Your NGO has changed lives and brought hope to many families.",
        name: "Samuel Schick"
    },
    {
        image: "image/managing img2.jpeg",
        text: "Amazing work for education and children welfare.",
        name: "Anita Roy"
    },
    {
        image: "image/managing img2.jpeg",
        text: "I am proud to support this organization.",
        name: "Rahul Das"
    },
    {
        image: "image/managing img2.jpeg",
        text: "Your efforts truly make a difference in society.",
        name: "Pooja Mishra"
    },
    {
        image: "image/managing img2.jpeg",
        text: "Transparent, honest and impactful NGO.",
        name: "Amit Kumar"
    },
    {
        image: "image/managing img2.jpeg",
        text: "Thank you for helping needy communities.",
        name: "Sneha Patel"
    }
];

let currentIndex = 0;

const img = document.getElementById("userImage");
const text = document.getElementById("testimonialText");
const name = document.getElementById("testimonialName");
const dotsContainer = document.getElementById("dots");

function loadTestimonial(index) {
    img.src = testimonials[index].image;
    text.innerText = `"${testimonials[index].text}"`;
    name.innerText = testimonials[index].name;

    document.querySelectorAll(".dot").forEach(dot => dot.classList.remove("active"));
    dotsContainer.children[index].classList.add("active");
}

function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    loadTestimonial(currentIndex);
}

function prevTestimonial() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    loadTestimonial(currentIndex);
}

// Create dots
testimonials.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.onclick = () => {
        currentIndex = index;
        loadTestimonial(index);
    };
    dotsContainer.appendChild(dot);
});

// Initial load
loadTestimonial(currentIndex);




