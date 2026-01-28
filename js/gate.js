(() => {
  const PASSWORD = "ak2026";

  const form = document.getElementById("gateForm");
  const input = document.getElementById("passwordInput");
  const errorEl = document.getElementById("gateError");
  const btn = document.getElementById("enterBtn");

  const transition = document.getElementById("transition");
  const envelopeVideo = document.getElementById("envelopeVideo");
  const bgMusic = document.getElementById("bgMusic");

  if (sessionStorage.getItem("ak_auth") === "1") {
    window.location.replace("main.html");
    return;
  }

  function showError(msg){ errorEl.textContent = msg; }

  async function startMusic(){
    try {
      bgMusic.loop = true;
      bgMusic.volume = 0.9;
      await bgMusic.play();
    } catch {}
  }

  function finish(){
    sessionStorage.setItem("ak_auth","1");
    window.location.replace("main.html");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showError("");

    const value = (input.value || "").trim();
    if (value !== PASSWORD) {
      showError("Incorrect password. Please try again.");
      input.focus();
      input.select?.();
      return;
    }

    btn.disabled = true;

    await startMusic();

    transition.hidden = false;
    envelopeVideo.currentTime = 0;
    envelopeVideo.play().catch(()=>{});

    envelopeVideo.onended = finish;
    setTimeout(finish, 8000);
  });
})();