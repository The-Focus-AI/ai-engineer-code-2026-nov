/**
 * Fixed scroll runtime for a talk story.
 * The page owns the visuals and the copy; this owns which card is active.
 *
 * Wide screens: the visual rail is sticky beside the text; the chapter in view
 * is marked current, its card is shown, and a "2 / 6" counter tracks progress.
 * Phones: each chapter gets a copy of its card placed directly above its text,
 * so the picture and the paragraph that explains it stay together.
 */
(function () {
  "use strict";

  // Site chrome: the top bar every page shares (scripts/site/nav.ts builds the
  // same links), a link back to this talk's hub, and evidence links rewritten
  // from raw markdown to the hub's rendered sections. The page lives at
  // talks/<slug>/experience/page.html; the root is found from this script's src.
  (function siteChrome() {
    const me = document.currentScript || document.querySelector('script[src$="stories/runtime/talk.js"]');
    const src = me && me.getAttribute("src");
    if (!src) return;
    const up = src.replace(/stories\/runtime\/talk\.js.*$/, "");
    const hub = (s) => up + "site/talks/" + s + ".html";
    const here = location.pathname.match(/\/talks\/([^/]+)\/experience\//);
    const slug = here && here[1];
    if (!document.querySelector(".topnav")) {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = up + "site/nav.css";
      document.head.appendChild(css);
      const nav = document.createElement("nav");
      nav.className = "topnav in-talk";
      nav.setAttribute("aria-label", "Site");
      const items = [["AIE Code ’26", "index.html", "brand"], ["Today", "index.html"], ["Schedule", "site/schedule.html"],
        ["Talks", "site/talks/index.html", "current"], ["Themes", "site/themes.html"], ["People", "site/people.html"]];
      for (const [label, href, kind] of items) {
        const a = document.createElement("a");
        a.textContent = label;
        a.href = up + href;
        if (kind === "brand") a.className = "brand";
        if (kind === "current") a.setAttribute("aria-current", "page");
        nav.appendChild(a);
      }
      document.body.prepend(nav);
      const mast = document.querySelector(".talk-masthead");
      if (slug && mast) {
        const back = document.createElement("a");
        back.className = "talk-back";
        back.href = hub(slug);
        back.textContent = "← Everything from this talk";
        mast.prepend(back);
      }
    }
    for (const a of document.querySelectorAll('a[href*=".md"]')) {
      const m = a.getAttribute("href").match(/^(?:\.\.\/\.\.\/([^/]+)\/|\.\.\/)(transcript|links|story)\.md(?:#.*)?$/);
      const s = m && (m[1] || slug);
      if (s) a.setAttribute("href", hub(s) + "#" + m[2]);
    }
  })();

  const layout = document.querySelector(".talk-layout");
  const sections = [...document.querySelectorAll(".talk-copy section[data-chapter]")];
  const visuals = [...document.querySelectorAll(".talk-visual[data-visual]")];
  const caption = document.querySelector(".talk-rail-caption");
  const progress = document.querySelector(".talk-rail-progress span");
  if (!layout || !sections.length || !visuals.length) return;

  const byVisual = new Map();
  for (const v of visuals) byVisual.set(v.getAttribute("data-visual"), v);

  // Chapter counter under the rail.
  let count = document.querySelector(".talk-rail-count");
  const rail = document.querySelector(".talk-rail");
  if (!count && rail) {
    count = document.createElement("p");
    count.className = "talk-rail-count";
    count.setAttribute("aria-hidden", "true");
    rail.appendChild(count);
  }

  // Inline copies for phones: one card above each chapter, built once.
  for (const section of sections) {
    const v = byVisual.get(section.getAttribute("data-visual"));
    if (!v || section.querySelector(".inline-visual")) continue;
    const copy = v.cloneNode(true);
    copy.classList.remove("talk-visual", "is-active");
    copy.classList.add("inline-visual");
    copy.removeAttribute("data-visual");
    copy.setAttribute("aria-hidden", "true");
    section.insertBefore(copy, section.firstChild);
  }

  function activate(section) {
    const id = section.getAttribute("data-visual");
    for (const v of visuals) v.classList.toggle("is-active", v.getAttribute("data-visual") === id);
    for (const s of sections) s.classList.toggle("is-current", s === section);
    if (caption) caption.textContent = section.getAttribute("data-caption") || "";
    const i = sections.indexOf(section);
    if (progress) progress.style.width = `${((i + 1) / sections.length) * 100}%`;
    if (count) count.textContent = `${i + 1} / ${sections.length}`;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = entry.target.getAttribute("data-visual");
        if (id && byVisual.has(id)) activate(entry.target);
      }
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
  );
  sections.forEach((s) => io.observe(s));

  const toggle = document.querySelector("[data-talk-collapse]");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const collapsed = layout.toggleAttribute("data-talk-collapsed");
      toggle.textContent = collapsed ? "Show visuals" : "Hide visuals";
      toggle.setAttribute("aria-pressed", String(collapsed));
    });
  }

  activate(sections[0]);
})();
