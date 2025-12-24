/* ================= THEME SWITCH ================= */
function changeTheme(theme) {
  const themes = {
    light: { bg: "#f8fafc", text: "#1e293b" },
    dark: { bg: "#0b0f19", text: "#ffffff" },
    gradient: {
      bg: "linear-gradient(135deg,#0f172a,#1e293b)",
      text: "#ffffff"
    }
  };

  const t = themes[theme];
  if (!t) return;

  document.documentElement.style.background = t.bg;
  document.body.style.background = t.bg;
  document.body.style.color = t.text;

  localStorage.setItem("theme", theme);
}

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme") || "dark";
  changeTheme(saved);
});

/* ================= BUDGET CLICK ================= */
document.querySelectorAll(".budget-row label").forEach(label => {
  label.addEventListener("click", () => {
    document.querySelectorAll(".budget-row label")
      .forEach(l => l.classList.remove("active"));

    const input = label.querySelector("input");
    if (input) {
      input.checked = true;
      label.classList.add("active");
    }
  });
});

/* ================= PRICING → BUDGET SYNC ================= */
document.querySelectorAll(".price-item").forEach(card => {
  card.addEventListener("click", () => {
    const priceText = card.querySelector("b")?.innerText;
    if (!priceText) return;

    const price = priceText.replace("₹", "").trim();

    document.querySelectorAll(".budget-row input").forEach(input => {
      const label = input.closest("label");
      if (input.value === price) {
        input.checked = true;
        label.classList.add("active");
      } else {
        label.classList.remove("active");
      }
    });
  });
});

/* ================= FORM SUBMIT ================= */
const form = document.getElementById("hireForm");

if (form) {
  form.addEventListener("submit", async e => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));
    const btn = form.querySelector(".send-btn");

    btn.innerText = "Sending...";
    btn.disabled = true;

    try {
      const res = await fetch("http://127.0.0.1:5000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.status === "success") {
        document.getElementById("successModal").style.display = "flex";
        form.reset();
      } else {
        alert(result.msg || "Something went wrong");
      }
    } catch (err) {
      alert("Server not responding");
      console.error(err);
    } finally {
      btn.innerText = "Send Request";
      btn.disabled = false;
    }
  });
}

/* ================= MODAL CLOSE ================= */
function closeModal() {
  document.getElementById("successModal").style.display = "none";
}
