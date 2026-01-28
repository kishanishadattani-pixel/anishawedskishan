(() => {
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch {}

  function qAny(selList){ for (const s of selList){ const el=document.querySelector(s); if(el) return el; } return null; }

  // HERO background videos (muted autoplay)
  const hero = qAny(["#section-hero", ".section-hero", "section.section-hero"]);
  if (hero && !hero.querySelector(".hero-video")) {
    hero.style.position = hero.style.position || "relative";
    const style = document.createElement("style");
    style.textContent = `
      .hero-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
      .hero-video.mobile{display:none;}
      @media (max-width:768px){.hero-video.desktop{display:none;} .hero-video.mobile{display:block;}}
    `;
    document.head.appendChild(style);
    const mk = (cls, src) => {
      const v = document.createElement("video");
      v.className = "hero-video " + cls;
      v.autoplay = true; v.muted = true; v.loop = true;
      v.playsInline = true; v.setAttribute("playsinline","");
      v.innerHTML = `<source src="${src}" type="video/mp4">`;
      return v;
    };
    hero.prepend(mk("mobile","media/hero/hero-mobile.mp4"));
    hero.prepend(mk("desktop","media/hero/hero-desktop.mp4"));
  }

  // Map
  const map = qAny([".venue-map", "#venue-map", "[data-venue-map]"]);
  if (map && !map.querySelector("iframe")) {
    const iframe=document.createElement("iframe");
    iframe.loading="lazy";
    iframe.referrerPolicy="no-referrer-when-downgrade";
    iframe.style.width="100%";
    iframe.style.height="100%";
    iframe.style.border="0";
    iframe.src="https://www.google.com/maps?q=Aviyana%20Hua%20Hin&output=embed";
    map.innerHTML="";
    map.appendChild(iframe);
  }

  }

  function initSlideshow(container, sources){
    if(!container) return;
    container.innerHTML="";
    container.style.position="relative";
    container.style.overflow="hidden";

    sources.forEach((srcObj, idx) => {
      const img=document.createElement("img");
      img.alt="";
      img.style.position="absolute"; img.style.inset="0";
      img.style.width="100%"; img.style.height="100%";
      img.style.objectFit="cover";
      img.style.opacity = idx===0 ? "1" : "0";
      img.style.transition="opacity 800ms ease";
      container.appendChild(img);

      const candidates = Array.isArray(srcObj) ? srcObj : [srcObj];
      // pick first that loads
      let chosen = false;
      candidates.forEach((cand) => {
        const test = new Image();
        test.onload = () => { if (!chosen){ chosen = true; img.src = cand; } };
        test.onerror = () => {};
        test.src = cand;
      });
      // fallback to first
      img.src = candidates[0];
    });

    const imgs=[...container.querySelectorAll("img")];
    if(imgs.length<=1) return;
    let i=0;
    setInterval(()=>{ imgs[i].style.opacity="0"; i=(i+1)%imgs.length; imgs[i].style.opacity="1"; }, 4000);
  }

  initSlideshow(qAny([".venue-slideshow", "#venue-slideshow", "[data-venue-slideshow]"]), [['media/venue/aviyana-slideshow-1.jpg', 'media/venue/aviyana-slideshow-1.jpeg', 'media/venue/aviyana-slideshow-1.png', 'media/venue/aviyana-slideshow-1.webp'], ['media/venue/aviyana-slideshow-2.jpg', 'media/venue/aviyana-slideshow-2.jpeg', 'media/venue/aviyana-slideshow-2.png', 'media/venue/aviyana-slideshow-2.webp'], ['media/venue/aviyana-slideshow-3.jpg', 'media/venue/aviyana-slideshow-3.jpeg', 'media/venue/aviyana-slideshow-3.png', 'media/venue/aviyana-slideshow-3.webp'], ['media/venue/aviyana-slideshow-4.jpg', 'media/venue/aviyana-slideshow-4.jpeg', 'media/venue/aviyana-slideshow-4.png', 'media/venue/aviyana-slideshow-4.webp'], ['media/venue/aviyana-slideshow-5.jpg', 'media/venue/aviyana-slideshow-5.jpeg', 'media/venue/aviyana-slideshow-5.png', 'media/venue/aviyana-slideshow-5.webp'], ['media/venue/aviyana-slideshow-6.jpg', 'media/venue/aviyana-slideshow-6.jpeg', 'media/venue/aviyana-slideshow-6.png', 'media/venue/aviyana-slideshow-6.webp'], ['media/venue/aviyana-slideshow-7.jpg', 'media/venue/aviyana-slideshow-7.jpeg', 'media/venue/aviyana-slideshow-7.png', 'media/venue/aviyana-slideshow-7.webp']]);

  initSlideshow(qAny([".section-slideshow", "#section-slideshow", ".photos-slideshow", "#photos-slideshow", "[data-photos-slideshow]"]), [['media/photos/ka-slideshow-1.jpg', 'media/photos/ka-slideshow-1.jpeg', 'media/photos/ka-slideshow-1.png', 'media/photos/ka-slideshow-1.webp'], ['media/photos/ka-slideshow-2.jpg', 'media/photos/ka-slideshow-2.jpeg', 'media/photos/ka-slideshow-2.png', 'media/photos/ka-slideshow-2.webp'], ['media/photos/ka-slideshow-3.jpg', 'media/photos/ka-slideshow-3.jpeg', 'media/photos/ka-slideshow-3.png', 'media/photos/ka-slideshow-3.webp'], ['media/photos/ka-slideshow-4.jpg', 'media/photos/ka-slideshow-4.jpeg', 'media/photos/ka-slideshow-4.png', 'media/photos/ka-slideshow-4.webp'], ['media/photos/ka-slideshow-5.jpg', 'media/photos/ka-slideshow-5.jpeg', 'media/photos/ka-slideshow-5.png', 'media/photos/ka-slideshow-5.webp'], ['media/photos/ka-slideshow-6.jpg', 'media/photos/ka-slideshow-6.jpeg', 'media/photos/ka-slideshow-6.png', 'media/photos/ka-slideshow-6.webp'], ['media/photos/ka-slideshow-7.jpg', 'media/photos/ka-slideshow-7.jpeg', 'media/photos/ka-slideshow-7.png', 'media/photos/ka-slideshow-7.webp'], ['media/photos/ka-slideshow-8.jpg', 'media/photos/ka-slideshow-8.jpeg', 'media/photos/ka-slideshow-8.png', 'media/photos/ka-slideshow-8.webp'], ['media/photos/ka-slideshow-9.jpg', 'media/photos/ka-slideshow-9.jpeg', 'media/photos/ka-slideshow-9.png', 'media/photos/ka-slideshow-9.webp'], ['media/photos/ka-slideshow-10.jpg', 'media/photos/ka-slideshow-10.jpeg', 'media/photos/ka-slideshow-10.png', 'media/photos/ka-slideshow-10.webp']]);

  // Fooddrink video
  const fd = qAny([".portrait-video-placeholder", "#portrait-video-placeholder", ".fooddrink-media", "[data-fooddrink-video]"]);
  if (fd && !fd.querySelector("video")) {
    fd.innerHTML="";
    const v=document.createElement("video");
    v.autoplay=true; v.muted=true; v.loop=true;
    v.playsInline=true; v.setAttribute("playsinline","");
    v.style.width="100%"; v.style.height="100%"; v.style.objectFit="cover";
    v.innerHTML='<source src="media/fooddrink/fooddrink-portrait.mp4" type="video/mp4">';
    fd.appendChild(v);
  }

  // Accordion
  const items=[...document.querySelectorAll(".accordion-item")];
  if(items.length){
    items.forEach(item=>{
      const kids=[...item.children];
      const header=kids[0]; const content=kids[1];
      if(!header || !content) return;
      content.style.display="none";
      header.style.cursor="pointer";
      header.addEventListener("click", ()=>{
        items.forEach(i=>{ if(i!==item){ const c=i.children[1]; if(c) c.style.display="none"; i.classList.remove("is-open"); }});
        const open=item.classList.toggle("is-open");
        content.style.display=open?"block":"none";
      });
    });
  }
  // Preload key assets immediately (so they don't wait for scroll)
  function preloadAssets(urls) {
    urls.forEach((u) => {
      if (!u) return;
      if (u.match(/\.(png|jpg|jpeg|JPG|JPEG|webp)$/)) {
        const img = new Image();
        img.decoding = "async";
        img.loading = "eager";
        img.src = u;
        return;
      }
      if (u.match(/\.(mp4|webm)$/)) {
        const v = document.createElement("video");
        v.preload = "auto";
        v.muted = true;
        v.playsInline = true;
        v.src = u;
        try { v.load(); } catch {}
      }
    });
  }

  const PRELOAD_URLS = [
    "media/gate/envelope-closed.png",
    "media/gate/envelope-opening.mp4",
    "media/audio/background-music.mp3",
    "media/hero/hero-desktop.mp4",
    "media/hero/hero-mobile.mp4",
    "media/fooddrink/fooddrink-portrait.mp4",
    "media/venue/aviyana-slideshow-1.jpg",
    "media/venue/aviyana-slideshow-2.jpg",
    "media/venue/aviyana-slideshow-3.jpg",
    "media/venue/aviyana-slideshow-4.jpg",
    "media/venue/aviyana-slideshow-5.jpg",
    "media/venue/aviyana-slideshow-6.jpg",
    "media/venue/aviyana-slideshow-7.jpg",
    "media/photos/ka-slideshow-1.JPG",
    "media/photos/ka-slideshow-2.JPG",
    "media/photos/ka-slideshow-3.JPG",
    "media/photos/ka-slideshow-4.JPG",
    "media/photos/ka-slideshow-5.JPG",
    "media/photos/ka-slideshow-6.JPG",
    "media/photos/ka-slideshow-7.JPG",
    "media/photos/ka-slideshow-8.JPG",
    "media/photos/ka-slideshow-9.JPG",
    "media/photos/ka-slideshow-10.JPG"
  ];
  preloadAssets(PRELOAD_URLS);

})();