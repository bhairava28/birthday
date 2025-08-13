/* Edit only this CONFIG to personalize */
const CONFIG = {
  herName: "Nithishma Reddy",
  yourName: "Dinnu",
  birthday: "2025-08-13",
  titleEmoji: "🎂💖",
  mainEmoji: "🌸",
  caption: "You’re the sweetest chapter in my story 📖💖",
  tagline: "A little surprise to make your smile brighter!",
  lines: [
    "Happy Birthday, {{HER_NAME}}! 🌸",
    "You’re as special as the first sip of coffee on a rainy morning ☔☕",
    "May your year be filled with laughter, love, and a little bit of magic ✨",
    "Always keep shining, because the world is better with your light 🌟",
    "— With warm wishes, {{YOUR_NAME}} 💖"
  ],
  colors: {
    accent: "#ff9ac4",
    accent2: "#ffb5a7",
    background: "#fff6fa"
  },
  photoUrl: "./pic.jpeg"
};

/* ========== No need to edit below ========== */

function applyTheme() {
  const r = document.documentElement;
  r.style.setProperty('--accent', CONFIG.colors.accent);
  r.style.setProperty('--accent-2', CONFIG.colors.accent2);
  r.style.setProperty('--bg', CONFIG.colors.background);
  document.querySelector('title').textContent = `Happy Birthday, ${CONFIG.herName} ${CONFIG.titleEmoji}`;
  document.querySelector('.photo .emoji').textContent = CONFIG.mainEmoji || '💖';
}

function replaceTags(text) {
  return text
    .replaceAll('{{HER_NAME}}', CONFIG.herName)
    .replaceAll('{{YOUR_NAME}}', CONFIG.yourName);
}

function typewriter(node, lines, speed = 27) {
  node.textContent = "";
  let i = 0, j = 0;
  function tick() {
    if (i >= lines.length) return;
    const line = replaceTags(lines[i]);
    if (j <= line.length) {
      node.textContent = node.textContent.replace(/\|$/, '') + line.charAt(j) + "|";
      j++;
      setTimeout(tick, line.charAt(j - 1) === ' ' ? speed / 2 : speed);
    } else {
      node.textContent = node.textContent.replace(/\|$/, '') + "\n";
      i++; j = 0;
      setTimeout(tick, 350);
    }
  }
  tick();
}

function confettiInit() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  let w, h, pieces = [], frame;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function makePiece() {
    const shapes = ['rect', 'circle', 'heart'];
    const shape = shapes[Math.random() * shapes.length | 0];
    return {
      x: Math.random() * w,
      y: -20,
      r: 6 + Math.random() * 8,
      s: shape,
      a: Math.random() * Math.PI * 2,
      v: 1 + Math.random() * 3,
      rot: (Math.random() - .5) * 0.2,
      color: `hsl(${Math.random() * 360 | 0} 90% 60%)`
    };
  }

  for (let i = 0; i < 140; i++) pieces.push(makePiece());

  function drawHeart(x, y, r, angle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.beginPath();
    const s = r / 6;
    ctx.moveTo(0, s * 6);
    ctx.bezierCurveTo(s * 6, s * 2, s * 5, -s * 2, 0, 0);
    ctx.bezierCurveTo(-s * 5, -s * 2, -s * 6, s * 2, 0, s * 6);
    ctx.fill();
    ctx.restore();
  }

  function update() {
    ctx.clearRect(0, 0, w, h);
    for (const p of pieces) {
      p.y += p.v;
      p.a += p.rot;
      if (p.y > h + 20) {
        p.x = Math.random() * w;
        p.y = -20;
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.a);
      ctx.fillStyle = p.color;
      if (p.s === 'circle') {
        ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.fill();
      } else if (p.s === 'heart') {
        drawHeart(0, 0, p.r * 2, p.a, p.color);
      } else {
        ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 2);
      }
      ctx.restore();
    }
    frame = requestAnimationFrame(update);
  }
  update();
  return () => cancelAnimationFrame(frame);
}

function updateCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  const target = new Date(CONFIG.birthday + "T00:00:00");
  const now = new Date();
  const diff = Math.abs(target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  el.textContent = `Celebrating ${CONFIG.herName} • ${CONFIG.birthday} • ${days} day${days !== 1 ? 's' : ''} from today`;
}

function main() {
  applyTheme();
  document.getElementById('headline').textContent = `Happy Birthday, ${CONFIG.herName}!`;
  document.getElementById('tagline').textContent = CONFIG.tagline;
  document.getElementById('caption').textContent = CONFIG.caption;
  document.getElementById('byline').textContent = `Made with 💖 by ${CONFIG.yourName}`;

  if (CONFIG.photoUrl) {
    document.getElementById('photo').innerHTML =
      `<img src="${CONFIG.photoUrl}" alt="Photo" style="width:100%;height:100%;object-fit:cover;">`;
  }

  const openBtn = document.getElementById('openBtn');
  const content = document.getElementById('content');
  openBtn.addEventListener('click', () => {
    openBtn.style.display = 'none';
    content.style.display = 'block';
    typewriter(document.getElementById('tw'), CONFIG.lines);
    confettiInit();
  });

  document.getElementById('replay').addEventListener('click', () => {
    typewriter(document.getElementById('tw'), CONFIG.lines);
  });

  updateCountdown();
}

document.addEventListener('DOMContentLoaded', main);
