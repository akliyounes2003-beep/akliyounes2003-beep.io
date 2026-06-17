/* =============================================
   PHONESTORE — script.js
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ── Données téléphones pour le carrousel ── */
  const PHONES = [
    { name: "Galaxy S25 Ultra",   brand: "Samsung",  img: "phones/samsung s25 ultra.avif",       href: "reservation.html?modele=Samsung%20Galaxy%20S25%20Ultra" },
    { name: "Galaxy S25+",        brand: "Samsung",  img: "phones/samsung s25+.avif",             href: "reservation.html?modele=Samsung%20Galaxy%20S25%2B" },
    { name: "Galaxy S25",         brand: "Samsung",  img: "phones/samsung s25.avif",              href: "reservation.html?modele=Samsung%20Galaxy%20S25" },
    { name: "Galaxy Z Fold 6",    brand: "Samsung",  img: "phones/samsung-z-fold6.avif",          href: "reservation.html?modele=Samsung%20Galaxy%20Z%20Fold6" },
    { name: "Galaxy Z Flip 6",    brand: "Samsung",  img: "phones/samsung-zflip6.avif",           href: "reservation.html?modele=Samsung%20Galaxy%20Z%20Flip6" },
    { name: "Galaxy S24",         brand: "Samsung",  img: "phones/samsung s24.avif",              href: "reservation.html?modele=Samsung%20Galaxy%20S24" },
    { name: "Galaxy S24 FE",      brand: "Samsung",  img: "phones/samsung s24fe.webp",            href: "reservation.html?modele=Samsung%20Galaxy%20S24%20FE" },
    { name: "Galaxy A56 5G",      brand: "Samsung",  img: "phones/samsung a56-5g.avif",           href: "reservation.html?modele=Samsung%20Galaxy%20A56%205G" },
    { name: "Galaxy A36",         brand: "Samsung",  img: "phones/samsung a36.webp",              href: "reservation.html?modele=Samsung%20Galaxy%20A36" },
    { name: "iPhone 16 Pro",      brand: "Apple",    img: "phones/iphone16pro.jpeg",              href: "reservation.html?modele=iPhone%2016%20Pro" },
    { name: "iPhone 16",          brand: "Apple",    img: "phones/iphone16.jpeg",                 href: "reservation.html?modele=iPhone%2016" },
    { name: "iPhone 16e",         brand: "Apple",    img: "phones/iphone-16e.jpeg",               href: "reservation.html?modele=iPhone%2016e" },
    { name: "iPhone 15",          brand: "Apple",    img: "phones/iphone15.jpeg",                 href: "reservation.html?modele=iPhone%2015" },
    { name: "iPhone 14",          brand: "Apple",    img: "phones/iphone_14.jpeg",                href: "reservation.html?modele=iPhone%2014" },
    { name: "Redmi Note 14 Pro",  brand: "Xiaomi",   img: "phones/redmi note14 pro 5g.webp",      href: "reservation.html?modele=Redmi%20Note%2014%20Pro%205G" },
    { name: "Redmi Note 14",      brand: "Xiaomi",   img: "phones/redmi note14.webp",             href: "reservation.html?modele=Redmi%20Note%2014" },
    { name: "Redmi 14C",          brand: "Xiaomi",   img: "phones/redmi 14c.webp",                href: "reservation.html?modele=Redmi%2014C" },
    { name: "Redmi 13C",          brand: "Xiaomi",   img: "phones/redmi 13c.webp",                href: "reservation.html?modele=Redmi%2013C" },
    { name: "Redmi A3",           brand: "Xiaomi",   img: "phones/redmi a3.webp",                 href: "reservation.html?modele=Redmi%20A3" },
    { name: "Redmi A5",           brand: "Xiaomi",   img: "phones/redmi a5.webp",                 href: "reservation.html?modele=Redmi%20A5" },
    { name: "OPPO Find X8 Pro",   brand: "OPPO",     img: "phones/OPPO Find X8 Pro.png",          href: "reservation.html?modele=OPPO%20Find%20X8%20Pro" },
    { name: "OPPO Reno 13F",      brand: "OPPO",     img: "phones/oppo Reno13F.png",              href: "reservation.html?modele=OPPO%20Reno%2013F" },
    { name: "OPPO Find X3 Pro",   brand: "OPPO",     img: "phones/OPPO Find X3 Pro.png",          href: "reservation.html?modele=OPPO%20Find%20X3%20Pro" },
    { name: "OPPO Find X3 Neo",   brand: "OPPO",     img: "phones/OPPO Find X3 Neo.png",          href: "reservation.html?modele=OPPO%20Find%20X3%20Neo" },
    { name: "OPPO Find X3 Lite",  brand: "OPPO",     img: "phones/OPPO Find X3 Lite.png",         href: "reservation.html?modele=OPPO%20Find%20X3%20Lite" },
    { name: "OPPO A40",           brand: "OPPO",     img: "phones/OPPO A40.png",                  href: "reservation.html?modele=OPPO%20A40" },
  ];

  /* ── Marquee carrousel ── */
  const track = document.getElementById("marqueeTrack");
  if (track) {
    // double the items for seamless loop
    const items = [...PHONES, ...PHONES];
    items.forEach(phone => {
      const card = document.createElement("a");
      card.href = phone.href;
      card.className = "marquee-card";
      card.innerHTML = `
        <img src="${phone.img}" alt="${phone.name}" loading="lazy">
        <div class="marquee-card-info">
          <div class="marquee-card-name">${phone.name}</div>
          <div class="marquee-card-brand">${phone.brand}</div>
        </div>
      `;
      track.appendChild(card);
    });
  }

  /* ── Navbar scroll effect ── */
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Hamburger menu ── */
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.getElementById("navLinks");
  if (hamburger && navLinks) {
    const toggleMenu = () => {
      const open = navLinks.classList.toggle("open");
      hamburger.classList.toggle("open", open);
      hamburger.setAttribute("aria-expanded", open);
    };
    hamburger.addEventListener("click", toggleMenu);
    hamburger.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") toggleMenu(); });
    // close on nav link click
    navLinks.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        hamburger.classList.remove("open");
      });
    });
  }

  /* ── Auth: préremplir modèle depuis URL ── */
  const urlParams    = new URLSearchParams(window.location.search);
  const modeleParam  = urlParams.get("modele");
  const modeleSelect = document.getElementById("modele");
  if (modeleParam && modeleSelect) {
    // Try to match <option> value
    const opt = Array.from(modeleSelect.options).find(o => o.value === modeleParam);
    if (opt) {
      modeleSelect.value = opt.value;
    } else {
      // fallback: set text in a plain input if present
      const modeleInput = document.getElementById("modele");
      if (modeleInput && modeleInput.tagName === "INPUT") modeleInput.value = modeleParam;
    }
  }

  /* ── Auth: connexion ── */
  const VALID_EMAIL    = "demo@phonestore.fr";
  const VALID_PASSWORD = "demo1234";
  // also keep original credentials for backward compatibility
  const ALT_EMAIL      = "younesakli@gmail.com";
  const ALT_PASSWORD   = "1234";

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const email    = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      if ((email === VALID_EMAIL && password === VALID_PASSWORD) ||
          (email === ALT_EMAIL   && password === ALT_PASSWORD)) {
        localStorage.setItem("utilisateurConnecte", email);
        showToast("✅", "Connexion réussie ! Bienvenue.", "success");
        setTimeout(() => window.location.href = "index.html", 1200);
      } else {
        showToast("❌", "E-mail ou mot de passe incorrect.", "error");
        loginForm.querySelector("input[type=password]").value = "";
      }
    });
  }

  /* ── Auth: afficher utilisateur connecté ── */
  const utilisateur = localStorage.getItem("utilisateurConnecte");
  const navUser     = document.getElementById("navUser");
  const navCta      = document.querySelector(".nav-cta");
  const userBadge   = document.getElementById("userBadge");
  const logoutBtn   = document.getElementById("logoutBtn");

  if (utilisateur) {
    if (navUser)   { navUser.style.display = "flex"; }
    if (navCta)    { navCta.style.display  = "none"; }
    if (userBadge) { userBadge.textContent = utilisateur.split("@")[0]; }
    if (logoutBtn) {
      logoutBtn.addEventListener("click", e => {
        e.preventDefault();
        localStorage.removeItem("utilisateurConnecte");
        showToast("👋", "Vous êtes déconnecté.", "success");
        setTimeout(() => window.location.reload(), 900);
      });
    }
  }

  /* ── Formulaire réservation ── */
  const reservForm = document.getElementById("reservation-form");
  if (reservForm) {
    reservForm.addEventListener("submit", e => {
      e.preventDefault();
      const nom    = document.getElementById("nom").value.trim();
      const email  = document.getElementById("email").value.trim();
      const modele = document.getElementById("modele").value;
      if (!modele) { showToast("⚠️", "Veuillez choisir un modèle.", "error"); return; }
      showToast("✅", `Réservation confirmée pour ${modele}, ${nom}. Vous recevrez un e-mail à ${email}.`, "success");
      reservForm.reset();
    });
  }

  /* ── Formulaire contact ── */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      const nom = document.getElementById("nom").value.trim();
      showToast("✅", `Message envoyé ! Merci ${nom}, on vous répond sous 24h.`, "success");
      contactForm.reset();
    });
  }

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll(".reveal, .brand-section");
  if (revealEls.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  }

  /* ── Filter buttons (telephones.html) ── */
  const filterBtns = document.querySelectorAll(".filter-btn");
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        document.querySelectorAll(".brand-section").forEach(section => {
          if (filter === "all" || section.dataset.brand === filter) {
            section.style.display = "";
            setTimeout(() => section.classList.add("visible"), 50);
          } else {
            section.style.display = "none";
          }
        });
      });
    });
  }

  /* ── Wishlist heart toggle ── */
  document.querySelectorAll(".btn-wishlist").forEach(btn => {
    btn.addEventListener("click", () => {
      const liked = btn.textContent.trim() === "♥";
      btn.textContent = liked ? "♡" : "♥";
      btn.style.color = liked ? "" : "#e04040";
    });
  });

  /* ── Toast helper ── */
  function showToast(icon, msg, type = "success") {
    const toast    = document.getElementById("toast");
    const toastIcon = document.getElementById("toastIcon");
    const toastMsg  = document.getElementById("toastMsg");
    if (!toast) return;
    toastIcon.textContent = icon;
    toastMsg.textContent  = msg;
    toast.className = `toast toast-${type} show`;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove("show"), 4000);
  }

});
