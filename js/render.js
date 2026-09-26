// Reads portfolioData (from data.js) and generates HTML for each section.
// To add new content, only edit data.js - this file does not need to change.

// Small inline SVG icons used for social links (no external icon library needed)
const icons = {
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.61-3.37-1.21-3.37-1.21-.46-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.36-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"/></svg>`,
  resume: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-7-7zm0 7V3.5L18.5 9H13zM8 13h8v1.5H8V13zm0 3h8v1.5H8V16zm0-6h4v1.5H8V10z"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>`,
  location: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`
};

function socialLink(type, href) {
  return `<a href="${href}" target="_blank" rel="noopener" class="social-icon" aria-label="${type}">${icons[type]}</a>`;
}

// Left-aligned solid box title with a trailing line, e.g. for Experience / Projects
// function boxedTitle(text) {
//   return `
//     <h2 class="section-title boxed">
//       <span class="boxed-text">${text.toUpperCase()}</span>
//       <span class="title-line"></span>
//     </h2>
//   `;
// }

function boxedTitle(text) {
  return `
    <div class="section-title-wrap">
      <h2 class="section-title boxed">
        <span class="boxed-text">${text.toUpperCase()}</span>
        <span class="title-line"></span>
      </h2>
    </div>
  `;
}

// Centered title with a box and a divider line on each side, e.g. for Skills / Education
function linedTitle(text) {
  return `
    <div class="title-row">
      <span class="title-line"></span>
      <h2 class="section-title lined">${text}</h2>
      <span class="title-line"></span>
    </div>
  `;
}

function renderNavbar() {
  const nav = document.getElementById("navbar");
  const items = ["About", "Experience", "Skills", "Projects", "Education", "Contact"];
  nav.innerHTML = `
    <div class="navbar-inner">
      <button class="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-list">
        ${items.map(item => `<li><a href="#${item.toLowerCase()}" data-section="${item.toLowerCase()}">${item.toUpperCase()}</a></li>`).join("")}
      </ul>
      <button class="theme-toggle" aria-label="Toggle light/dark theme">
        <span class="icon-sun">${icons.sun}</span>
        <span class="icon-moon">${icons.moon}</span>
      </button>
    </div>
  `;
}


// Builds the code card body HTML from about.codeCard data
// Supports: string, array, bool, function (with conditions) types
function buildCodeCard(about) {
  const card = about.codeCard;
  if (!card || !card.fields) return "";

  const lines = card.fields.map(field => {
    const key = `<span class="code-var">${field.key}</span>`;

    switch (field.type) {
      case "string":
        return `  ${key}: <span class="code-string">'${field.value}'</span>`;

      case "array":
        return `  ${key}: [${field.value.map(v => `<span class="code-string">'${v}'</span>`).join(", ")}]`;

      case "bool":
        return `  ${key}: <span class="code-bool">${field.value}</span>`;

           case "function": {
        const body = (field.conditions || []).map((cond) => {
          // 👇 sirf "this." ko blue karo, uske baad jo bhi hai normal rahe
          // Example: "this.hardWorker" → <blue>this.</blue>hardWorker
          const prefixHtml = cond.prefix.replace(
            /this\./g,
            `<span class="code-var">this.</span>`
          );
          const opHtml = cond.op ? ` ${cond.op}` : "";
          const valHtml = cond.value !== undefined ? ` ${cond.value}` : "";
          return `      ${prefixHtml}${opHtml}${valHtml}`;
        }).join("\n");
        return `  ${key}: <span class="code-keyword">function</span>() {\n    <span class="code-keyword">return</span> (\n${body}\n    );\n  }`;
      }

      default:
        return `  ${key}: ${field.value}`;
    }
  }).join(",\n");

  return `<span class="code-keyword">const</span> <span class="code-var">${card.varName}</span> = {\n${lines}\n};`;
}



function renderAbout() {
  const { about } = portfolioData;
  const section = document.getElementById("about");

  section.innerHTML = `
    <!-- Sub-section A: Hero text + Code card -->
    <div class="about-hero">
      <div class="about-text">
        <p class="hey-there">Hey there,</p>
        <p class="hero-line">
          I am <span class="accent name-flash" id="name-flash">${about.name}.</span>
        </p>
        <p class="hero-line" id="typing-line">
          <span class="typing-prefix">${about.typingPrefix || "I "}</span><span class="typing-word" id="typing-word"></span><span class="typing-cursor">|</span>
        </p>

        <div class="social-icons">
          ${socialLink("linkedin", about.socials.linkedin)}
          ${socialLink("github", about.socials.github)}
          ${socialLink("resume", about.socials.resume)}
        </div>

               <div class="about-buttons">
          <a href="https://wa.me/${portfolioData.contact.whatsapp}" target="_blank" rel="noopener" class="btn btn-whatsapp">
            <span class="btn-icon">${icons.whatsapp}</span>
            <span>WhatsApp Me</span>
          </a>
          <a href="${about.socials.resume}" class="btn btn-secondary" download>Get Resume</a>
        </div>
      </div>

           <div class="code-card">
        <div class="code-card-header">
          <div class="window-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
        </div>
        <pre class="code-block">${buildCodeCard(about)}</pre>
      </div>
    </div>

    <!-- Sub-section B: Who am I + Photo -->
       <!-- Sub-section B: Who am I + Photo -->
    <div class="about-who">
      <div class="who-am-i-text">
        <h3 class="who-heading who-heading-flash" id="who-heading-flash">
          ${(about.sectionHeading?.text || "Who am I?").toUpperCase()}
        </h3>
        ${about.bio.map(line => `<p>${line}</p>`).join("")}
      </div>
      ${about.photo ? `
        <div class="who-am-i-photo">
          <img src="${about.photo}" alt="${about.name}" />
        </div>
      ` : ""}
    </div>
  `;
}

function renderSkills() {
  const { skills } = portfolioData;
  const section = document.getElementById("skills");

  section.innerHTML = `
    ${linedTitle("Skills &amp; Technical Expertise")}

    <div class="skills-grid">
      ${skills.bars.map(skill => `
        <div class="skill-card">
          <div class="skill-header">
            <span class="skill-name">${skill.name}</span>
            <span class="skill-percent">${skill.percent}%</span>
          </div>
          <div class="skill-track">
            <div class="skill-fill" style="width: ${skill.percent}%; background: ${skill.color};"></div>
          </div>
        </div>
      `).join("")}
    </div>

       <h3 class="tools-title">Technologies &amp; Tools</h3>

    <div class="tools-marquee">
      <div class="tools-marquee-track">
        ${[...skills.tools, ...skills.tools].map(tool => `
          <div class="tool-chip">
            <div class="tool-logo">
              <img src="${tool.logo}" alt="${tool.name}" loading="lazy" />
            </div>
            <span class="tool-name">${tool.name}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// Builds one sticky "stacking" card. `index` controls the sticky top offset
// so each new card overlaps the one before it while scrolling.
function buildStackCard(index, { title, logo, subtitleHtml, photos }) {
  const photosAttr = encodeURIComponent(JSON.stringify(photos || []));
  return `
    <div class="stack-card" style="top: ${160 + index * 24}px;">
      <div class="stack-card-header">
        <div class="window-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
        ${logo ? `<img src="${logo}" class="card-logo" alt="${title} logo" />` : ""}
        <span class="card-title">${title}</span>
        <button class="view-photos-btn" data-photos="${photosAttr}">
          View photos
        </button>
      </div>
      <div class="stack-card-body">
        ${subtitleHtml}
      </div>
    </div>
  `;
}

function renderExperience() {
  const section = document.getElementById("experience");
  const cards = portfolioData.experience.map((job, i) => buildStackCard(i, {
    title: job.company,
    logo: job.logo,
    photos: job.photos,
    subtitleHtml: `
      <pre class="code-block"><span class="code-keyword">const</span> <span class="code-var">job</span> = {
  myRole: <span class="code-string">${job.role}</span>,
  duration: <span class="code-string">(${job.duration})</span>,
  tools: [${job.tools.map(t => `<span class="code-string">'${t}'</span>`).join(", ")}],
  Description:<span class="code-var">${job.description}</span> 
};</pre>
    `
  })).join("");

  section.innerHTML = `
    ${boxedTitle("Experience")}
    <div class="stack-wrapper">${cards}</div>
  `;
}

function renderProjects() {
  const section = document.getElementById("projects");
  const cards = portfolioData.projects.map((proj, i) => buildStackCard(i, {
    title: proj.name,
    logo: null,
    photos: proj.photos,
    subtitleHtml: `
      <pre class="code-block"><span class="code-keyword">const</span> <span class="code-var">project</span> = {
  name: <span class="code-string">'${proj.name}'</span>,
  tools: [${proj.tools.map(t => `<span class="code-string">'${t}'</span>`).join(", ")}],
   Description: <span class="code-var">${proj.description}</span> 
};</pre>
    `
  })).join("");

  section.innerHTML = `
    ${boxedTitle("Projects")}
    <div class="stack-wrapper">${cards}</div>
  `;
}

function renderEducation() {
  const section = document.getElementById("education");

  section.innerHTML = `
    ${linedTitle("Education")}
    <div class="education-list">
      ${portfolioData.education.map(edu => `
        <div class="education-card">
          <span class="edu-years">${edu.years}</span>
          <p class="edu-degree">${edu.degree}</p>
          <p class="edu-college">${edu.college}</p>
          <p class="edu-branch">${edu.branch}</p>
          <p class="edu-grade">${edu.grade}</p>
          ${edu.logo ? `<img src="${edu.logo}" class="edu-logo" alt="${edu.college} logo" />` : ""}
        </div>
      `).join("")}
    </div>
  `;
}

function renderContact() {
  const { contact } = portfolioData;
  const section = document.getElementById("contact");

  section.innerHTML = `
    <div class="contact-layout">

      <!-- LEFT: Text + Contact info -->
      <div class="contact-info">
        <h2 class="contact-heading">${contact.heading || "Let's talk"}</h2>
       

        <div class="contact-details">
          <a href="mailto:${contact.email}" class="contact-item">
            <span class="contact-icon">${icons.mail}</span>
            <span>${contact.email}</span>
          </a>
          <div class="contact-item">
            <span class="contact-icon">${icons.location}</span>
            <span>${contact.location}</span>
          </div>
        </div>

        <div class="social-icons">
          ${socialLink("github", contact.socials.github)}
          ${socialLink("linkedin", contact.socials.linkedin)}
           <a href="https://wa.me/${contact.whatsapp}" target="_blank" rel="noopener" class="social-icon" aria-label="whatsapp">${icons.whatsapp}</a>
        </div>
      </div>

      <!-- RIGHT: Form -->
      <form class="contact-form" id="contact-form">
        <div class="form-group">
          <label for="contact-name">Name</label>
          <input type="text" id="contact-name" name="name" placeholder="Your name" required />
        </div>

        <div class="form-group">
          <label for="contact-subject">Subject</label>
          <input type="text" id="contact-subject" name="subject" placeholder="What's this about" required />
        </div>

        <div class="form-group">
          <label for="contact-message">Message</label>
          <textarea id="contact-message" name="message" placeholder="Write your message" required></textarea>
        </div>

        <button type="submit" class="contact-btn">
          <span class="contact-btn-icon">${icons.whatsapp}</span>
          <span>Send on WhatsApp</span>
        </button>

        <p class="form-status" id="form-status"></p>
      </form>

    </div>
  `;
}

function renderFooter() {
  const footer = document.getElementById("site-footer");
  const year = new Date().getFullYear();
   const whatsapp = portfolioData.contact.whatsapp;

  footer.innerHTML = `
    <p>&copy; ${year} Developer Portfolio by ${portfolioData.about.name}</p>
    <div class="footer-socials">
      ${socialLink("github", portfolioData.about.socials.github)}
      ${socialLink("linkedin", portfolioData.about.socials.linkedin)}
       <a href="https://wa.me/${whatsapp}" target="_blank" rel="noopener" class="social-icon" aria-label="whatsapp">${icons.whatsapp}</a>
    </div>
  `;
}

function renderAll() {
  renderNavbar();
  renderAbout();
  renderExperience();
  renderSkills();
  renderProjects();
  renderEducation();
  renderContact();
  renderFooter();
}