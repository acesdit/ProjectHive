// Confetti Animation + Greeting Message
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function createConfetti() {
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 2 + 1,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });
  updateConfetti();
}

function updateConfetti() {
  confetti.forEach((p) => {
    p.y += p.d;
    if (p.y > canvas.height) {
      p.y = 0 - p.r;
      p.x = Math.random() * canvas.width;
    }
  });
}

function animateConfetti() {
  drawConfetti();
  requestAnimationFrame(animateConfetti);
}

createConfetti();
animateConfetti();

// Greeting Interaction
function showGreeting() {
  const name = document.getElementById("nameInput").value.trim();
  const text = document.getElementById("greetingText");
  
  if (name) {
    text.innerHTML = `🎂 Happy Birthday, <b>${name}</b>! 🎈<br>Wishing you joy and laughter!`;
  } else {
    text.innerHTML = `🎉 Happy Birthday to You! 🥳`;
  }
}