
const PROJECTS = [
  {
    title: "Movie App",
    cat: ["React"],
    tags: ["React", "TMDB API", "React Router", "Context API"],
    img: "images/movie.jpg",
    short: "Movie & TV discovery platform built by a 5-person team.",
    desc: "A React web app built with my team during the ITI summer training program. Browse movies and TV shows, search, and keep a personal watchlist.",
    features: ["Search and Movies / TV Shows tabs", "Pagination and movie details with recommendations", "Watchlist and language switch (EN / AR)", "Built with React, React Router, Context API and the TMDB API"],
    live: "", code: ""
  },
  {
    title: "PULSE – Fitness Landing Page",
    cat: ["HTML & CSS", "JavaScript"],
    tags: ["HTML", "CSS", "JavaScript"],
    img: "images/pulse.jpg",
    short: "Responsive landing page for a women's fitness studio.",
    desc: "A modern landing page sample with a hero section, features, pricing plans and a free-trial booking form, fully responsive from mobile to desktop.",
    features: ["Hero with live stats card", "3 pricing plans", "Booking form", "Mobile-first responsive layout"],
    live: "", code: ""
  },
  {
    title: "Desserts Cart",
    cat: ["JavaScript"],
    tags: ["JavaScript", "DOM", "CSS Grid"],
    img: "images/desserts.jpg",
    short: "Product list with a working shopping cart.",
    desc: "An e-commerce style page where you add desserts to a cart, remove items and see the order total update live.",
    features: ["Add / remove items", "Live quantity and order total", "Confirm order button", "Responsive product grid"],
    live: "", code: ""
  },
  {
    title: "Where in the World?",
    cat: ["JavaScript"],
    tags: ["JavaScript", "Dark / Light mode", "Filters"],
    img: "images/countries.jpg",
    short: "Country explorer with search and region filter.",
    desc: "Browse countries with their flag, population, region and capital. Search by name, filter by region and switch between dark and light mode.",
    features: ["Search for a country", "Filter by region", "Dark / light mode toggle", "Card grid layout"],
    live: "", code: ""
  },
  {
    title: "Todo App",
    cat: ["JavaScript"],
    tags: ["JavaScript", "Dark mode", "CSS"],
    img: "images/todo.jpg",
    short: "Clean to-do list with filters and theme toggle.",
    desc: "A simple, good-looking task manager to add tasks, mark them as done and filter what you see.",
    features: ["Add and complete tasks", "Filter: All / Active / Completed", "Clear completed", "Items-left counter and theme toggle"],
    live: "", code: ""
  },
  {
    title: "Modern Video Player",
    cat: ["JavaScript"],
    tags: ["HTML5 Video", "JavaScript", "CSS"],
    img: "images/videoplayer.jpg",
    short: "Custom video player with its own controls.",
    desc: "A video player where every control is built from scratch with JavaScript on top of the HTML5 video element.",
    features: ["Play, pause, stop, mute and loop", "Playback speed 0.5x / 1x / 2x", "Volume and progress sliders", "Fullscreen and player size options"],
    live: "", code: ""
  },
  {
    title: "Login Form",
    cat: ["HTML & CSS"],
    tags: ["HTML", "CSS", "Forms"],
    img: "images/login.jpg",
    short: "Clean login form with social sign-in buttons.",
    desc: "A tidy login card with social login buttons, username and password fields, remember me option and a sign-up link.",
    features: ["Social login buttons", "Styled inputs and states", "Remember me and forgot password", "Responsive card"],
    live: "", code: ""
  },
  {
    title: "Personal Portfolio (Pink)",
    cat: ["HTML & CSS"],
    tags: ["HTML", "CSS", "Responsive"],
    img: "images/portfolio-pink.jpg",
    short: "A soft pink portfolio with skills and projects.",
    desc: "My second personal portfolio: about section, skill bars, project cards and contact info in a pink theme.",
    features: ["About, skills, projects and contact", "Skill progress bars", "Project cards with buttons", "Social links"],
    live: "", code: ""
  },
  {
    title: "Link-in-Bio Page",
    cat: ["HTML & CSS", "JavaScript"],
    tags: ["HTML", "CSS", "JavaScript"],
    img: "images/links.jpg",
    short: "One page with all my links and a dark mode toggle.",
    desc: "A mobile-friendly links page for social profiles, portfolio and CV, with a gradient background and dark mode switch.",
    features: ["Link cards with icons", "Dark mode toggle", "Gradient background", "Social buttons"],
    live: "", code: ""
  },
  {
    title: "Social Media Designs",
    cat: ["Design"],
    tags: ["Graphic design", "Social media"],
    img: "images/social.jpg",
    short: "Concept visuals for campaigns and student activities.",
    desc: "Social media graphics and visual content I create for student campaigns (Hult Prize, EYE), a few designs every month.",
    features: ["Campaign posts", "Consistent brand colors", "Video montages for youth activities"],
    live: "", code: ""
  },
  {
    title: "Data Analysis Dashboard",
    cat: ["Design"],
    tags: ["Data analysis", "Dashboard"],
    img: "images/analytics.jpg",
    short: "Concept of a data dashboard for business decisions.",
    desc: "From my data science and analytics training: turning numbers into clear charts that support business decisions.",
    features: ["Trend and bar charts", "Dark dashboard layout", "Business reporting mindset"],
    live: "", code: ""
  }
];

/* ---------- helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- projects + filters ---------- */
const grid = $("#projectGrid");
const cats = ["All", ...new Set(PROJECTS.flatMap(p => p.cat))];
$("#filters").innerHTML = cats.map((c, i) => `<button class="${i ? "" : "on"}" data-cat="${c}">${c}</button>`).join("");

grid.innerHTML = PROJECTS.map((p, i) => `
  <article class="proj tilt reveal" data-i="${i}" data-cat="${p.cat.join("|")}" tabindex="0" role="button" aria-label="Open ${p.title}">
    <div class="thumb"><img src="${p.img}" alt="${p.title} screenshot"></div>
    <div class="info">
      <div class="tags">${p.tags.slice(0, 3).map(t => `<span>${t}</span>`).join("")}</div>
      <h3>${p.title}</h3>
      <p>${p.short}</p>
    </div>
  </article>`).join("");

$("#filters").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  $$("#filters button").forEach(x => x.classList.toggle("on", x === b));
  $$(".proj").forEach(c => c.classList.toggle("hide", b.dataset.cat !== "All" && !c.dataset.cat.split("|").includes(b.dataset.cat)));
});

/* ---------- modal ---------- */
const modal = $("#modal");
function openProject(i) {
  const p = PROJECTS[i];
  $("#mImg").src = p.img; $("#mImg").alt = p.title;
  $("#mTitle").textContent = p.title;
  $("#mDesc").textContent = p.desc;
  $("#mTags").innerHTML = p.tags.map(t => `<span>${t}</span>`).join("");
  $("#mFeat").innerHTML = p.features.map(f => `<li>${f}</li>`).join("");
  $("#mLinks").innerHTML =
    (p.live ? `<a class="btn" href="${p.live}" target="_blank" rel="noopener">Live demo ↗</a>` : "") +
    (p.code ? `<a class="btn ghost" href="${p.code}" target="_blank" rel="noopener">Source code</a>` : "") +
    `<a class="btn ghost" href="#contact" data-close>Want something similar?</a>`;
  modal.classList.add("open"); modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
grid.addEventListener("click", e => { const c = e.target.closest(".proj"); if (c) openProject(c.dataset.i); });
grid.addEventListener("keydown", e => { if (e.key === "Enter") { const c = e.target.closest(".proj"); if (c) openProject(c.dataset.i); } });
$("#mClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal || e.target.closest("[data-close]")) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

/* ---------- typed text ---------- */
const words = ["responsive websites", "landing pages", "React web apps", "ideas that work"];
const typedEl = $("#typed");
let w = 0, c = 0, del = false;
(function tick() {
  const word = words[w];
  typedEl.textContent = word.slice(0, c);
  if (!del && c === word.length) { del = true; return setTimeout(tick, 1600); }
  if (del && c === 0) { del = false; w = (w + 1) % words.length; return setTimeout(tick, 350); }
  c += del ? -1 : 1;
  setTimeout(tick, del ? 40 : 85);
})();

/* ---------- certificates ----------
   To add one: copy a block, put the image in images/certs/ and fill the fields.
   Put it in FEATURED_CERTS (big cards) or MORE_CERTS (small list under the button). */
const FEATURED_CERTS = [
  {
    title: "Web Development using React JS",
    org: "Information Technology Institute (ITI)",
    date: "4 Aug – 3 Sep 2026",
    badge: "144 hours",
    img: "images/certs/iti-react.jpg",
    points: ["Client-side technologies · 48h", "ECMAScript (ES6+) & modern JavaScript · 18h", "HTML5 & CSS3 · 18h", "Responsive design with Bootstrap · 12h", "ReactJS development · 24h", "Generative AI, AI agents & automation · 12h", "Freelancing fundamentals · 12h"]
  },
  {
    title: "Freelancing Basics",
    org: "ITI Platform (Mahara-Tech)",
    date: "1 Sep 2026",
    badge: "3h 8m",
    img: "images/certs/freelancing-basics.jpg",
    points: ["Completed on ITI's online learning platform", "Verified certificate with a verification code", "Backs up the freelance services I offer here"]
  }
];
const MORE_CERTS = [
  { title: "Generative AI · CIB Summer Internship", org: "Commercial International Bank (CIB)", date: "July 2026", img: "images/certs/cib-genai.jpg" },
  { title: "Career Clarity & Vacancies Sustainability", org: "ITIDA · TIEC · Creativa (KenKo)", date: "22 Jun 2026", img: "images/certs/career-clarity.jpg" },
  { title: "Steer your Career", org: "INJAZ Al-Arab", date: "14 Apr 2026", img: "images/certs/injaz.jpg" },
  { title: "Excel 2019 & Access 2019", org: "Microsoft Egypt · Ministry of Youth and Sports", date: "20–25 Sep 2025", img: "images/certs/ms-office-excel-access.jpg" },
  { title: "Word, PowerPoint, Windows 10, Outlook & Internet", org: "Microsoft Egypt · Ministry of Youth and Sports", date: "20–25 Sep 2025", img: "images/certs/ms-office-word-ppt.jpg" },
  { title: "Entrepreneurship Training Program (Basic)", org: "Tanta University · UCCD", date: "18–20 Oct 2025", img: "images/certs/uccd-entrepreneurship.jpg" },
  { title: "Entrepreneurship Program", org: "Hult Prize · Tanta University", date: "", img: "images/certs/hult-prize.jpg" },
  { title: "Certificate of Appreciation · Saba3 Sanabel 6", org: "Khoshdash (volunteering)", date: "", img: "images/certs/khoshdash.jpg" }
];
const allCerts = [...FEATURED_CERTS, ...MORE_CERTS];

$("#certFeatured").innerHTML = FEATURED_CERTS.map((c, i) => `
  <article class="cert-big tilt reveal" data-i="${i}" tabindex="0" role="button" aria-label="Open certificate: ${c.title}">
    <div class="cert-thumb"><img src="${c.img}" alt="${c.title} certificate" loading="lazy"><span class="badge">${c.badge}</span></div>
    <div class="cert-info">
      <small>${c.org} · ${c.date}</small>
      <h3>${c.title}</h3>
      <ul>${c.points.map(p => `<li>${p}</li>`).join("")}</ul>
    </div>
  </article>`).join("");

$("#certMore").innerHTML = MORE_CERTS.map((c, i) => `
  <button class="cert-row" data-i="${FEATURED_CERTS.length + i}" aria-label="Open certificate: ${c.title}">
    <img src="${c.img}" alt="" loading="lazy">
    <span><b>${c.title}</b><small>${[c.org, c.date].filter(Boolean).join(" · ")}</small></span>
    <i aria-hidden="true">↗</i>
  </button>`).join("");
$("#certCount").textContent = `(${MORE_CERTS.length})`;

const certMore = $("#certMore"), certToggle = $("#certToggle");
certToggle.addEventListener("click", () => {
  const open = certMore.hidden;
  certMore.hidden = !open;
  certToggle.setAttribute("aria-expanded", open);
  certToggle.firstChild.textContent = open ? "Show fewer " : "More certificates ";
  certToggle.lastChild.textContent = open ? " ↑" : " ↓";
});

/* lightbox */
const lb = $("#lightbox");
function openCert(i) {
  const c = allCerts[i];
  $("#lbImg").src = c.img; $("#lbImg").alt = c.title + " certificate";
  $("#lbCap").textContent = [c.title, c.org, c.date].filter(Boolean).join(" · ");
  lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeCert() { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
$("#certificates").addEventListener("click", e => {
  const t = e.target.closest("[data-i]"); if (t) openCert(+t.dataset.i);
});
$("#certFeatured").addEventListener("keydown", e => {
  if (e.key === "Enter") { const t = e.target.closest("[data-i]"); if (t) openCert(+t.dataset.i); }
});
$("#lbClose").addEventListener("click", closeCert);
lb.addEventListener("click", e => { if (e.target === lb) closeCert(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeCert(); });

/* ---------- scroll reveal + counters ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
$$(".reveal").forEach(el => io.observe(el));

const counters = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || "";
  let n = 0; const step = Math.max(1, Math.round(end / 40));
  const t = setInterval(() => { n = Math.min(end, n + step); el.textContent = n + suf; if (n >= end) clearInterval(t); }, 35);
  counters.unobserve(el);
}), { threshold: .6 });
$$("[data-count]").forEach(el => counters.observe(el));

/* ---------- 3D tilt on cards (mouse devices only) ---------- */
if (matchMedia("(hover:hover)").matches) {
  document.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px";
  });
  document.addEventListener("mouseover", e => {
    const t = e.target.closest(".tilt"); if (!t || t._t) return; t._t = 1;
    t.addEventListener("mousemove", ev => {
      const r = t.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - .5, y = (ev.clientY - r.top) / r.height - .5;
      t.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) translateY(-4px)`;
    });
    t.addEventListener("mouseleave", () => t.style.transform = "");
  });
}
const glow = $("#glow");

/* ---------- mobile menu ---------- */
const burger = $("#burger"), links = $("#links");
burger.addEventListener("click", () => { const o = links.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });
links.addEventListener("click", e => { if (e.target.tagName === "A") { links.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });

/* ---------- contact form: opens the visitor's email app ----------
   (a static site has no server. For a real form without email app,
   use a free service like Formspree or Netlify Forms.) */
$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = `Hi Shahd,\n\n${f.get("msg")}\n\nService: ${f.get("service")}\nName: ${f.get("name")}\nEmail: ${f.get("email")}`;
  location.href = `mailto:shahdmagdyelshora@gmail.com?subject=${encodeURIComponent("Project inquiry: " + f.get("service"))}&body=${encodeURIComponent(body)}`;
});

$("#year").textContent = new Date().getFullYear();
