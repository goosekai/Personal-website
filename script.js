/* Background Animation */
const canvas = document.getElementById("star-field");

const resize = () => {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
};

window.addEventListener("resize", resize);

resize();

const context = canvas.getContext("2d");
const stars = [];
const speed = 15;
const numStars = 42;
const v = () => Math.random() * speed - speed / 2;

/**
 * Adapted from: https://slicker.me/javascript/starfield.htm
 */
function animate() {
  const { width: w, height: h } = canvas;

  let color = Number;
  let r = Number;

  if (stars.length < numStars && Math.random() < 0.5) {
    stars.push({ x: 0, y: 0, vx: v(), vy: v() });
  }

  context.clearRect(0, 0, w, h);

  for (let i = 0; i < stars.length; i++) {
    let { x, y, vx, vy } = stars[i];

    stars[i].x = x = x + vx;
    stars[i].y = y = y + vy;

    if (x > w / 2 || x < 0 - w / 2) {
      stars[i].x = x = 0;
      stars[i].y = y = 0;
    }

    color = Math.floor(30 + (Math.abs(x) + Math.abs(y)) / 2);
    r = Math.abs(y / 100 + i / 200);

    context.fillStyle = `rgb(${color}, ${color}, ${color})`;
    context.beginPath();
    context.arc(w / 2 + x, h / 2 + y, r, 0, 2 * Math.PI);
    context.fill();
  }

  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);