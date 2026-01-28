
(() => {
  const PASSWORD = "ak2026";

  const overlay = document.getElementById("gateOverlay");
  const pwd = document.getElementById("pwd");
  const btn = document.getElementById("btn");
  const msg = document.getElementById("msg");
  const openVideo = document.getElementById("openVideo");
  const music = document.getElementById("music");

  if (!overlay || !pwd || !btn || !msg || !openVideo || !music) return;

  // Always require password on every load
  document.documentElement.classList.add("gate-locked");
  document.body.classList.add("gate-locked");

  function unlockScroll(){
    document.documentElement.classList.remove("gate-locked");
    document.body.classList.remove("gate-locked");
  }

  function error(text){
    msg.textContent = text || "";
  }

  async function startMusic(){
    try {
      music.currentTime = 0;
      music.volume = 0.9;
      await music.play();
    } catch (e) {
      // Safari may block if it doesn't count as user interaction; button click should.
    }
  }

  function finish(){
    unlockScroll();
    overlay.classList.add("is-exiting");
    setTimeout(() => { overlay.style.display = "none"; }, 650);
    try { window.scrollTo(0,0); } catch {}
    setTimeout(() => { try { window.scrollTo(0,0); } catch {} }, 50)
  }

  async function attempt(){
    error("");
    const val = (pwd.value || "").trim();
    if (val !== PASSWORD){
      error("Incorrect password. Please try again.");
      pwd.focus();
      return;
    }

    btn.disabled = true;
    try { pwd.blur(); } catch {}
    await startMusic();

    overlay.classList.add("is-playing");
    try { openVideo.currentTime = 0; } catch {}
    openVideo.muted = true;
    const p = openVideo.play();
    if (p && p.catch) p.catch(() => {});
    openVideo.onended = finish;
    setTimeout(finish, 8500);
  }

  btn.addEventListener("click", attempt);
  pwd.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); attempt(); }
  });

  // Reduce Safari password saving prompts
  try {
    pwd.setAttribute("autocomplete","new-password");
    pwd.setAttribute("autocapitalize","off");
    pwd.setAttribute("autocorrect","off");
    pwd.setAttribute("spellcheck","false");
    pwd.setAttribute("name","ak_pw_" + Math.random().toString(36).slice(2));
  } catch {}
})();
