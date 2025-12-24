// ================= RAIN BACKGROUND =================
const canvas = document.getElementById("rainCanvas");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let drops = Array.from({length:250},()=>({
  x:Math.random()*canvas.width,
  y:Math.random()*canvas.height,
  l:Math.random()*15+10,
  s:Math.random()*4+4
}));

function rain(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle="rgba(255,255,255,.35)";
  ctx.lineWidth=1;
  drops.forEach(d=>{
    ctx.beginPath();
    ctx.moveTo(d.x,d.y);
    ctx.lineTo(d.x,d.y+d.l);
    ctx.stroke();
    d.y+=d.s;
    if(d.y>canvas.height)d.y=-20;
  });
  requestAnimationFrame(rain);
}
rain();


// ================= WHATSAPP =================
const contactIcon = document.getElementById("contactIcon");
const whatsappBtn = document.getElementById("whatsappBtn");
const nameInput = document.getElementById("username");

function openWhatsApp(){
  const name = nameInput.value.trim() || "Visitor";
  const msg = `Hello Tariful, I am ${name}. I visited your portfolio and would like to connect with you.`;
  window.open(
    "https://wa.me/919547460101?text="+encodeURIComponent(msg),
    "_blank"
  );
}
contactIcon.onclick = openWhatsApp;
whatsappBtn.onclick = openWhatsApp;


// ================= FLASK FORM SUBMIT =================
document.getElementById("contactForm").addEventListener("submit", async (e)=>{
  e.preventDefault();

  const name = document.getElementById("username").value;
  const email = e.target.querySelector("input[type='email']").value;
  const message = e.target.querySelector("textarea").value;

  // Budget not present in Contact UI → default value
  const payload = {
    name: name,
    email: email,
    budget: "Not specified",
    message: message
  };

  try{
    const res = await fetch("/send",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if(data.status === "success"){
      alert("✅ Message sent! Thanks for reaching out. I'll get back to you with more info ASAP. Have a great day!!");
      e.target.reset();
    }else{
      alert("❌ Error: " + data.msg);
    }

  }catch(err){
    alert("❌ Server not responding");
    console.error(err);
  }
});
