
(function () {

  const targetDate = new Date("November 20, 2026 00:00:00").getTime();

  const daysEl = document.querySelector(".countdown-box-days h1");
  const hoursEl = document.querySelector(".countdown-box-hours h1");
  const minutesEl = document.querySelector(".countdown-box-minutes h1");
  const secondsEl = document.querySelector(".countdown-box-seconds h1");

  function updateCountdown() {
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = "0";
      hoursEl.textContent = "0";
      minutesEl.textContent = "0";
      secondsEl.textContent = "0";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

})();
