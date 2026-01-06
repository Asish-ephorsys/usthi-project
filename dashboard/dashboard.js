document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.innerText = "";
//  🔐 DEMO LOGIN (TEMP)
      // if (username === "admin@gmail.com" && password === "123456") {
      //   showPopup("Login successful", "success");
      //   document.getElementById("authModal").style.display = "none";
      //   adminPanel.style.display = "flex";
      //   return;
      // }
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        // ✅ Login success → redirect
        window.location.href = "dashboard.html";
      } else {
        // ❌ Login failed → show popup message
        const data = await response.json();
        errorMessage.innerText = data.detail || "Invalid username or password";
      }
    } catch (error) {
      errorMessage.innerText = "Server not reachable";
    }
  });

let currentType = "";
let popupTimer;

const adminPanel = document.getElementById("adminPanel");
const popupMsg = document.getElementById("popupMsg");

function showPopup(message, type = "error") {
  popupMsg.innerHTML =
    message +
    ' <span onclick="closePopup()" style="cursor:pointer;font-weight:bold;margin-left:10px;">✖</span>';

  popupMsg.className = "popup-msg " + type;
  popupMsg.classList.add("show");

  clearTimeout(popupTimer);
  popupTimer = setTimeout(closePopup, 2000);
}

function closePopup() {
  popupMsg.classList.remove("show");
}

// function openDemo() {
//   document.getElementById("authModal").style.display = "none";
//   adminPanel.style.display = "flex";
// }

function logout() {
  location.reload();
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("show");
}

function closeUpload() {
  document.getElementById("uploadPopup").style.display = "none";
}

function addItem() {
  if (currentType === "image" && imgCount) imgCount.innerText++;
  if (currentType === "video" && videoCount) videoCount.innerText++;
  if (currentType === "news" && newsCount) newsCount.innerText++;
  if (currentType === "event" && eventCount) eventCount.innerText++;
  closeUpload();
}

function toggleDropdown() {
  const dropdown = document.getElementById("dropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

document.addEventListener("click", function (e) {
  if (!e.target.closest(".profile")) {
    document.getElementById("dropdown").style.display = "none";
  }
});

function openSection(type) {
  document.getElementById("sectionPopup").style.display = "flex";
  document.getElementById("sectionTitle").innerText = "Manage " + type;
}

function closeSection() {
  document.getElementById("sectionPopup").style.display = "none";
}

// new js code
/* ================================
   LOGIN (DEMO) BUTTON VISIBILITY
================================ */

/* safely find login demo button */
function getLoginDemoBtn() {
  return document.querySelector('#loginForm button[onclick="openDemo()"]');
}

/* hide login demo button */
function hideLoginDemoBtn() {
  const btn = getLoginDemoBtn();
  if (btn) btn.style.display = "none";
}

/* show login demo button */
function showLoginDemoBtn() {
  const btn = getLoginDemoBtn();
  if (btn) btn.style.display = "block";
}

// new codw
let uploadType = "";

function openUpload(type) {
  uploadType = type;

  const fileInput = document.getElementById("uploadInput");
  const eventDesc = document.getElementById("eventDesc");

  // RESET
  fileInput.value = "";
  fileInput.multiple = false;
  fileInput.accept = "";
  eventDesc.style.display = "none";

  // PHOTO → MULTIPLE IMAGES
  if (type === "Photo") {
    fileInput.accept = "image/*";
    fileInput.multiple = true;
  }

  // VIDEO → SINGLE VIDEO
  if (type === "Video") {
    fileInput.accept = "video/*";
  }

  // NEWS → ONE IMAGE
  if (type === "News") {
    fileInput.accept = "image/*";
    fileInput.multiple = true;
    eventDesc.style.display = "block";
  }

  // EVENT → MULTIPLE IMAGES + DESCRIPTION
  if (type === "Event") {
    fileInput.accept = "image/*";
    fileInput.multiple = true;
    eventDesc.style.display = "block";
  }

  document.getElementById("uploadTitle").innerText = "Add " + type;
  document.getElementById("uploadPopup").style.display = "flex";
}

function closeUpload() {
  document.getElementById("uploadPopup").style.display = "none";
}

function submitUpload() {
  alert(uploadType + " uploaded");
  closeUpload();
}

//  CONTACT FORM JAVASCRIPT start here
/* =================================================================================================================================================================
  CONTACT FORM → ADMIN PANEL STORAGE
==================================================================================================================================================================== */

// Get form
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = contactForm.querySelectorAll("input, textarea");

    const contactData = {
      name: inputs[0].value.trim(),
      email: inputs[1].value.trim(),
      phone: inputs[2].value.trim(),
      subject: inputs[3].value.trim(),
      message: inputs[4].value.trim(),
      time: new Date().toLocaleString(),
    };

    // Get old messages
    let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];

    addContactMessage(contactData);

    alert("Message sent successfully");

    contactForm.reset();
  });
}

function openContactPage() {
  document.getElementById("contactAdmin").style.display = "block";
  loadContactMessages();
}

function closeContactPage() {
  document.getElementById("contactAdmin").style.display = "none";
}

// STEP 1: ADD THIS FUNCTION (TOP OF JS)
// ADD MESSAGE (REAL OR DUMMY)
function addContactMessage(data) {
  let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];

  // data.read = false;
  // data.time = new Date().toLocaleString();
  // data.id = Date.now(); // UNIQUE ID
  data.id = Date.now() + Math.floor(Math.random() * 1000); // safer ID

  data.read = false;
  data.time = new Date().toLocaleString();

  messages.push(data);
  localStorage.setItem("contactMessages", JSON.stringify(messages));

  loadContactMessages();
  updateMessageCounter();
}

// very very important for add dummy data

// function resetContactMessages() {
//   localStorage.removeItem("contactMessages");
// }

// resetContactMessages(); // ⚠️ REMOVE after testing

// very very important for add dummy data 2
// ONLY FOR TESTING — DO NOT AUTO CALL
// function resetContactMessages() {
//   localStorage.removeItem("contactMessages");
//   location.reload();
// }

// localStorage.removeItem("contactMessages");

// very very important for add dummy data

// function insertDummyMessagesOnce() {
//   const existing = JSON.parse(localStorage.getItem("contactMessages"));

//   // if messages already exist, DO NOTHING
//   if (Array.isArray(existing) && existing.length > 0) return;

//   const dummyMessages = [
//     {
//       id: 1,
//       name: "Sita",
//       email: "sita@gmail.com",
//       phone: "8888888888",
//       subject: "Volunteer",
//       message: "I want to help",
//       read: false,
//       time: new Date().toLocaleString(),
//     },
//     {
//       id: 2,
//       name: "Aman",
//       email: "aman@gmail.com",
//       phone: "7777777777",
//       subject: "Job",
//       message: "Any openings?",
//       read: false,
//       time: new Date().toLocaleString(),
//     },
//     {
//       id: 2,
//       name: "Asish",
//       email: "aman@gmail.com",
//       phone: "7777777777",
//       subject: "Job",
//       message: "Any openings?",
//       read: false,
//       time: new Date().toLocaleString(),
//     },
//   ];

//   localStorage.setItem("contactMessages", JSON.stringify(dummyMessages));
// }

function loadContactMessages() {
  const grid = document.getElementById("contactGrid");
  grid.innerHTML = "";

  // Get messages from localStorage
  let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
  // now new function is add

  // Create cards
  messages.forEach((msg, index) => {
    const card = document.createElement("div");
    card.className = "contact-card";

    // Set onclick to open popup
    card.onclick = () => openMessagePopup(msg);

    card.innerHTML = `
      <strong>${msg.name}</strong>
      ${msg.read ? "" : "<span class='new-badge'>NEW</span>"}<br>
      📧 ${msg.email}<br>
      📞 ${msg.phone}<br>
      📝 ${msg.subject}<br><br>
      ${msg.message}<br><br>
      <small>${msg.time}</small>
      <div class="card-actions">

<button onclick="markAsRead(${msg.id}, event)">Mark Read</button>
<button class="delete-btn" onclick="deleteMessage(${
      msg.id
    }, event)">Delete</button>

      </div>
    `;

    grid.appendChild(card);
  });

  updateMessageCounter();
}

function deleteMessage(id, e) {
  e.stopPropagation();

  let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
  messages = messages.filter((m) => m.id !== id);

  localStorage.setItem("contactMessages", JSON.stringify(messages));

  loadContactMessages();
  updateMessageCounter();
}

function markAsRead(id, e) {
  e.stopPropagation();

  let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
  const msg = messages.find((m) => m.id === id);
  if (!msg) return;

  msg.read = true; // ALWAYS TRUE

  localStorage.setItem("contactMessages", JSON.stringify(messages));
  loadContactMessages();
  updateMessageCounter();
}

// sidebar contact Counter JS
function updateMessageCounter() {
  const messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
  const unread = messages.filter((m) => !m.read).length;

  const countEl = document.getElementById("msgCount");
  if (countEl) {
    countEl.innerText = unread;
    countEl.style.display = unread > 0 ? "inline-block" : "none";
  }
}

// Call on page load
updateMessageCounter();

function openMessagePopup(msg) {
  let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];

  const storedMsg = messages.find((m) => m.id === msg.id);
  if (storedMsg && !storedMsg.read) {
    storedMsg.read = true;
    localStorage.setItem("contactMessages", JSON.stringify(messages));
  }

  loadContactMessages();
  updateMessageCounter();

  document.getElementById("popupDetails").innerHTML = `
    <h3>${msg.name}</h3>
    <p><b>Email:</b> ${msg.email}</p>
    <p><b>Phone:</b> ${msg.phone}</p>
    <p><b>Subject:</b> ${msg.subject}</p>
    <p><b>Message:</b><br>${msg.message}</p>
  `;

  document.getElementById("messagePopup").style.display = "flex";
}

function closeMessagePopup() {
  document.getElementById("messagePopup").style.display = "none";
}
// make clicking outside popup close
document.getElementById("messagePopup").addEventListener("click", function (e) {
  if (e.target === this) {
    closeMessagePopup();
  }
});

// insertDummyMessagesOnce();
loadContactMessages();
updateMessageCounter();

// DONATION JAVASCRIPT
/* =================================================================================================================================================================
   DONATION STORAGE & ADMIN PANEL
==================================================================================================================================================================== */

// OPEN / CLOSE PAGE
function openDonationPage() {
  document.getElementById("donationAdmin").style.display = "block";
  loadDonations();
}

function closeDonationPage() {
  document.getElementById("donationAdmin").style.display = "none";
}

// ADD DONATION (FROM NGO PAYMENT PAGE)
function addDonation(data) {
  let donations = JSON.parse(localStorage.getItem("donations")) || [];

  // SAFER UNIQUE ID
  data.id = Date.now() + Math.floor(Math.random() * 1000);

  data.id = crypto.randomUUID();

  // IMAGE FALLBACK
  if (!data.image || data.image.trim() === "") {
    data.image = "https://via.placeholder.com/400x200?text=No+Image";
  }

  data.read = false;
  data.time = new Date().toLocaleString();

  donations.push(data);
  localStorage.setItem("donations", JSON.stringify(donations));

  updateDonationCounter();
}

function loadDonations() {
  const grid = document.getElementById("donationGrid");
  grid.innerHTML = "";

  let donations = JSON.parse(localStorage.getItem("donations")) || [];

  donations.forEach((d) => {
    const card = document.createElement("div");
    card.className = "donation-card";

    card.innerHTML = `
      <img 
        src="${d.image}" 
        loading="lazy"
        onerror="this.src='https://via.placeholder.com/400x200?text=Image+Not+Found'"
      />

      <strong>${d.name}</strong>
      ${d.read ? "" : "<span class='new-badge'>NEW</span>"}<br>
      📞 ${d.mobile}<br>
      💳 ${d.utr}<br>
      <small>${d.time}</small>

      <div class="card-actions">
        <button class="read-btn">Read</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    /* 🔹 CARD CLICK → POPUP */
    card.addEventListener("click", () => {
      openDonationPopup(d);
    });

    /* 🔹 READ BUTTON */
    card.querySelector(".read-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      markDonationRead(d.id);
    });

    /* 🔹 DELETE BUTTON */
    card.querySelector(".delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      deleteDonation(d.id);
    });

    grid.appendChild(card);
  });

  updateDonationCounter();
}

function deleteDonation(id) {
  let donations = JSON.parse(localStorage.getItem("donations")) || [];

  donations = donations.filter((d) => d.id !== id);

  localStorage.setItem("donations", JSON.stringify(donations));
  loadDonations();
}

function markDonationRead(id) {
  let donations = JSON.parse(localStorage.getItem("donations")) || [];

  const d = donations.find((x) => x.id === id);
  if (!d) return;

  d.read = true;

  localStorage.setItem("donations", JSON.stringify(donations));
  loadDonations();
}

// COUNTER
function updateDonationCounter() {
  let donations = JSON.parse(localStorage.getItem("donations")) || [];
  let unread = donations.filter((d) => !d.read).length;

  const el = document.getElementById("donationCount");
  if (el) {
    el.innerText = unread;
    el.style.display = unread > 0 ? "inline-block" : "none";
  }
}

// POPUP
function openDonationPopup(d) {
  let donations = JSON.parse(localStorage.getItem("donations")) || [];
  const found = donations.find((x) => x.id === d.id);
  if (found && !found.read) {
    found.read = true;
    localStorage.setItem("donations", JSON.stringify(donations));
  }

  document.getElementById("donationPopupDetails").innerHTML = `
    <h3>${d.name}</h3>
    <p><b>Mobile:</b> ${d.mobile}</p>
    <p><b>UTR:</b> ${d.utr}</p>
    <img src="${d.image}" style="width:100%;margin-top:10px;border-radius:8px">
  `;

  document.getElementById("donationPopup").style.display = "flex";
  updateDonationCounter();
}

function closeDonationPopup() {
  document.getElementById("donationPopup").style.display = "none";
}

// INIT
updateDonationCounter();
/* ======================================
   DUMMY DONATION DATA (TESTING ONLY)
====================================== */

function addDummyDonations() {
  const dummy = [
    {
      image: "./image/payment1.jpeg",
      name: "Rahul Sharma",
      mobile: "9876543210",
      utr: "UTR123456789",
    },
    {
      image: "./image/payment2.jpeg",
      name: "Anita Verma",
      mobile: "9123456789",
      utr: "UTR987654321",
    },
    {
      image: "./image/payment2.jpeg",
      name: "Anita Verma",
      mobile: "9123456789",
      utr: "UTR987654321",
    },
    {
      image: "./image/payment2.jpeg",
      name: "Anita Verma",
      mobile: "9123456789",
      utr: "UTR987654321",
    },
  ];

  let donations = JSON.parse(localStorage.getItem("donations")) || [];
  if (donations.length > 0) return;

  dummy.forEach((d) => addDonation(d));
}

addDummyDonations();

// localStorage.removeItem("donations");
// location.reload();
