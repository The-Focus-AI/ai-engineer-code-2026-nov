/**
 * Fixed scroll runtime for talk stories and theme presentations.
 * The page owns the visuals and the copy; this owns which card is active,
 * plus shared site chrome and deterministic cross-referencing from site/xref.js.
 */
(function () {
  "use strict";

  const me = document.currentScript || document.querySelector('script[src$="stories/runtime/talk.js"]');
  const src = me && me.getAttribute("src");
  const up = src ? src.replace(/stories\/runtime\/talk\.js.*$/, "") : "../../../";
  const hub = (s) => up + "site/talks/" + s + ".html";

  const talkMatch = location.pathname.match(/\/talks\/([^/]+)\/experience\//);
  const talkSlug = talkMatch && talkMatch[1];
  const atlasMatch = location.pathname.match(/\/atlases\/([^/]+)\//);
  const atlasSlug = atlasMatch && atlasMatch[1];

  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  };

  // Site chrome: shared top bar, masthead breadcrumbs, and markdown link rewrites.
  (function siteChrome() {
    if (!src) return;
    if (!document.querySelector(".topnav")) {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = up + "site/nav.css";
      document.head.appendChild(css);

      const nav = document.createElement("nav");
      nav.className = "topnav in-talk";
      nav.setAttribute("aria-label", "Site");
      const currentSection = atlasSlug ? "themes" : "talks";
      const items = [
        ["AIE Code ’26", "index.html", "brand"],
        ["Today", "index.html", "today"],
        ["Schedule", "site/schedule.html", "schedule"],
        ["Talks", "site/talks/index.html", "talks"],
        ["Themes", "site/themes.html", "themes"],
        ["People", "site/people.html", "people"],
        ["Follow-ups", "site/followups.html", "followups"],
      ];
      for (const [label, href, kind] of items) {
        const a = document.createElement("a");
        a.textContent = label;
        a.href = up + href;
        if (kind === "brand") a.className = "brand";
        if (kind === currentSection) a.setAttribute("aria-current", "page");
        nav.appendChild(a);
      }
      document.body.prepend(nav);

      const mast = document.querySelector(".talk-masthead");
      if (mast && (talkSlug || atlasSlug)) {
        const row = el("div", "talk-back-row");
        if (talkSlug) {
          const backHub = el("a", "talk-back", "← Everything from this talk");
          backHub.href = hub(talkSlug);
          row.appendChild(backHub);
          const allTalks = el("a", "talk-back", "All talks");
          allTalks.href = up + "site/talks/index.html";
          row.appendChild(allTalks);
          const allThemes = el("a", "talk-back", "All themes");
          allThemes.href = up + "site/themes.html";
          row.appendChild(allThemes);
        } else if (atlasSlug === "conference-themes") {
          const themesHub = el("a", "talk-back", "← Themes hub & 191 claims");
          themesHub.href = up + "site/themes.html";
          row.appendChild(themesHub);
          const allTalks = el("a", "talk-back", "All talks");
          allTalks.href = up + "site/talks/index.html";
          row.appendChild(allTalks);
        } else if (atlasSlug) {
          const themesHub = el("a", "talk-back", "← Themes hub");
          themesHub.href = up + "site/themes.html";
          row.appendChild(themesHub);
          const master = el("a", "talk-back", "← Master themes presentation");
          master.href = up + "atlases/conference-themes/page.html";
          row.appendChild(master);
        }
        mast.prepend(row);
      }
    }

    for (const a of document.querySelectorAll('a[href*=".md"]')) {
      const href = a.getAttribute("href") || "";
      const m = href.match(/^(?:\.\.\/\.\.\/([^/]+)\/|\.\.\/)(transcript|links|story)\.md(?:#.*)?$/);
      const s = m && (m[1] || talkSlug);
      if (s) {
        a.setAttribute("href", hub(s) + "#" + m[2]);
      } else if (atlasSlug && href === "story.md") {
        a.setAttribute("href", up + "site/themes.html" + (atlasSlug === "conference-themes" || atlasSlug === "own-the-stack" ? "" : "#" + atlasSlug));
      }
    }
  })();

  // Cross-referencing injected deterministically from site/xref.js.
  function renderXref(xref) {
    if (!xref || document.querySelector(".talk-xref")) return;
    const themes = xref.themes || [];
    const themeById = new Map(themes.map((t) => [t.id, t]));
    const foot = document.querySelector(".talk-foot");
    const insertBeforeFoot = (node) => {
      if (foot && foot.parentNode) foot.parentNode.insertBefore(node, foot);
      else document.body.appendChild(node);
    };

    if (talkSlug && xref.talks && xref.talks[talkSlug]) {
      const info = xref.talks[talkSlug];
      const mast = document.querySelector(".talk-masthead");
      if (mast && !mast.querySelector(".talk-theme-strip")) {
        const strip = el("div", "talk-theme-strip");
        strip.appendChild(el("span", "strip-lbl", "Themes"));
        for (const tid of info.themeIds || []) {
          const th = themeById.get(tid);
          if (!th) continue;
          const chip = el("a", "talk-theme-chip", `Theme ${th.num}: ${th.name} →`);
          chip.href = up + th.deepDiveHref;
          strip.appendChild(chip);
        }
        if (xref.masterPresentation) {
          const allChip = el("a", "talk-theme-chip overview", "Master themes presentation");
          allChip.href = up + xref.masterPresentation.href;
          strip.appendChild(allChip);
        }
        const controls = mast.querySelector(".talk-controls");
        if (controls) mast.insertBefore(strip, controls);
        else mast.appendChild(strip);
      }

      const wrap = el("section", "talk-xref");
      wrap.setAttribute("aria-label", "Themes and related talks");

      // 1. Themes this talk shapes
      const themeBlock = el("div", "xref-block");
      const thHead = el("div", "xref-head");
      thHead.appendChild(el("h2", "", info.themeIds && info.themeIds.length ? "Themes this talk shapes" : "Conference themes"));
      thHead.appendChild(el("span", "xref-sub", "Jump from this talk into its theme deep-dive presentation"));
      themeBlock.appendChild(thHead);

      const thGrid = el("div", "xref-grid");
      for (const tid of info.themeIds || []) {
        const th = themeById.get(tid);
        if (!th) continue;
        const card = el("article", "xref-card is-theme");
        const top = el("div");
        const kick = el("div", "xc-kicker");
        kick.appendChild(el("span", "", `Theme ${th.num}`));
        kick.appendChild(el("span", "", `${th.talkCount} talks · ${th.claimCount} claims`));
        top.appendChild(kick);
        const h3 = el("h3", "xc-title");
        const ta = el("a", "", th.name);
        ta.href = up + th.deepDiveHref;
        h3.appendChild(ta);
        top.appendChild(h3);
        top.appendChild(el("p", "xc-desc", th.claim));
        card.appendChild(top);
        const links = el("div", "xc-links");
        const dLink = el("a", "", "Open deep dive →");
        dLink.href = up + th.deepDiveHref;
        links.appendChild(dLink);
        const aLink = el("a", "", "All claims");
        aLink.href = up + th.hubAnchor;
        links.appendChild(aLink);
        card.appendChild(links);
        thGrid.appendChild(card);
      }
      if (xref.masterPresentation) {
        const card = el("article", "xref-card is-theme");
        const top = el("div");
        const kick = el("div", "xc-kicker");
        kick.appendChild(el("span", "", "Overview"));
        kick.appendChild(el("span", "", "6 themes · 33 talks"));
        top.appendChild(kick);
        const h3 = el("h3", "xc-title");
        const ta = el("a", "", xref.masterPresentation.title);
        ta.href = up + xref.masterPresentation.href;
        h3.appendChild(ta);
        top.appendChild(h3);
        top.appendChild(el("p", "xc-desc", xref.masterPresentation.subtitle));
        card.appendChild(top);
        const links = el("div", "xc-links");
        const dLink = el("a", "", "Start presentation →");
        dLink.href = up + xref.masterPresentation.href;
        links.appendChild(dLink);
        const hLink = el("a", "", "Themes hub");
        hLink.href = up + "site/themes.html";
        links.appendChild(hLink);
        card.appendChild(links);
        thGrid.appendChild(card);
      }
      themeBlock.appendChild(thGrid);
      wrap.appendChild(themeBlock);

      // 2. Contested fault lines (if any)
      if (info.contested && info.contested.length) {
        const cBlock = el("div", "xref-block");
        const cHead = el("div", "xref-head");
        cHead.appendChild(el("h2", "", "Where speakers disagreed"));
        cHead.appendChild(el("span", "xref-sub", "Contested debates in the conference corpus"));
        cBlock.appendChild(cHead);
        const cGrid = el("div", "xref-grid");
        for (const c of info.contested) {
          const card = el("article", "xref-card is-contested");
          const top = el("div");
          const kick = el("div", "xc-kicker");
          kick.appendChild(el("span", "", "Contested question"));
          top.appendChild(kick);
          const h3 = el("h3", "xc-title", c.question);
          top.appendChild(h3);
          top.appendChild(el("p", "xc-desc", `This talk: ${c.stance}`));
          card.appendChild(top);
          const links = el("div", "xc-links");
          for (const p of c.peers || []) {
            const pa = el("a", "", `Compare: ${p.speakers || p.title} →`);
            pa.href = up + p.storyHref;
            links.appendChild(pa);
          }
          const allC = el("a", "", "All debates");
          allC.href = up + "site/themes.html#contested";
          links.appendChild(allC);
          card.appendChild(links);
          cGrid.appendChild(card);
        }
        cBlock.appendChild(cGrid);
        wrap.appendChild(cBlock);
      }

      // 3. Related talks
      if (info.related && info.related.length) {
        const rBlock = el("div", "xref-block");
        const rHead = el("div", "xref-head");
        rHead.appendChild(el("h2", "", "Related talks to explore"));
        rHead.appendChild(el("span", "xref-sub", "Connected by shared themes, contested questions, or field notes"));
        rBlock.appendChild(rHead);
        const rGrid = el("div", "xref-grid");
        for (const r of info.related) {
          const card = el("article", "xref-card");
          const top = el("div");
          const kick = el("div", "xc-kicker");
          kick.appendChild(el("span", "", r.speakers || "Speaker"));
          if (r.when) kick.appendChild(el("span", "", r.when));
          top.appendChild(kick);
          const h3 = el("h3", "xc-title");
          const ra = el("a", "", r.title);
          ra.href = up + r.storyHref;
          h3.appendChild(ra);
          top.appendChild(h3);
          if (r.reasons && r.reasons.length) {
            const tags = el("div", "xc-tags");
            for (const reason of r.reasons) {
              const isConflict = /contested|counter/i.test(reason);
              tags.appendChild(el("span", "xref-tag" + (isConflict ? " conflict" : ""), reason));
            }
            top.appendChild(tags);
          }
          if (r.thesis) top.appendChild(el("p", "xc-desc", r.thesis));
          card.appendChild(top);
          const links = el("div", "xc-links");
          const sLink = el("a", "", "Read story →");
          sLink.href = up + r.storyHref;
          links.appendChild(sLink);
          const hLink = el("a", "", "Talk hub");
          hLink.href = up + r.hubHref;
          links.appendChild(hLink);
          card.appendChild(links);
          rGrid.appendChild(card);
        }
        rBlock.appendChild(rGrid);
        wrap.appendChild(rBlock);
      }

      // 4. Prev / Next talk
      const order = xref.scheduleOrder || [];
      const idx = order.findIndex((o) => o.slug === talkSlug);
      if (idx >= 0) {
        const pn = el("div", "xref-prevnext");
        const prev = order[idx - 1];
        const next = order[idx + 1];
        if (prev) {
          const a = el("a", "xref-pn prev");
          a.href = up + prev.storyHref;
          a.appendChild(el("span", "pn-dir", "← Previous talk"));
          a.appendChild(el("span", "pn-title", prev.title));
          if (prev.speakers) a.appendChild(el("span", "pn-who", prev.speakers));
          pn.appendChild(a);
        } else {
          pn.appendChild(el("div"));
        }
        if (next) {
          const a = el("a", "xref-pn next");
          a.href = up + next.storyHref;
          a.appendChild(el("span", "pn-dir", "Next talk →"));
          a.appendChild(el("span", "pn-title", next.title));
          if (next.speakers) a.appendChild(el("span", "pn-who", next.speakers));
          pn.appendChild(a);
        } else {
          pn.appendChild(el("div"));
        }
        wrap.appendChild(pn);
      }

      insertBeforeFoot(wrap);
      return;
    }

    if (atlasSlug && themes.length) {
      if (atlasSlug === "conference-themes" && document.getElementById("theme-deep-dives")) return;
      const wrap = el("section", "talk-xref");
      wrap.setAttribute("aria-label", "All conference themes");

      const tIdx = themes.findIndex((t) => t.id === atlasSlug);
      if (tIdx >= 0) {
        const pn = el("div", "xref-prevnext");
        const prev = themes[(tIdx - 1 + themes.length) % themes.length];
        const next = themes[(tIdx + 1) % themes.length];
        const aPrev = el("a", "xref-pn prev");
        aPrev.href = up + prev.deepDiveHref;
        aPrev.appendChild(el("span", "pn-dir", `← Theme ${prev.num}`));
        aPrev.appendChild(el("span", "pn-title", prev.name));
        aPrev.appendChild(el("span", "pn-who", `${prev.talkCount} talks · ${prev.claimCount} claims`));
        pn.appendChild(aPrev);

        const aNext = el("a", "xref-pn next");
        aNext.href = up + next.deepDiveHref;
        aNext.appendChild(el("span", "pn-dir", `Theme ${next.num} →`));
        aNext.appendChild(el("span", "pn-title", next.name));
        aNext.appendChild(el("span", "pn-who", `${next.talkCount} talks · ${next.claimCount} claims`));
        pn.appendChild(aNext);
        wrap.appendChild(pn);
      }

      const block = el("div", "xref-block");
      const head = el("div", "xref-head");
      head.appendChild(
        el(
          "h2",
          "",
          atlasSlug === "conference-themes"
            ? "Open any theme deep-dive presentation"
            : "All 6 conference themes"
        )
      );
      const sub = el("span", "xref-sub");
      if (xref.masterPresentation) {
        const mLink = el("a", "", "Master presentation");
        mLink.href = up + xref.masterPresentation.href;
        sub.appendChild(mLink);
        sub.appendChild(document.createTextNode(" · "));
      }
      const hLink = el("a", "", "Themes hub & full claims");
      hLink.href = up + "site/themes.html";
      sub.appendChild(hLink);
      head.appendChild(sub);
      block.appendChild(head);

      const grid = el("div", "xref-grid");
      for (const th of themes) {
        const isCurrent = th.id === atlasSlug;
        const card = el("article", "xref-card is-theme" + (isCurrent ? " is-current-theme" : ""));
        const top = el("div");
        const kick = el("div", "xc-kicker");
        kick.appendChild(el("span", "", isCurrent ? `Theme ${th.num} · current` : `Theme ${th.num}`));
        kick.appendChild(el("span", "", `${th.talkCount} talks · ${th.claimCount} claims`));
        top.appendChild(kick);
        const h3 = el("h3", "xc-title");
        const ta = el("a", "", th.name);
        ta.href = up + th.deepDiveHref;
        h3.appendChild(ta);
        top.appendChild(h3);
        top.appendChild(el("p", "xc-desc", th.claim));
        card.appendChild(top);
        const links = el("div", "xc-links");
        const dLink = el("a", "", isCurrent ? "Reading now" : "Open deep dive →");
        dLink.href = up + th.deepDiveHref;
        links.appendChild(dLink);
        const cLink = el("a", "", "Evidence & talks");
        cLink.href = up + th.hubAnchor;
        links.appendChild(cLink);
        card.appendChild(links);
        grid.appendChild(card);
      }
      block.appendChild(grid);
      wrap.appendChild(block);

      insertBeforeFoot(wrap);
    }
  }

  if (window.__AIE_XREF__) {
    renderXref(window.__AIE_XREF__);
  } else if (src) {
    const xs = document.createElement("script");
    xs.src = up + "site/xref.js";
    xs.async = true;
    xs.onload = () => {
      if (window.__AIE_XREF__) renderXref(window.__AIE_XREF__);
    };
    document.head.appendChild(xs);
  }

  // Scrollytelling rail synchronization
  const layout = document.querySelector(".talk-layout");
  const sections = [...document.querySelectorAll(".talk-copy section[data-chapter]")];
  const visuals = [...document.querySelectorAll(".talk-visual[data-visual]")];
  const caption = document.querySelector(".talk-rail-caption");
  const progress = document.querySelector(".talk-rail-progress span");
  if (!layout || !sections.length || !visuals.length) return;

  const byVisual = new Map();
  for (const v of visuals) byVisual.set(v.getAttribute("data-visual"), v);

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
