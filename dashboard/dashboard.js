document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.innerText = "";
    //  🔐 DEMO LOGIN (TEMP)
    if (username === "a@gmail.com" && password === "123456") {
      showPopup("Login successful", "success");
      document.getElementById("authModal").style.display = "none";
      adminPanel.style.display = "flex";
      return;
    }
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

  const eventTitle = document.getElementById("eventTitle");
  eventTitle.style.display = "none";
  eventTitle.value = "";

  // PHOTO → MULTIPLE IMAGES
  if (type === "Photo") {
    fileInput.accept = "image/*";
    // fileInput.multiple = true;
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
  // if (type === "Event") {
  //   fileInput.accept = "image/*";
  //   fileInput.multiple = true;
  //   eventDesc.style.display = "block";
  // }
  if (type === "Program") {
    fileInput.accept = "image/*";
    fileInput.multiple = true;
    eventDesc.style.display = "block";
    eventTitle.style.display = "block";
  }

  document.getElementById("uploadTitle").innerText = "Add " + type;
  document.getElementById("uploadPopup").style.display = "flex";
}

function closeUpload() {
  document.getElementById("uploadPopup").style.display = "none";
}

async function submitUpload() {
  if (uploadType !== "Program") {
    alert("Only event upload handled here");
    return;
  }

  const title = document.getElementById("eventTitle").value.trim();
  const desc = document.getElementById("eventDesc").value.trim();
  const input = document.getElementById("uploadInput");

  if (!title || !desc || !input.files.length) {
    alert("Please fill all event fields");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", desc);

  for (let i = 0; i < input.files.length; i++) {
    formData.append("images", input.files[i]);
  }

  await fetch("http://localhost:8000/api/events", {
    method: "POST",
    body: formData,
  });

  alert("Event added successfully");
  closeUpload();
  loadEvents();
}

async function loadEvents() {
  const container = document.getElementById("eventGrid");
  if (!container) return;

  container.innerHTML = "";

  const res = await fetch("http://localhost:8000/api/events");
  const events = await res.json();

  events.forEach((e) => {
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <h3>${e.title}</h3>
      <p>${e.description}</p>
      <div class="event-images">
        ${e.images.map((img) => `<img src="${img}" />`).join("")}
      </div>

      <button onclick="deleteEvent('${e.id}')">Delete</button>
    `;

    container.appendChild(card);
  });
}

async function deleteEvent(id) {
  if (!confirm("Delete this event?")) return;

  await fetch(`http://localhost:8000/api/events/${id}`, {
    method: "DELETE",
  });

  loadEvents();
}

//  CONTACT FORM JAVASCRIPT start here
/* =================================================================================================================================================================
  CONTACT FORM → ADMIN PANEL STORAGE
==================================================================================================================================================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const inputs = contactForm.querySelectorAll("input, textarea");

    const contactData = {
      name: inputs[0].value.trim(),
      email: inputs[1].value.trim(),
      phone: inputs[2].value.trim(),
      subject: inputs[3].value.trim(),
      message: inputs[4].value.trim(),
    };

    await fetch("http://localhost:8000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });

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

async function loadContactMessages() {
  const grid = document.getElementById("contactGrid");
  grid.innerHTML = "";

  const res = await fetch("http://localhost:8000/api/contact");
  const messages = await res.json();

  messages.forEach((msg) => {
    const card = document.createElement("div");
    card.className = "contact-card";
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
        <button onclick="markAsRead('${msg.id}', event)">Mark Read</button>
        <button class="delete-btn" onclick="deleteMessage('${
          msg.id
        }', event)">Delete</button>
      </div>
    `;
    grid.appendChild(card);
  });
  updateStatsCounts();
  updateMessageCounter();
}
async function markAsRead(id, e) {
  e.stopPropagation();
  await fetch(`http://localhost:8000/api/contact/${id}/read`, {
    method: "PUT",
  });
  loadContactMessages();
}

async function deleteMessage(id, e) {
  e.stopPropagation();
  await fetch(`http://localhost:8000/api/contact/${id}`, {
    method: "DELETE",
  });
  loadContactMessages();
}

async function updateMessageCounter() {
  const res = await fetch("http://localhost:8000/api/contact/unread-count");
  const data = await res.json();

  const el = document.getElementById("msgCount");
  el.innerText = data.count;
  el.style.display = data.count > 0 ? "inline-block" : "none";
}
async function openMessagePopup(msg) {
  if (!msg.read) {
    await fetch(`http://localhost:8000/api/contact/${msg.id}/read`, {
      method: "PUT",
    });
  }

  document.getElementById("popupDetails").innerHTML = `
    <h3>${msg.name}</h3>
    <p><b>Email:</b> ${msg.email}</p>
    <p><b>Phone:</b> ${msg.phone}</p>
    <p><b>Subject:</b> ${msg.subject}</p>
    <p><b>Message:</b><br>${msg.message}</p>
  `;

  document.getElementById("messagePopup").style.display = "flex";
  loadContactMessages();
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

// DONATION JAVASCRIPT
/* =================================================================================================================================================================
   DONATION STORAGE & ADMIN PANEL
==================================================================================================================================================================== */
// document
//   .getElementById("donationForm")
//   .addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", name.value);
//     formData.append("mobile", mobile.value);
//     formData.append("utr", utr.value);
//     formData.append("image", image.files[0]);

//     await fetch("http://localhost:8000/api/donation", {
//       method: "POST",
//       body: formData,
//     });

//     alert("Donation submitted successfully");
//     e.target.reset();
//   });
const donationForm = document.getElementById("donationForm");

if (donationForm) {
  donationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("mobile", document.getElementById("mobile").value);
    formData.append("utr", document.getElementById("utr").value);
    formData.append("pan", document.getElementById("pan").value); // ✅ PAN
    formData.append("image", document.getElementById("image").files[0]);

    await fetch("http://localhost:8000/api/donation", {
      method: "POST",
      body: formData,
    });

    alert("Donation submitted successfully");
    donationForm.reset();
  });
}

// OPEN / CLOSE PAGE
function openDonationPage() {
  document.getElementById("donationAdmin").style.display = "block";
  loadDonations();
}

function closeDonationPage() {
  document.getElementById("donationAdmin").style.display = "none";
}

// ADD DONATION (FROM NGO PAYMENT PAGE)

async function loadDonations() {
  const grid = document.getElementById("donationGrid");
  grid.innerHTML = "";

  const res = await fetch("http://localhost:8000/api/donation");
  const donations = await res.json();

  donations.forEach((d) => {
    const card = document.createElement("div");
    card.className = "donation-card";

    card.innerHTML = `
      <img src="${d.image}">
      <strong>${d.name}</strong>
      ${d.read ? "" : "<span class='new-badge'>NEW</span>"}<br>
      📞 ${d.mobile}<br>
     
      💳 ${d.utr}<br>
🪪 PAN: ${d.pan || "N/A"}<br>

      <small>${d.time}</small>

      <div class="card-actions">
        <button onclick="markDonationRead('${d.id}', event)">Read</button>
        <button class="delete-btn" onclick="deleteDonation('${
          d.id
        }', event)">Delete</button>
      </div>
    `;

    card.onclick = () => openDonationPopup(d);
    grid.appendChild(card);
  });
  updateStatsCounts();
  updateDonationCounter();
}
// updateStatsCounts();

async function markDonationRead(id, e) {
  e.stopPropagation();
  await fetch(`http://localhost:8000/api/donation/${id}/read`, {
    method: "PUT",
  });
  loadDonations();
}

async function deleteDonation(id, e) {
  e.stopPropagation();
  await fetch(`http://localhost:8000/api/donation/${id}`, {
    method: "DELETE",
  });
  loadDonations();
}

async function updateDonationCounter() {
  const res = await fetch("http://localhost:8000/api/donation/unread-count");
  const data = await res.json();

  const el = document.getElementById("donationCount");
  el.innerText = data.count;
  el.style.display = data.count > 0 ? "inline-block" : "none";
}

// POPUP — API BASED
async function openDonationPopup(d) {
  if (!d.read) {
    await fetch(`http://localhost:8000/api/donation/${d.id}/read`, {
      method: "PUT",
    });
  }

  document.getElementById("donationPopupDetails").innerHTML = `
    <h3>${d.name}</h3>
    <p><b>Mobile:</b> ${d.mobile}</p>
  
    <p><b>UTR:</b> ${d.utr}</p>
<p><b>PAN:</b> ${d.pan || "N/A"}</p>

    <img src="${d.image}" style="width:100%;margin-top:10px;border-radius:8px">
  `;

  document.getElementById("donationPopup").style.display = "flex";
  loadDonations();
}

function closeDonationPopup() {
  document.getElementById("donationPopup").style.display = "none";
}

/* =====================================
   STATS COUNT LOGIC (TOTAL CARDS)
===================================== */

async function updateStatsCounts() {
  try {
    // CONTACT COUNT
    const contactRes = await fetch("http://localhost:8000/api/contact");
    const contacts = await contactRes.json();

    const contactEl = document.getElementById("contactCount");
    if (contactEl) contactEl.innerText = contacts.length;

    // DONATION COUNT
    const donationRes = await fetch("http://localhost:8000/api/donation");
    const donations = await donationRes.json();

    const donationEl = document.getElementById("donationStatCount");
    if (donationEl) donationEl.innerText = donations.length;
  } catch (err) {
    console.error("Stats count error:", err);
  }
}
