document.addEventListener("DOMContentLoaded", () => {

  /* ================= BRAND COLORS ================= */
  const brandColors = {
    "fa-html5": "#e34f26",
    "fa-css3-alt": "#1572b6",
    "fa-js": "#f7df1e",
    "fa-python": "#3776ab",

    "fa-fire": "#ff6f00",       // Flask
    "fa-database": "#4db33d",   // SQLite
    "fa-server": "#00bcd4",     // SQL
    "fa-code": "#007acc",       // VS Code

    "fa-file-word": "#2b579a",  // MS Word
    "fa-briefcase": "#9e9e9e",  // Office
    "fa-users": "#4caf50",      // Teamwork
    "fa-handshake": "#ffc107"   // Collaboration
  };

  /* ================= APPLY ICON COLORS ================= */
  document.querySelectorAll(".skill-box i").forEach(icon => {
    Object.keys(brandColors).forEach(cls => {
      if (icon.classList.contains(cls)) {
        icon.style.color = brandColors[cls];
      }
    });
  });

  /* ================= SKILL PERCENTAGE ================= */
  document.querySelectorAll(".skill-box").forEach(box => {

    const percent = box.getAttribute("data-percent");
    if (!percent) return;

    const badge = document.createElement("div");
    badge.className = "skill-percent";
    badge.innerText = "0%";
    box.appendChild(badge);

    let animated = false;

    box.addEventListener("mouseenter", () => {
      if (animated) return;
      animated = true;

      let count = 0;
      const timer = setInterval(() => {
        count++;
        badge.innerText = count + "%";

        if (count >= percent) {
          clearInterval(timer);
        }
      }, 12);
    });

    box.addEventListener("mouseleave", () => {
      animated = false;
      badge.innerText = "0%";
    });

  });

});
