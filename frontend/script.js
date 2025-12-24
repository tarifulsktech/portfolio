/* =====================
   HAMBURGER MENU
===================== */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger) {
  hamburger.onclick = () => {
    navLinks.classList.toggle("active");
  };
}

/* =====================
   NETWORK BACKGROUND
===================== */
const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const dots = [];
const DOT_COUNT = 80;

for (let i = 0; i < DOT_COUNT; i++) {
  dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4
  });
}

function animateNetwork() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dots.forEach(d => {
    d.x += d.vx;
    d.y += d.vy;

    if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
    if (d.y < 0 || d.y > canvas.height) d.vy *= -1;

    ctx.beginPath();
    ctx.arc(d.x, d.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#999";
    ctx.fill();
  });

  for (let i = 0; i < dots.length; i++) {
    for (let j = i; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.strokeStyle = "rgba(150,150,150,0.2)";
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animateNetwork);
}
animateNetwork();

/* =====================
   SILENT BOOT SCREEN
===================== */
document.body.classList.add("booting");

const bar = document.getElementById("bootProgress");
const percent = document.getElementById("bootPercent");
const boot = document.getElementById("bootScreen");

let progress = 0;

const bootInterval = setInterval(() => {
  progress++;
  bar.style.width = progress + "%";
  percent.textContent = progress + "%";

  if (progress >= 100) {
    clearInterval(bootInterval);

    boot.style.opacity = "0";
    boot.style.transition = "1s ease";

    setTimeout(() => {
      boot.style.display = "none";
      document.body.classList.remove("booting");
      document.body.classList.add("reveal");
    }, 1000);
  }
}, 25);

/* =====================
   ADVANCED HERO TEXT
   (SMOOTH, NO LAG)
===================== */
const roles = [
  "Freelancer",
  "Python Developer",
  "Web Developer",
  "Backend Learner",
  "Tech Enthusiast"
];

const typingEl = document.querySelector(".typing");
let roleIndex = 0;

function showRole() {
  typingEl.classList.remove("show");

  setTimeout(() => {
    typingEl.textContent = "I am a " + roles[roleIndex];
    typingEl.classList.add("show");
    roleIndex = (roleIndex + 1) % roles.length;
  }, 400);
}

showRole();
setInterval(showRole, 2600);
// ================= HACKER BOOT =================
window.addEventListener("load", () => {
  const bootScreen = document.getElementById("bootScreen");
  const logsBox = document.getElementById("terminalLogs");
  const progress = document.getElementById("bootProgress");
  const percentText = document.getElementById("bootPercent");
  const mainSite = document.getElementById("mainSite");

  const logs = [
    "Initializing kernel modules...",
    "Mounting file systems...",
    "Checking network interfaces...",
    "Bypassing firewall rules...",
    "Loading user environment...",
    "Access granted. Launching system..."
  ];

  let percent = 0;
  let logIndex = 0;

  const interval = setInterval(() => {
    percent += Math.floor(Math.random() * 7) + 5;
    if (percent >= 100) percent = 100;

    progress.style.width = percent + "%";
    percentText.textContent = percent + "%";

    if (logIndex < logs.length) {
      const p = document.createElement("p");
      p.textContent = "> " + logs[logIndex];
      logsBox.appendChild(p);
      logIndex++;
    }

    if (percent === 100) {
      clearInterval(interval);

      setTimeout(() => {
        bootScreen.style.opacity = "0";

        setTimeout(() => {
          bootScreen.style.display = "none";
          mainSite.classList.remove("hidden");
          mainSite.classList.add("show");
        }, 700);
      }, 500);
    }
  }, 140);
});
