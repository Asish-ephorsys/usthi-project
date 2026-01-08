/* ================================
   NGO WEBSITE — EVENT DISPLAY
================================ */

async function loadNgoEvents() {
  const container = document.getElementById("ngoEventSection");

  // Safety check
  if (!container) return;

  const res = await fetch("http://localhost:8000/api/events");
  const events = await res.json();

  container.innerHTML = "";

  events.forEach((e) => {
    container.innerHTML += `
      <div class="event">
        <h2>${e.title}</h2>
        <p>${e.description}</p>

        <div class="gallery">
          ${e.images.map((img) => `<img src="${img}">`).join("")}
        </div>
      </div>
    `;
  });
}

/* AUTO LOAD EVENTS WHEN PAGE LOADS */
document.addEventListener("DOMContentLoaded", loadNgoEvents);
