let currentType = "";

const adminPanel = document.getElementById("adminPanel");
const popupMsg = document.getElementById("popupMsg");

let popupTimer;

function showPopup(message, type = "error") {
  popupMsg.innerHTML =
    message +
    ' <span onclick="closePopup()" style="cursor:pointer;font-weight:bold;margin-left:10px;">✖</span>';

  // reset classes
  popupMsg.className = "popup-msg " + type;

  // IMPORTANT: add show class
  popupMsg.classList.add("show");

  // auto close after 2 seconds
  clearTimeout(popupTimer);
  popupTimer = setTimeout(closePopup, 2000);
}

function closePopup() {
  popupMsg.classList.remove("show");
}

// LOGIN
function login() {
  const email = emailInput().value;
  const pass = passwordInput().value;
  const remember = document.getElementById("rememberMe").checked;

  const savedUser = JSON.parse(localStorage.getItem("admin"));

  if (!email || !pass) {
    showPopup("Please enter ID & Password", "error");
    return;
  }

  if (!savedUser || savedUser.email !== email || savedUser.password !== pass) {
    showPopup("Wrong ID or Password", "error");
    return;
  }

  if (remember) localStorage.setItem("remember", "yes");

  authModal.style.display = "none";
  adminPanel.style.display = "flex";
  showPopup("Login Successful", "success");
}

// SIGNUP
// function showSignup() {
//   document.getElementById("authTitle").innerText = "Admin Signup";
//   document.querySelector(".auth-box button").innerText = "Signup";
//   document.querySelector(".auth-box button").onclick = signup;
// }

//  new SIGNUP code
function showSignup() {
  // hide login fields
  document.getElementById("authTitle").style.display = "none";
  document.getElementById("email").style.display = "none";
  document.getElementById("password").style.display = "none";
  document.querySelector(".toggle-eye").style.display = "none";
  document.querySelector(".remember").style.display = "none";
  document.querySelector(".auth-box button").style.display = "none";
  document.querySelector(".auth-links").style.display = "none";

  // show new signup UI
  document.getElementById("signupBox").style.display = "block";
}

function signup() {
  // const email = emailInput().value;
  // const pass = passwordInput().value;
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const pass = document.getElementById("signupPassword").value;

  if (!name || !email || !pass) {
    showPopup("Fill all fields", "error");
    return;
  }

  if (!email || !pass) {
    showPopup("Fill all fields", "error");
    return;
  }

  localStorage.setItem("admin", JSON.stringify({ email, password: pass }));
  showPopup("Signup Successful", "success");
  location.reload();
}

// FORGOT PASSWORD
// function showForgot() {
//   const email = prompt("Enter registered email");
//   const admin = JSON.parse(localStorage.getItem("admin"));

//   if (!admin || admin.email !== email) {
//     showPopup("Email not found", "error");
//     return;
//   }

//   const newPass = prompt("Enter new password");
//   admin.password = newPass;
//   localStorage.setItem("admin", JSON.stringify(admin));
//   showPopup("Password Updated", "success");
// }

// new forget password code
let forgotAdminEmail = "";

// STEP 1 OPEN
function showForgot() {
  // hide login fields
  document.getElementById("email").style.display = "none";
  document.getElementById("password").style.display = "none";
  document.querySelector(".toggle-eye").style.display = "none";
  document.querySelector(".remember").style.display = "none";
  document.querySelector(".auth-box button").style.display = "none";
  document.querySelector(".auth-links").style.display = "none";
  document.getElementById("authTitle").style.display = "none";

  document.getElementById("forgotStep1").style.display = "block";
}

// STEP 1 CONTINUE
function forgotContinue() {
  const email = document.getElementById("forgotEmail").value;
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!email) {
    showPopup("Enter email", "error");
    return;
  }

  if (!admin || admin.email !== email) {
    showPopup("Email not found", "error");
    return;
  }

  forgotAdminEmail = email;

  document.getElementById("forgotStep1").style.display = "none";
  document.getElementById("forgotStep2").style.display = "block";
}

// STEP 2 CHANGE PASSWORD
function changePassword() {
  const pass1 = document.getElementById("newPassword").value;
  const pass2 = document.getElementById("confirmPassword").value;

  if (!pass1 || !pass2) {
    showPopup("Fill all fields", "error");
    return;
  }

  if (pass1 !== pass2) {
    showPopup("Passwords do not match", "error");
    return;
  }

  const admin = JSON.parse(localStorage.getItem("admin"));
  admin.password = pass1;
  localStorage.setItem("admin", JSON.stringify(admin));

  showPopup("Password Updated Successfully", "success");

  setTimeout(() => location.reload(), 1500);
}
// new forget password code

// HELPERS
function emailInput() {
  return document.getElementById("email");
}
function passwordInput() {
  return document.getElementById("password");
}

function closeAuth() {
  authModal.style.display = "none";
}
// 2nd part
function saveCredentials() {
  localStorage.setItem(adminEmail.value, adminPassword.value);
  alert("Saved");
}

function logout() {
  location.reload();
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("show");
}

// pop up section
function openUpload(type) {
  document.getElementById("uploadPopup").style.display = "flex";
  document.getElementById("uploadTitle").innerText = "Add " + type;
  document.getElementById("uploadInput").click();
}

function closeUpload() {
  document.getElementById("uploadPopup").style.display = "none";
}

function addItem() {
  if (currentType === "image") imgCount.innerText++;
  if (currentType === "video") videoCount.innerText++;
  if (currentType === "news") newsCount.innerText++;
  if (currentType === "event") eventCount.innerText++;
  closePopup();
}

function closeAuth() {
  authModal.style.display = "none";
}

// dropdown code
function toggleDropdown() {
  document.getElementById("dropdown").style.display =
    document.getElementById("dropdown").style.display === "block"
      ? "none"
      : "block";
}

document.addEventListener("click", function (e) {
  if (!e.target.closest(".profile")) {
    document.getElementById("dropdown").style.display = "none";
  }
});

function logout() {
  document.getElementById("adminPanel").style.display = "none";
  document.getElementById("authModal").style.display = "flex";
}

/* sidebar pop up part */
function openSection(type) {
  document.getElementById("sectionPopup").style.display = "flex";
  document.getElementById("sectionTitle").innerText = "Manage " + type;
}

function closeSection() {
  document.getElementById("sectionPopup").style.display = "none";
}

function togglePassword() {
  const pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}

// extra code
