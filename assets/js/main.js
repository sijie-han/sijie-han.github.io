/* Main interactions:
   - theme toggle (system + saved)
   - mobile nav
   - scroll progress
   - active nav link (IntersectionObserver)
   - copy email + toast
   - back-to-top
   - tiny typing loop in hero
*/

(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  // ---- Theme (light only) ----
  document.body.classList.add("theme-light");
  const meta = document.querySelector('meta[name="theme-color"]');
  if(meta){
    meta.setAttribute("content", "#f6fbf7");
  }

  // ---- Mobile nav ----
  const navToggle = $("#navToggle");
  const navLinks = $("#navLinks");
  if(navToggle && navLinks){
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    $$(".nav__link", navLinks).forEach(a => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- Scroll progress ----
  const progress = $("#top-progress");
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = h > 0 ? (y / h) * 100 : 0;
    if(progress) progress.style.width = pct.toFixed(2) + "%";

    // back-to-top visibility
    const toTop = $("#toTop");
    if(toTop){
      if(y > 700) toTop.classList.add("show");
      else toTop.classList.remove("show");
    }
  };
  document.addEventListener("scroll", onScroll, {passive:true});
  onScroll();

  // ---- Active section highlight ----
  const sections = $$("main section[id]");
  const nav = $$(".nav__link");
  const map = new Map(nav.map(a => [a.getAttribute("href"), a]));

  const io = ("IntersectionObserver" in window) ? new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = "#" + entry.target.id;
        nav.forEach(a => a.classList.remove("is-active"));
        const link = map.get(id);
        if(link) link.classList.add("is-active");
      }
    });
  }, { rootMargin: "-35% 0px -60% 0px", threshold: 0.01 }) : null;

  if(io){
    sections.forEach(s => io.observe(s));
  }

  // ---- Copy email ----
  const copyBtn = $("#copyEmail");
  const emailText = $("#emailText");
  if(copyBtn && emailText){
    copyBtn.addEventListener("click", async () => {
      try{
        await navigator.clipboard.writeText(emailText.textContent.trim());
        toast("Copied email ✅");
      } catch(e){
        toast("Copy failed (browser blocked) — select + copy manually.");
      }
    });
  }

  // ---- Back to top ----
  const toTop = $("#toTop");
  if(toTop){
    toTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));
  }

  // ---- Footer dates ----
  const year = $("#year");
  if(year) year.textContent = String(new Date().getFullYear());

  const last = $("#lastUpdated");
  if(last){
    const d = new Date(document.lastModified);
    last.textContent = d.toLocaleDateString(undefined, {year:"numeric", month:"short", day:"numeric"});
  }

  // ---- Static tagline (no typing effect) ----
  const typed = $("#typedTagline");
  if(typed){
    typed.textContent = "Embodied AI • Computer Vision • Robotics";
  }

  // ---- Toast ----
  const toastEl = $("#toast");
  let toastTimer = null;
  function toast(msg){
    if(!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1600);
  }
  window.toast = toast; // debug
})();
