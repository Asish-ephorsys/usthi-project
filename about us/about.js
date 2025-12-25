const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});





const showBtn = document.getElementById("showBtn");
const moreText = document.getElementById("moreText");

showBtn.addEventListener("click", () => {
    if (moreText.style.display === "block") {
        moreText.style.display = "none";
        showBtn.innerHTML = "Show More ❤️";
    } else {
        moreText.style.display = "block";
        showBtn.innerHTML = "Show Less ❤️";
    }
});


// animal section
const btn = document.getElementById("toggleBtn");
const moreText2 = document.getElementById("more-text2");

btn.addEventListener("click", () => {
  if (moreText2.style.display === "none") {
    moreText2.style.display = "inline";
    btn.innerHTML = "Show Less ❤️";
  } else {
    moreText2.style.display = "none";
    btn.innerHTML = "Show More ❤️";
  }
});
// enviroment section
const showBtn1 = document.getElementById("showBtn1");
const moreText3 = document.getElementById("moreText3");

showBtn1.addEventListener("click", () => {
    if (moreText3.style.display === "block") {
        moreText3.style.display = "none";
        showBtn1.innerHTML = "Show More ❤️";
    } else {
        moreText3.style.display = "block";
        showBtn1.innerHTML = "Show Less ❤️";
    }
});

