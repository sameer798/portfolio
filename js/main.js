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

// ---- Contact form (no backend yet - shows a local confirmation message) ----
function setupContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // TODO: replace with a real submit (e.g. an API call or a form service)
    // once you wire up a backend or a service like Formspree.
    status.textContent = "Thanks! Your message has been noted.";
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