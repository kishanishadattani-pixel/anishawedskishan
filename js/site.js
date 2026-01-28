(() => {
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
    iframe.style.width="100%"; iframe.style.height="100%"; iframe.style.border="0";
    iframe.src="https://www.google.com/maps?q=Aviyana%20Hua%20Hin&output=embed";
    map.innerHTML="";
    map.appendChild(iframe);
  }

  function initSlideshow(container, sources){
    if(!container) return;
    container.innerHTML="";
    container.style.position="relative";
    container.style.overflow="hidden";
    sources.forEach((src, idx) => {
      const img=document.createElement("img");
      img.src=src; img.alt="";
      img.style.position="absolute"; img.style.inset="0";
      img.style.width="100%"; img.style.height="100%";
      img.style.objectFit="cover";
      img.style.opacity = idx===0 ? "1" : "0";
      img.style.transition="opacity 800ms ease";
      container.appendChild(img);
    });
    const imgs=[...container.querySelectorAll("img")];
    if(imgs.length<=1) return;
    let i=0;
    setInterval(()=>{ imgs[i].style.opacity="0"; i=(i+1)%imgs.length; imgs[i].style.opacity="1"; }, 4000);
  }

  initSlideshow(qAny([".venue-slideshow", "#venue-slideshow", "[data-venue-slideshow]"]),
               Array.from({length:7},(_,k)=>`media/venue/aviyana-slideshow-${k+1}.jpg`));

  initSlideshow(qAny([".section-slideshow", "#section-slideshow", ".photos-slideshow", "#photos-slideshow", "[data-photos-slideshow]"]),
               Array.from({length:10},(_,k)=>`media/photos/ka-slideshow-${k+1}.jpg`));

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
})();