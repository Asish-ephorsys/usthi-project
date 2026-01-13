async function loadAdminGallery() {
  try {
    const response = await fetch("http://localhost:8000/gallery");
    const images = await response.json();

    const galleryGrid = document.getElementById("galleryGrid");
    if (!galleryGrid) return;

    // galleryGrid.innerHTML = "";

    images.forEach((item) => {
      const div = document.createElement("div");
      div.className = `gallery-item ${item.big ? "big" : ""}`;
      // div.innerHTML = `<img src="${item.image}" alt="Gallery Image">`;
      div.innerHTML = `<img src="http://localhost:8000/${item.image}" alt="Gallery Image">`;

      // const imgSrc = item.image.startsWith("http")
      //   ? item.image
      //   : `http://localhost:8000/${item.image}`;

      // div.innerHTML = `<img src="${imgSrc}" alt="Gallery Image">`;

      galleryGrid.prepend(div); // admin images on top
    });
  } catch (error) {
    console.error("Gallery API error:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadAdminGallery);