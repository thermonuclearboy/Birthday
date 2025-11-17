const heart = document.querySelector(".heart");
const cta = document.querySelector(".cta");
const lyrics = document.querySelector(".lyrics");
const flourishDesktop = document.querySelector(".footer-desktop");
const flourishMobile = document.querySelector(".footer-mobile");
const timerSection = document.querySelector(".love-timer");
const audio = document.getElementById("melody");
let activated = false;
const startDate = new Date("1996-11-18T00:00:00");

function updateTimer() {
  const now = new Date();
  let diff = now - startDate;
  if (diff < 0) diff = 0;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("timer-days").textContent = days.toLocaleString();
  document.getElementById("timer-hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("timer-minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("timer-seconds").textContent = String(seconds).padStart(2, "0");
}

updateTimer();
setInterval(updateTimer, 1000);

function startExperience() {
  if (activated) return;
  activated = true;
  document.body.classList.add("darkened");
  heart.classList.add("is-hidden");
  cta.classList.add("is-hidden");
  lyrics.classList.add("show");
  const totalDuration = Array.from(lyrics.children).reduce((maxDelay, line) => {
    const delay = parseFloat(line.style.getPropertyValue("--delay") || "0");
    return Math.max(maxDelay, delay);
  }, 0);
  const flourishDelay = (totalDuration + 2.5) * 1000;
  setTimeout(() => {
    flourishDesktop?.classList.add("show");
    flourishMobile?.classList.add("show");
  }, flourishDelay);
  setTimeout(() => {
    timerSection?.classList.add("show");
    lyrics.classList.add("pushed-up");
  }, flourishDelay + 900);

  const tryPlay = audio?.play?.();
  if (tryPlay && typeof tryPlay.then === "function") {
    tryPlay.catch(() => {
      // ignored - autoplay might be blocked until user interacts again
    });
  }
}

heart.addEventListener("click", startExperience);
cta.addEventListener("click", startExperience);

