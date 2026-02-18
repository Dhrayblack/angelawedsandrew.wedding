/* =================================
   HERO SLIDESHOW – 10 SECONDS
================================= */
const heroImages = [
  "assets/images/hero/hero-1.webp",
  "assets/images/hero/hero-2.webp",
  "assets/images/hero/hero-3.webp",
  "assets/images/hero/hero-4.webp",
  "assets/images/hero/hero-5.webp"
];


let heroIndex = 0;
const heroSection = document.querySelector(".hero");

function updateHero() {
  if (!heroSection) return;
  heroSection.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
  heroIndex = (heroIndex + 1) % heroImages.length;
}

window.addEventListener("load", () => {
  updateHero();
  setInterval(updateHero, 10000);
});  // 10 seconds



/* =================================
   COUNTDOWN TIMER
================================= */

const weddingDate = new Date("July 11, 2026 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) return;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const d = document.getElementById("days");
  const h = document.getElementById("hours");
  const m = document.getElementById("minutes");
  const s = document.getElementById("seconds");

  if (d) d.innerText = days;
  if (h) h.innerText = hours;
  if (m) m.innerText = minutes;
  if (s) s.innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();



/* =================================
   MODAL SYSTEM (PHOTOBOOK + RSVP)
================================= */

function openPhotobook() {
  const modal = document.getElementById("gallery");
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closePhotobook() {
  const modal = document.getElementById("gallery");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function openRSVP() {
  const modal = document.getElementById("rsvpModal");
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeRSVP() {
  const modal = document.getElementById("rsvpModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}



/* =================================
   ESC KEY CLOSE
================================= */

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closePhotobook();
    closeRSVP();
  }
});



/* =================================
   FORM SUBMISSION (FORMSPREE)
================================= */

(function () {
  const form = document.getElementById("rsvpForm");
  if (!form) return;

  const statusEl = form.querySelector(".form-status");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    statusEl.textContent = "Sending…";

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        statusEl.textContent = "Thanks — we received your RSVP!";
        form.reset();

        setTimeout(() => {
          statusEl.textContent = "";
          closeRSVP();
        }, 1500);

      } else {
        statusEl.textContent = "Submission failed. Please try again.";
      }

    } catch (error) {
      statusEl.textContent = "Network error. Please try again.";
    }
  });
})();

/* =================================
   FLOATING HEARTS
================================= */

function createHeart() {
  const heart = document.createElement("div");
  heart.innerHTML = "🤍";

  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-30px";
  heart.style.fontSize = (14 + Math.random() * 18) + "px";
  heart.style.opacity = Math.random();
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "1";
  heart.style.transition = "transform 10s linear, opacity 10s linear";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.style.transform = "translateY(-110vh)";
    heart.style.opacity = "0";
  }, 50);

  setTimeout(() => {
    heart.remove();
  }, 10000);
}

setInterval(createHeart, 1200);

function openImage(src) {
  const viewer = document.getElementById("imageViewer");
  const img = document.getElementById("fullImage");
  img.src = src;
  viewer.style.display = "flex";
}

function closeImage() {
  const viewer = document.getElementById("imageViewer");
  viewer.style.display = "none";
}

/* =================
   AUTO LOAD PHOTOBOOK IMAGES
================= */

const container = document.getElementById("photoContainer");

if (container) {
  for (let i = 1; i <= 19; i++) {
    const img = document.createElement("img");
    img.src = `assets/images/photobook/photobook${i}.jpg`;
    img.loading = "lazy";
    img.onclick = function() {
      openImage(this.src);
    };
    container.appendChild(img);
  }
}
