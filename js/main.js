// App entry point - runs once the HTML document is ready.
// Calls render functions to build the page from data.js, then wires up
// the photo slider, navbar behaviour, and the contact form.

document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  buildSliderModal();
  setupSliderTriggers();
  setupHamburgerMenu();
  setupActiveNavHighlight();
  setupContactForm();
  setupThemeToggle();
    setupNavbarScrollShadow();

     setupTypingAnimation();     
  setupNameColorFlash();      
   setupWhoHeadingColorFlash();

     setupAboutBackground();
      setupCardTilt();
});

// ---- Light/dark theme toggle (persisted in localStorage) ----
function setupThemeToggle() {
  const toggle = document.querySelector(".theme-toggle");

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

// ---- Mobile hamburger menu ----
function setupHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list");

  hamburger.addEventListener("click", () => {
    navList.classList.toggle("open");
    hamburger.classList.toggle("active");
  });

  // Close the menu after a link is tapped (mobile UX)
  navList.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navList.classList.remove("open");
      hamburger.classList.remove("active");
    }
  });
}

// ---- Active section highlight while scrolling ----
function setupActiveNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-list a");

  function setActive(id) {
    navLinks.forEach(link => {
      link.classList.toggle("active", link.dataset.section === id);
    });
  }

  // Highlight instantly on click instead of waiting for scroll to settle
  navLinks.forEach(link => {
    link.addEventListener("click", () => setActive(link.dataset.section));
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });

  sections.forEach(section => observer.observe(section));

  // Default to the first section (About) until the user scrolls or clicks
  if (sections.length) setActive(sections[0].id);
}


// ---- Contact form → opens WhatsApp with a pre-filled message ----
function setupContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  // 👇 Apna WhatsApp number yahan daalo (country code ke saath, no +, no spaces)
  const WHATSAPP_NUMBER = "917737308028";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    // Build pre-filled WhatsApp message
    const text = `Hi, my name is ${name}.\n\nSubject: ${subject}\n\nMessage: ${message}`;
    const encodedText = encodeURIComponent(text);

    // wa.me link — WhatsApp smart fallback (app → web → download)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

    // Open WhatsApp in new tab/window
    window.open(whatsappUrl, "_blank");

    // Show confirmation
    status.textContent = "Opening WhatsApp...";
    status.classList.add("show");
    form.reset();

    setTimeout(() => status.classList.remove("show"), 4000);
  });
}


// ---- Adds a subtle shadow to the fixed navbar when page is scrolled ----
function setupNavbarScrollShadow() {
  const navbar = document.getElementById("navbar");

  function toggleShadow() {
    if (window.scrollY > 10) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", toggleShadow, { passive: true });
  toggleShadow(); // run once on load
}


// ============================================================
// Typing animation for the About section tagline
// Prefix ("I ") stays fixed; only the word types/deletes in a loop
// ============================================================
function setupTypingAnimation() {
  const wordEl = document.getElementById("typing-word");
  if (!wordEl) return;

  const words = portfolioData.about.typingWords || [];
  if (words.length === 0) return;

  const typeSpeed   = portfolioData.about.typingSpeed       || 100;
  const deleteSpeed = portfolioData.about.typingDeleteSpeed || 50;
  const holdTime    = portfolioData.about.typingHoldTime    || 1500;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      // typing forward
      charIndex++;
      wordEl.textContent = currentWord.substring(0, charIndex);

      if (charIndex === currentWord.length) {
        // word fully typed → hold, then start deleting
        isDeleting = true;
        setTimeout(tick, holdTime);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      // deleting backward
      charIndex--;
      wordEl.textContent = currentWord.substring(0, charIndex);

      if (charIndex === 0) {
        // word fully deleted → move to next word, start typing
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, 300); // small pause before typing next
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }

  // kick off
  setTimeout(tick, 500);
}

// ============================================================
// Cycles the name's color with a smooth fade (uses CSS variable
// + transition, so the browser interpolates the color smoothly)
// ============================================================
function setupNameColorFlash() {
  const nameEl = document.getElementById("name-flash");
  if (!nameEl) return;

  const colors = portfolioData.about.nameColors || [];
  if (colors.length === 0) return;

  let colorIndex = 0;
  nameEl.style.setProperty("--name-color", colors[0]);

  setInterval(() => {
    colorIndex = (colorIndex + 1) % colors.length;
    nameEl.style.setProperty("--name-color", colors[colorIndex]);
  }, 2500); // change every 2.5s (fade takes 1.2s, so plenty of time)
}


// ============================================================
// Cycles the "WHO AM I?" heading color with a smooth fade
// ============================================================
function setupWhoHeadingColorFlash() {
  const heading = document.getElementById("who-heading-flash");
  if (!heading) return;

  const colors = portfolioData.about.sectionHeading?.colors || [];
  if (colors.length === 0) return;

  let i = 0;
  heading.style.setProperty("--heading-color", colors[0]);

  setInterval(() => {
    i = (i + 1) % colors.length;
    heading.style.setProperty("--heading-color", colors[i]);
  }, 2500); // every 2.5s (transition 1.2s hai, so smooth)
}





// ============================================================
// About section background:
// 1. Injects a code-symbols pattern (fills the whole section)
// 2. Adds a mouse-follow glow
// Only active on devices with a real pointer (hover: hover)
// ============================================================
function setupAboutBackground() {
  const aboutSection = document.getElementById("about");
  if (!aboutSection) return;

  // ---- Inject pattern layer (with content directly) ----
  if (!aboutSection.querySelector(".about-code-pattern")) {
    const pattern = document.createElement("div");
    pattern.className = "about-code-pattern";
    pattern.setAttribute("aria-hidden", "true");

    // 👇 Repeat content to fill the section area
    const symbols = "{ } </>  const  ( )  =>  []  div  ;  React  Node  AWS  return  ==  {}  </>  MySQL  Python  &&  div  ;  ( )  fn  {}  </>  const  =  Docker  {}  </>  JavaScript  ( )  ;  React  =  {}  </>  Node  AWS  ;  const  ( )  =>  []  MySQL  div  ;  {}  </>  Python  return  ==  {}  </>  JavaScript  const  ( )  =>  React  Node  Docker  ;  {}  </>  AWS  MySQL  fn  ;  ( )  div  {}  </>  const  ==  Python  {}  </>  JavaScript  React  ( )  ;  Node  =>  AWS  []  MySQL  div  ;  {}  </>  const  ( )  {}  </>  return  React  JavaScript  Node  ;";
    // Repeat 8 times to ensure it fills any section height
    pattern.textContent = Array(8).fill(symbols).join("\n");

    aboutSection.appendChild(pattern);
  }

  // ---- Inject glow layer ----
  if (!aboutSection.querySelector(".about-glow")) {
    const glow = document.createElement("div");
    glow.className = "about-glow";
    glow.setAttribute("aria-hidden", "true");
    aboutSection.appendChild(glow);
  }

    const glowEl = aboutSection.querySelector(".about-glow");
  const patternEl = aboutSection.querySelector(".about-code-pattern");

  // ---- Skip glow on touch-only devices ----
  const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!hasHover) {
    glowEl.style.display = "none";
    return;
  }

  // ---- Mouse tracking + parallax on pattern ----
  const PARALLAX_STRENGTH = 50;   // 👈 pattern kitna move kare (px) — 8 = subtle, 20 = strong

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let rafId = null;

  function animate() {
    // Smooth interpolation (lerp) — pattern slowly follows
    currentX += (targetX - currentX) * 0.16;
    currentY += (targetY - currentY) * 0.16;

    // Pattern shift (parallax)
    const shiftX = (currentX - window.innerWidth / 2) / window.innerWidth * PARALLAX_STRENGTH;
    const shiftY = (currentY - window.innerHeight / 2) / window.innerHeight * PARALLAX_STRENGTH;

    patternEl.style.transform = `translate(${shiftX}px, ${shiftY}px)`;

    if (Math.abs(targetX - currentX) > 0.3 || Math.abs(targetY - currentY) > 0.3) {
      rafId = requestAnimationFrame(animate);
    } else {
      rafId = null;
    }
  }

  aboutSection.addEventListener("mousemove", (e) => {
    const rect = aboutSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Glow follows instantly
    glowEl.style.left = x + "px";
    glowEl.style.top  = y + "px";
    glowEl.style.opacity = "1";

    // Pattern ko target position do (smooth follow)
    targetX = e.clientX;
    targetY = e.clientY;

    if (!rafId) rafId = requestAnimationFrame(animate);
  });

  aboutSection.addEventListener("mouseleave", () => {
    glowEl.style.opacity = "0";

    // Pattern ko wapas center pe le jao
    targetX = window.innerWidth / 2;
    targetY = window.innerHeight / 2;
    if (!rafId) rafId = requestAnimationFrame(animate);
  });
}




// ============================================================
// 3D tilt + expand effect on the About section code card.
// Mouse position within the card determines the tilt angles.
// Smoothly resets when mouse leaves.
// ============================================================
function setupCardTilt() {
  const card = document.querySelector("#about .code-card");
  if (!card) return;

  // Skip on touch-only devices
  const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!hasHover) return;

  const MAX_TILT   = 3;    // 👈 max tilt angle in degrees
  const SCALE      = 1.05; // 👈 scale on hover
  const PERSPECTIVE = 600; // 👈 depth (lower = more dramatic)

  // 👇 Apply perspective to the card's parent so tilt works in 3D
  const parent = card.parentElement;
  if (parent) parent.style.perspective = PERSPECTIVE + "px";

  card.style.transformStyle = "preserve-3d";
  card.style.willChange = "transform";
  card.style.transition = "transform 0.25s ease-out, box-shadow 0.35s ease";

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    // Mouse position relative to card (0 → 1)
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top)  / rect.height;

    // Calculate tilt
    // px=0.5 means center, so (px - 0.5) → -0.5 to +0.5
    const rotateY = (px - 0.5) * MAX_TILT * 2;   // left → negative, right → positive
    const rotateX = (0.5 - py) * MAX_TILT * 2;   // top → positive, bottom → negative

    card.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${SCALE})`;
    card.style.boxShadow = "0 25px 60px rgba(120, 100, 220, 0.45)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
    card.style.boxShadow = "";   // 👈 back to CSS default
  });
}