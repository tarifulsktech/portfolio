/* ================= SELECTORS ================= */
const card = document.getElementById("card");
const hoverSound = document.getElementById("hoverSound");

/* ================= HOVER SOUND ================= */
if (hoverSound) {
  hoverSound.volume = 0.15;

  const soundTargets = document.querySelectorAll(
    ".back-home, .skills span, .cta-btn, .card-3d"
  );

  soundTargets.forEach(el => {
    el.addEventListener("mouseenter", () => {
      hoverSound.currentTime = 0;
      hoverSound.play().catch(() => {});
    });
  });
}

/* ================= 3D TILT (DESKTOP ONLY) ================= */
if (window.innerWidth > 768 && card) {
  document.addEventListener("mousemove", (e) => {
    const xAxis = (window.innerWidth / 2 - e.clientX) / 20;
    const yAxis = (window.innerHeight / 2 - e.clientY) / 20;

    card.style.transform = `
      rotateY(${xAxis}deg)
      rotateX(${yAxis}deg)
    `;
  });

  document.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
}

/* ================= SPOTLIGHT FOLLOW ================= */
if (card) {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--x", `${x}%`);
    card.style.setProperty("--y", `${y}%`);
  });
}

/* ================= KEYBOARD SHORTCUT ================= */
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "h") {
    window.location.href = "../index.html";
  }
});

/* ================= ANIMATION RESTART ON LOAD ================= */
window.addEventListener("load", () => {
  document.body.classList.remove("anim-ready");
  void document.body.offsetWidth;
  document.body.classList.add("anim-ready");
});
