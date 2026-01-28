(() => {
  const target = new Date("2026-11-20T00:00:00+00:00");
  const boxes = {
    days: document.querySelector(".countdown-box-days"),
    hours: document.querySelector(".countdown-box-hours"),
    minutes: document.querySelector(".countdown-box-minutes"),
    seconds: document.querySelector(".countdown-box-seconds"),
  };
  function getValueEl(box) {
    if (!box) return null;
    return box.querySelector("h1, h2, h3, h4, .heading, .text-block");
  }
  const els = {
    days: getValueEl(boxes.days),
    hours: getValueEl(boxes.hours),
    minutes: getValueEl(boxes.minutes),
    seconds: getValueEl(boxes.seconds),
  };
  if (!els.days || !els.hours || !els.minutes || !els.seconds) return;
  const pad = n => String(n).padStart(2, "0");
  function tick() {
    const now = new Date();
    let diff = target - now;
    if (diff < 0) diff = 0;
    const t = Math.floor(diff / 1000);
    const d = Math.floor(t / 86400);
    const h = Math.floor((t % 86400) / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;
    els.days.textContent = d;
    els.hours.textContent = pad(h);
    els.minutes.textContent = pad(m);
    els.seconds.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
})();