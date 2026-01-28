(() => {
  // Require gate auth
  if (sessionStorage.getItem("ak_auth") !== "1") {
    window.location.replace("index.html");
    return;
  }

  function qsAny(selectors, root=document){
    for (const s of selectors) { const el = root.querySelector(s); if (el) return el; }
    return null;
  }

  // HERO videos (must be muted to autoplay)
  const heroSection = qsAny(["#section-hero", ".section-hero", "section.section-hero"]);
  if (heroSection && !heroSection.querySelector(".hero-video")) {
    heroSection.style.position = heroSection.style.position || "relative";

    const mk = (cls, src) => {
      const v = document.createElement("video");
      v.className = "hero-video " + cls;
      v.autoplay = true; v.muted = true; v.loop = true;
      v.playsInline = true; v.setAttribute("playsinline","");
      v.style.position="absolute"; v.style.inset="0";
      v.style.width="100%"; v.style.height="100%"; v.style.objectFit="cover";
      v.innerHTML = `<source src="${src}" type="video/mp4">`;
      return v;
    };

    const desktop = mk("desktop", "media/hero/hero-desktop.mp4");
    const mobile  = mk("mobile", "media/hero/hero-mobile.mp4");

    // simple responsive toggle via CSS injected
    const style = document.createElement("style");
    style.textContent = `
      .hero-video.mobile{display:none;}
      @media (max-width: 768px){.hero-video.desktop{display:none;} .hero-video.mobile{display:block;}}
    `;
    document.head.appendChild(style);

    heroSection.prepend(mobile);
    heroSection.prepend(desktop);
  }

  // Venue map placeholder
  const venueMap = qsAny(["#venue-map", ".venue-map", "[data-venue-map]"]);
  if (venueMap && !venueMap.querySelector("iframe")) {
    const iframe = document.createElement("iframe");
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.style.width="100%"; iframe.style.height="100%"; iframe.style.border="0";
    iframe.src = "https://www.google.com/maps?q=Aviyana%20Hua%20Hin&output=embed";
    venueMap.innerHTML="";
    venueMap.appendChild(iframe);
  }

  // Slideshow helper
  function initSlideshow(container, sources){
    if (!container) return;
    container.classList.add("ak-slideshow");
    if (!container.querySelector("img")) {
      sources.forEach((src, idx) => {
        const img=document.createElement("img");
        img.src=src; img.alt="";
        img.style.position="absolute"; img.style.inset="0";
        img.style.width="100%"; img.style.height="100%"; img.style.objectFit="cover";
        img.style.opacity = idx===0 ? "1" : "0";
        img.style.transition = "opacity 800ms ease";
        container.appendChild(img);
      });
      container.style.position="relative";
      container.style.overflow="hidden";
    }
    const imgs=[...container.querySelectorAll("img")];
    if (imgs.length<=1) return;
    let i=0;
    setInterval(()=>{
      imgs[i].style.opacity="0";
      i=(i+1)%imgs.length;
      imgs[i].style.opacity="1";
    }, 4000);
  }

  const venueSlide = qsAny(["#venue-slideshow", ".venue-slideshow", "[data-venue-slideshow]"]);
  initSlideshow(venueSlide, Array.from({length:7},(_,k)=>`media/venue/aviyana-slideshow-${k+1}.jpg`));

  const photosSlide = qsAny(["#section-slideshow", ".section-slideshow", "[data-photos-slideshow]", ".photos-slideshow", "#photos-slideshow"]);
  initSlideshow(photosSlide, Array.from({length:10},(_,k)=>`media/photos/ka-slideshow-${k+1}.jpg`));

  // Fooddrink video placeholder
  const fd = qsAny(["#section-video-placeholder", ".section-video-placeholder", "[data-fooddrink-video]"]);
  if (fd && !fd.querySelector("video")) {
    const v=document.createElement("video");
    v.autoplay=true; v.muted=true; v.loop=true;
    v.playsInline=true; v.setAttribute("playsinline","");
    v.style.width="100%"; v.style.height="100%"; v.style.objectFit="cover";
    v.innerHTML='<source src="media/fooddrink/fooddrink-portrait.mp4" type="video/mp4">';
    fd.innerHTML="";
    fd.appendChild(v);
  }

  // FAQ accordion: .accordion-item -> first child header, second child content
  const items=[...document.querySelectorAll(".accordion-item")];
  if (items.length){
    items.forEach(item=>{
      const kids=[...item.children];
      const header=kids[0]; const content=kids[1];
      if (!header || !content) return;
      content.style.display="none";
      header.style.cursor="pointer";
      header.addEventListener("click", ()=>{
        items.forEach(i=>{
          if (i!==item){
            const c=i.children[1];
            if (c) c.style.display="none";
            i.classList.remove("is-open");
          }
        });
        const open = item.classList.toggle("is-open");
        content.style.display = open ? "block" : "none";
      });
    });
  }
})();