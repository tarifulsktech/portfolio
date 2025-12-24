window.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("robot-container");
  const aiText = document.getElementById("aiText");

  if (!container) {
    console.error("robot-container not found");
    return;
  }

  /* =====================
     LIVE 3D ROBOT
  ===================== */

  const scene = new THREE.Scene();

  const width = 320;
  const height = 320;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  /* LIGHTS */
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  const light = new THREE.DirectionalLight(0x00b4ff, 1);
  light.position.set(2, 3, 5);
  scene.add(light);

//   /* ROBOT BODY (PURE 3D, NO IMAGE) */
//   const body = new THREE.Mesh(
//     new THREE.CylinderGeometry(0.6, 0.7, 1.6, 32),
//     new THREE.MeshStandardMaterial({ color: 0xffffff })
//   );

//   const head = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 32, 32),
//     new THREE.MeshStandardMaterial({ color: 0xeaeaea })
//   );

//   head.position.y = 1.2;

//   scene.add(body);
//   scene.add(head);




/* ===== CUTE HUMANOID ROBOT ===== */

// Materials
const robotMat = new THREE.MeshStandardMaterial({ color: 0x8aa4bd });
const eyeMat = new THREE.MeshStandardMaterial({ color: 0x111111 });

// Body
const body = new THREE.Mesh(
  new THREE.CylinderGeometry(0.45, 0.5, 1.4, 32),
  robotMat
);
scene.add(body);

// Head
const head = new THREE.Mesh(
  new THREE.SphereGeometry(0.45, 32, 32),
  robotMat
);
head.position.y = 1.1;
scene.add(head);

// Eyes
const leftEye = new THREE.Mesh(
  new THREE.SphereGeometry(0.06, 16, 16),
  eyeMat
);
leftEye.position.set(-0.15, 1.15, 0.42);

const rightEye = leftEye.clone();
rightEye.position.x = 0.15;

scene.add(leftEye);
scene.add(rightEye);

// Arms
const armGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.8, 16);

const leftArm = new THREE.Mesh(armGeo, robotMat);
leftArm.position.set(-0.55, 0.5, 0);
leftArm.rotation.z = Math.PI / 8;

const rightArm = leftArm.clone();
rightArm.position.x = 0.55;
rightArm.rotation.z = -Math.PI / 8;

scene.add(leftArm);
scene.add(rightArm);













  /* ANIMATION */
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.03;
    body.rotation.y += 0.01;
    head.position.y = 1.2 + Math.sin(t) * 0.05;
    renderer.render(scene, camera);
  }
  animate();

  /* =====================
     ROBOT SPEAK (VOICE)
  ===================== */

  const introMessage =
    "Hello, I am Tariful’s AI assistant. I represent my portfolio and guide visitors through my skills and projects.";

  function speak(text) {
    if (aiText) aiText.innerText = text;

    if ("speechSynthesis" in window) {
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = "en-US";
      msg.rate = 0.95;
      msg.pitch = 1.05;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(msg);
    }
  }

  window.speakRobot = function () {
    speak(introMessage);
  };

  /* AUTO GREETING */
  /* =====================
   AUTO GREETING (ONE TIME ONLY)
===================== */

if (!sessionStorage.getItem("robotSpoken")) {
  setTimeout(() => {
    speak(introMessage);
    sessionStorage.setItem("robotSpoken", "true");
  }, 1200);
}


  /* =====================
     ROBOT LISTEN (MIC)
  ===================== */

  let recognition = null;

  if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
  }

  window.listenRobot = function () {
    if (!recognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    if (aiText) aiText.innerText = "Listening...";
    recognition.start();

    recognition.onresult = (event) => {
      const userSpeech = event.results[0][0].transcript.toLowerCase();
      respond(userSpeech);
    };
  };

  function respond(text) {
    let reply = "Please explore my portfolio to know more.";

    if (text.includes("skills")) {
      reply = "My skills include HTML, CSS, JavaScript, Python, backend development, and problem solving.";
    } else if (text.includes("project")) {
      reply = "I have built multiple practical and real world projects showcased in my portfolio.";
    } else if (text.includes("contact")) {
      reply = "You can contact me via the contact section or LinkedIn mentioned on this website.";
    }

    speak(reply);
  }

});



































































