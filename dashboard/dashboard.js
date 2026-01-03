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

function openDemo() {
  document.getElementById("authModal").style.display = "none";
  adminPanel.style.display = "flex";
}

function logout() {
  location.reload();
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("show");
}

function openUpload(type) {
  currentType = type;
  document.getElementById("uploadPopup").style.display = "flex";
  document.getElementById("uploadTitle").innerText = "Add " + type;
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
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
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
   AUTH FORM VISIBILITY CONTROL
   BASED ON YOUR HTML STRUCTURE
================================ */
const loginInputs = document.querySelectorAll(
  "#email, #password, .auth-links, #authTitle"
);

const signupBox = document.getElementById("signupBox");
const forgotStep1 = document.getElementById("forgotStep1");
const forgotStep2 = document.getElementById("forgotStep2");

/* Hide login section */
function hideLogin() {
  loginInputs.forEach(el => el.style.display = "none");
}

/* Show login section */
function showLogin() {
  loginInputs.forEach(el => el.style.display = "block");
  signupBox.style.display = "none";
  forgotStep1.style.display = "none";
  forgotStep2.style.display = "none";
  showLoginDemoBtn(); 
}

/* Signup click */
function showSignup() {
  hideLogin();
    hideLoginDemoBtn();  
  signupBox.style.display = "block";
}

/* Forgot password click */
function showForgot() {
  hideLogin();
    hideLoginDemoBtn(); 
  forgotStep1.style.display = "block";
}

/* Forgot → Continue */
function forgotContinue() {
   hideLoginDemoBtn();
  forgotStep1.style.display = "none";
  forgotStep2.style.display = "block";
}

/* Change password (demo only) */
function changePassword() {
  showPopup("Demo only – password not changed", "warning");
  showLogin();
}

/* Default load */
showLogin();



// new js code
/* ================================
   LOGIN (DEMO) BUTTON VISIBILITY
================================ */

/* safely find login demo button */
function getLoginDemoBtn() {
  return document.querySelector(
    '.auth-box button[onclick="openDemo()"]'
  );
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

