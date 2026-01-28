(() => {
  if (sessionStorage.getItem("ak_auth") !== "1") {
    window.location.replace("index.html");
    return;
  }

  function qsAny(selectors, root=document){
    for (const s of selectors) { const el = root.querySelector(s); if (el) return el; }
    return null;
  }

  // Ensure custom.css is applied even if cached strangely
  // HERO
  const heroSection = qsAny(["#section-hero", ".section-hero", "section.section-hero"]);
  if (heroSection && !heroSection.querySelector(".hero-video")) {
    heroSection.style.position = heroSection.style.position || "relative";
    const desktop = document.createElement("video");
    desktop.className = "hero-video desktop";
    desktop.autoplay = true; desktop.muted = true; desktop.loop = true;
    desktop.playsInline = true; desktop.setAttribute("playsinline","");
    desktop.innerHTML = '<source src="media/hero/hero-desktop.mp4" type="video/mp4">';
    const mobile = document.createElement("video");
    mobile.className = "hero-video mobile";
    mobile.autoplay = true; mobile.muted = true; mobile.loop = true;
    mobile.playsInline = true; mobile.setAttribute("playsinline","");
    mobile.innerHTML = '<source src="media/hero/hero-mobile.mp4" type="video/mp4">';
    heroSection.prepend(mobile);
    heroSection.prepend(desktop);
  }

  // MAP
  const venueMap = qsAny(["#venue-map", ".venue-map", "[data-venue-map]"]);
  if (venueMap && !venueMap.querySelector("iframe")) {
    const iframe = document.createElement("iframe");
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";
    iframe.src = "https://www.google.com/maps?q=Aviyana%20Hua%20Hin&output=embed";
    venueMap.innerHTML = "";
    venueMap.appendChild(iframe);
  }

  function initSlideshow(container, sources){
    if (!container) return;
    container.classList.add("ak-slideshow");
    const imgsExisting = Array.from(container.querySelectorAll("img"));
    if (imgsExisting.length === 0) {
      sources.forEach((src, idx) => {
        const img = document.createElement("img");
        img.src = src; img.alt = "";
        if (idx === 0) img.classList.add("is-active");
        container.appendChild(img);
      });
    } else {
      imgsExisting.forEach((img, idx) => { if (idx === 0) img.classList.add("is-active"); });
    }

    const imgs = Array.from(container.querySelectorAll("img"));
    if (imgs.length <= 1) return;
    let i = 0;
    setInterval(() => {
      imgs[i].classList.remove("is-active");
      i = (i + 1) % imgs.length;
      imgs[i].classList.add("is-active");
    }, 4000);
  }

  const venueSlide = qsAny(["#venue-slideshow", ".venue-slideshow", "[data-venue-slideshow]"]);
  initSlideshow(venueSlide, Array.from({length:7}, (_,k)=>`media/venue/aviyana-slideshow-${k+1}.jpg`));

  const photosSlide = qsAny(["#section-slideshow", ".section-slideshow", "[data-photos-slideshow]", "#photos-slideshow", ".photos-slideshow"]);
  initSlideshow(photosSlide, Array.from({length:10}, (_,k)=>`media/photos/ka-slideshow-${k+1}.jpg`));

  // Food/drink video placeholder
  const fd = qsAny(["#section-video-placeholder", ".section-video-placeholder", "[data-fooddrink-video]"]);
  if (fd && !fd.querySelector("video")) {
    const v = document.createElement("video");
    v.autoplay = true; v.muted = true; v.loop = true;
    v.playsInline = true; v.setAttribute("playsinline","");
    v.style.width = "100%";
    v.style.height = "100%";
    v.style.objectFit = "cover";
    v.innerHTML = '<source src="media/fooddrink/fooddrink-portrait.mp4" type="video/mp4">';
    fd.innerHTML = "";
    fd.appendChild(v);
  }

  // Accordion
  const items = Array.from(document.querySelectorAll(".accordion-item"));
  if (items.length) {
    items.forEach((item) => {
      const kids = Array.from(item.children);
      const header = kids[0] || item;
      const content = kids[1] || null;
      if (!content) return;
      content.setAttribute("data-accordion-content","");

      header.style.cursor = "pointer";
      header.addEventListener("click", () => {
        items.forEach(i => { if (i !== item) i.classList.remove("is-open"); });
        item.classList.toggle("is-open");
      });
    });
  }
})();