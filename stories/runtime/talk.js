/**
 * Fixed scroll runtime for a talk story.
 * The page owns the visuals and the copy; this owns which card is active.
 */
(function () {
  "use strict";
  const layout = document.querySelector(".talk-layout");
  const sections = [...document.querySelectorAll(".talk-copy section[data-chapter]")];
  const visuals = [...document.querySelectorAll(".talk-visual[data-visual]")];
  const caption = document.querySelector(".talk-rail-caption");
  const progress = document.querySelector(".talk-rail-progress span");
  if (!layout || !sections.length || !visuals.length) return;

  const byVisual = new Map();
  for (const v of visuals) byVisual.set(v.getAttribute("data-visual"), v);

  function activate(id, section) {
    for (const v of visuals) v.classList.toggle("is-active", v.getAttribute("data-visual") === id);
    if (caption && section) caption.textContent = section.getAttribute("data-caption") || "";
    if (progress) {
      const i = sections.indexOf(section);
      progress.style.width = `${((i + 1) / sections.length) * 100}%`;
    }
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const section = entry.target;
        const id = section.getAttribute("data-visual");
        if (id && byVisual.has(id)) activate(id, section);
      }
    },
    { rootMargin: "-42% 0px -42% 0px", threshold: 0.01 },
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

  const first = sections[0];
  if (first) activate(first.getAttribute("data-visual"), first);
})();
