/**
 * Fixed runtime for an argument atlas.
 *
 * The atlas.json is injected as #atlas-data by scripts/bundle-atlas.ts.
 * The page supplies the masthead and the scrolling argument; this file owns
 * selection, highlighting, filters, zoom, and the reading path.
 */
(function () {
  "use strict";

  const dataEl = document.getElementById("atlas-data");
  const svg = document.getElementById("atlas-graph");
  if (!dataEl || !svg) return;

  const data = JSON.parse(dataEl.textContent);
  const NS = "http://www.w3.org/2000/svg";
  const W = 1000;
  const H = 840;
  const CX = 500;
  const CY = 420;

  const byId = new Map(data.nodes.map((n) => [n.id, n]));
  const neighbours = new Map(data.nodes.map((n) => [n.id, new Set()]));
  for (const e of data.edges) {
    if (!byId.has(e.from) || !byId.has(e.to)) continue;
    neighbours.get(e.from).add(e.to);
    neighbours.get(e.to).add(e.from);
  }

  const edgeLayer = document.createElementNS(NS, "g");
  edgeLayer.setAttribute("class", "edges");
  const nodeLayer = document.createElementNS(NS, "g");
  nodeLayer.setAttribute("class", "nodes");
  const zoomLayer = document.createElementNS(NS, "g");
  zoomLayer.append(edgeLayer, nodeLayer);
  svg.append(zoomLayer);

  const svgEl = (tag, attrs) => {
    const el = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs || {})) el.setAttribute(k, String(v));
    return el;
  };

  const edgeEls = new Map();
  const nodeEls = new Map();

  function edgePath(e) {
    const a = byId.get(e.from);
    const b = byId.get(e.to);
    if (!a || !b) return "";
    if (e.kind === "contests") {
      const mx = (a.x + b.x) / 2 + (b.y - a.y) * 0.18;
      const my = (a.y + b.y) / 2 - (b.x - a.x) * 0.18;
      return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
    }
    return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  }

  function drawEdges() {
    for (const e of data.edges) {
      const path = svgEl("path", {
        d: edgePath(e),
        class: `edge edge-${e.kind}`,
        "data-from": e.from,
        "data-to": e.to,
      });
      const title = svgEl("title");
      title.textContent = `${byId.get(e.from).label} → ${byId.get(e.to).label} (${e.kind})`;
      path.append(title);
      edgeLayer.append(path);
      edgeEls.set(`${e.from}|${e.to}|${e.kind}`, path);
    }
  }

  function labelPosition(n) {
    const pos = n.labelPos || (n.type === "talk" ? "right" : "above");
    if (pos === "left") return { x: n.x - 14, y: n.y + 4, anchor: "end" };
    if (pos === "right") return { x: n.x + 14, y: n.y + 4, anchor: "start" };
    if (pos === "below") return { x: n.x, y: n.y + 21, anchor: "middle" };
    return { x: n.x, y: n.y - 14, anchor: "middle" };
  }

  function drawNode(n) {
    const g = svgEl("g", {
      class: `node node-${n.type}`,
      "data-id": n.id,
      tabindex: "0",
      role: "button",
      "aria-label": `${n.label}. ${n.summary || ""}`,
    });

    if (["claim", "talk", "question"].includes(n.type)) {
      g.append(svgEl("circle", { class: "node-hit", cx: n.x, cy: n.y, r: 18 }));
    }

    let shape;
    if (n.type === "theme") {
      shape = svgEl("circle", { class: "node-shape", cx: n.x, cy: n.y, r: 54 });
    } else if (n.type === "cluster") {
      shape = svgEl("rect", {
        class: "node-shape",
        x: n.x - 62,
        y: n.y - 21,
        width: 124,
        height: 42,
        rx: 7,
      });
    } else if (n.type === "question") {
      shape = svgEl("polygon", {
        class: "node-shape",
        points: `${n.x},${n.y - 11} ${n.x + 11},${n.y} ${n.x},${n.y + 11} ${n.x - 11},${n.y}`,
      });
    } else {
      shape = svgEl("circle", {
        class: "node-shape",
        cx: n.x,
        cy: n.y,
        r: n.type === "claim" ? 8 : 7,
      });
    }
    g.append(shape);

    const lp = labelPosition(n);
    const text = svgEl("text", {
      class: "node-label",
      x: lp.x,
      y: lp.y,
      "text-anchor": lp.anchor,
    });
    if (n.type === "theme") {
      const lines = n.lines || [n.label];
      text.setAttribute("x", String(n.x));
      text.setAttribute("y", String(n.y + 74));
      text.setAttribute("text-anchor", "middle");
      lines.forEach((line, i) => {
        const t = svgEl("tspan", { x: n.x, dy: i === 0 ? 0 : 17 });
        t.textContent = line;
        text.append(t);
      });
    } else {
      text.textContent = n.label;
    }
    g.append(text);

    const title = svgEl("title");
    title.textContent = n.summary || n.label;
    g.append(title);

    g.addEventListener("click", (ev) => {
      ev.stopPropagation();
      select(n.id);
    });
    g.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        select(n.id);
      }
    });
    nodeLayer.append(g);
    nodeEls.set(n.id, g);
  }

  function setDim(keep) {
    for (const [id, g] of nodeEls) {
      const lit = keep.has(id);
      g.classList.toggle("is-dim", !lit);
      g.classList.toggle("is-lit", lit);
    }
    for (const e of data.edges) {
      const path = edgeEls.get(`${e.from}|${e.to}|${e.kind}`);
      if (!path) continue;
      const lit = keep.has(e.from) && keep.has(e.to);
      path.classList.toggle("is-dim", !lit);
      path.classList.toggle("is-lit", lit);
    }
  }

  function clearDim() {
    nodeEls.forEach((g) => g.classList.remove("is-dim", "is-lit"));
    edgeEls.forEach((p) => p.classList.remove("is-dim", "is-lit"));
  }

  let selected = null;

  function select(id, opts) {
    const n = byId.get(id);
    if (!n) return;
    selected = id;
    for (const [nid, g] of nodeEls) {
      g.classList.toggle("is-selected", nid === id);
    }
    const keep = new Set([id, ...neighbours.get(id)]);
    const theme = data.nodes.find((x) => x.type === "theme");
    if (theme) keep.add(theme.id);
    setDim(keep);
    renderDetail(n);
    if (!opts || opts.hash !== false) {
      try {
        history.replaceState(null, "", `#${encodeURIComponent(id)}`);
      } catch (_) {}
    }
  }

  function clearSelection() {
    selected = null;
    nodeEls.forEach((g) => g.classList.remove("is-selected"));
    clearDim();
    renderDetail(null);
    try {
      history.replaceState(null, "", location.pathname + location.search);
    } catch (_) {}
  }

  function renderDetail(n) {
    const root = document.getElementById("atlas-detail");
    if (!root) return;
    root.innerHTML = "";
    if (!n) {
      delete root.dataset.open;
      const p = document.createElement("p");
      p.className = "muted";
      p.textContent =
        "Click a node to see its evidence. Each claim carries the quote and timestamp that supports it.";
      root.append(p);
      return;
    }
    root.dataset.open = "true";
    const close = document.createElement("button");
    close.type = "button";
    close.className = "detail-close";
    close.setAttribute("aria-label", "Close evidence");
    close.textContent = "×";
    close.addEventListener("click", clearSelection);
    root.append(close);
    const kicker = document.createElement("div");
    kicker.className = "detail-kicker";
    kicker.textContent = n.type;
    const h2 = document.createElement("h2");
    h2.textContent = n.label;
    root.append(kicker, h2);
    if (n.summary) {
      const p = document.createElement("p");
      p.textContent = n.summary;
      root.append(p);
    }
    if (n.speakers) {
      const p = document.createElement("p");
      p.className = "muted";
      p.textContent = n.speakers;
      root.append(p);
    }

    if (Array.isArray(n.evidence) && n.evidence.length) {
      const h3 = document.createElement("h3");
      h3.textContent = "Evidence";
      root.append(h3);
      for (const ev of n.evidence) {
        const q = document.createElement("blockquote");
        q.textContent = `“${ev.quote}”`;
        const cite = document.createElement("span");
        cite.className = "cite";
        if (ev.href) {
          const a = document.createElement("a");
          a.href = ev.href;
          a.textContent = ev.cite;
          cite.append(a);
        } else {
          cite.textContent = ev.cite;
        }
        q.append(cite);
        root.append(q);
      }
    }

    if (n.type === "talk" && n.href) {
      const p = document.createElement("p");
      const a = document.createElement("a");
      a.href = n.href;
      a.textContent = "Open the transcript →";
      p.append(a);
      root.append(p);
    }

    const connected = [...(neighbours.get(n.id) || [])]
      .map((id) => byId.get(id))
      .filter(Boolean);
    if (connected.length) {
      const h3 = document.createElement("h3");
      h3.textContent = "Connected";
      root.append(h3);
      const wrap = document.createElement("div");
      wrap.className = "connectors";
      for (const c of connected) {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = c.label;
        b.addEventListener("click", () => select(c.id));
        wrap.append(b);
      }
      root.append(wrap);
    }

    const add = document.createElement("button");
    add.type = "button";
    add.className = "add-path";
    add.textContent = path.includes(n.id) ? "In your path" : "Add to path";
    add.disabled = path.includes(n.id);
    add.addEventListener("click", () => {
      addToPath(n.id);
      add.textContent = "In your path";
      add.disabled = true;
    });
    root.append(add);
  }

  let path = [];

  function addToPath(id) {
    if (!byId.has(id) || path.includes(id)) return;
    path.push(id);
    renderPath();
  }

  function removeFromPath(id) {
    path = path.filter((x) => x !== id);
    renderPath();
    if (selected === id) renderDetail(byId.get(id));
  }

  function renderPath() {
    const list = document.getElementById("atlas-path-list");
    const empty = document.getElementById("atlas-path-empty");
    if (!list) return;
    list.innerHTML = "";
    if (empty) empty.hidden = path.length > 0;
    path.forEach((id, i) => {
      const n = byId.get(id);
      if (!n) return;
      const li = document.createElement("li");
      li.className = "path-item";
      const num = document.createElement("span");
      num.className = "n";
      num.textContent = String(i + 1).padStart(2, "0");
      const label = document.createElement("span");
      label.textContent = n.label;
      const rm = document.createElement("button");
      rm.type = "button";
      rm.setAttribute("aria-label", `Remove ${n.label}`);
      rm.textContent = "×";
      rm.addEventListener("click", () => removeFromPath(id));
      li.append(num, label, rm);
      list.append(li);
    });
    const copy = document.getElementById("atlas-copy-path");
    if (copy) copy.disabled = path.length === 0;
    const clear = document.getElementById("atlas-clear-path");
    if (clear) clear.disabled = path.length === 0;
  }

  function pathMarkdown() {
    const lines = [`# ${data.title || "Argument atlas"} — reading path`, ""];
    path.forEach((id, i) => {
      const n = byId.get(id);
      if (!n) return;
      lines.push(`${i + 1}. **${n.label}** (${n.type})`);
      if (n.summary) lines.push(`   ${n.summary}`);
      for (const ev of n.evidence || []) {
        lines.push(`   > “${ev.quote}” — ${ev.cite}${ev.href ? ` (${ev.href})` : ""}`);
      }
      lines.push("");
    });
    return lines.join("\n");
  }

  async function copyPath() {
    const text = pathMarkdown();
    try {
      await navigator.clipboard.writeText(text);
      flash("Copied path to clipboard");
    } catch (_) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.append(ta);
      ta.select();
      try {
        document.execCommand("copy");
        flash("Copied path to clipboard");
      } catch (e) {
        flash(text);
      }
      ta.remove();
    }
  }

  function flash(message) {
    const el = document.getElementById("atlas-caption");
    if (!el) return;
    const prev = el.textContent;
    el.textContent = message;
    setTimeout(() => {
      if (el.textContent === message) el.textContent = prev;
    }, 2200);
  }

  function filter(name) {
    document.querySelectorAll("[data-filter]").forEach((b) => {
      b.setAttribute("aria-pressed", b.getAttribute("data-filter") === name ? "true" : "false");
    });
    if (name === "all") {
      clearDim();
      return;
    }
    const keep = new Set();
    if (name === "claims") {
      for (const n of data.nodes) if (["theme", "cluster", "claim"].includes(n.type)) keep.add(n.id);
    } else if (name === "talks") {
      for (const n of data.nodes) if (["theme", "cluster", "claim", "talk"].includes(n.type)) keep.add(n.id);
    } else if (name === "contested") {
      for (const e of data.edges) {
        if (e.kind !== "contests") continue;
        keep.add(e.from);
        keep.add(e.to);
        for (const id of neighbours.get(e.from) || []) keep.add(id);
        for (const id of neighbours.get(e.to) || []) keep.add(id);
      }
      for (const n of data.nodes) if (n.type === "question") keep.add(n.id);
    }
    setDim(keep);
  }

  function setZoom(next) {
    const z = Math.max(0.8, Math.min(1.8, next));
    const w = W / z;
    const h = H / z;
    svg.setAttribute("viewBox", `${CX - w / 2} ${CY - h / 2} ${w} ${h}`);
    svg.dataset.zoom = String(z);
  }

  function stepFocus() {
    if (selected) return;
    const steps = [...document.querySelectorAll("[data-focus]")];
    if (!steps.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const raw = (entry.target.getAttribute("data-focus") || "").trim();
          if (raw === "*" || raw === "") {
            clearDim();
          } else {
            const ids = raw.split(",").map((s) => s.trim()).filter(Boolean);
            const keep = new Set();
            for (const id of ids) {
              keep.add(id);
              for (const n of neighbours.get(id) || []) keep.add(n);
            }
            const theme = data.nodes.find((x) => x.type === "theme");
            if (theme) keep.add(theme.id);
            setDim(keep);
          }
          const caption = document.getElementById("atlas-caption");
          if (caption) caption.textContent = entry.target.getAttribute("data-caption") || "";
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0.01 },
    );
    steps.forEach((s) => io.observe(s));
  }

  drawEdges();
  data.nodes.forEach(drawNode);
  renderDetail(null);
  renderPath();

  svg.addEventListener("click", (ev) => {
    if (ev.target === svg || ev.target === zoomLayer) clearSelection();
  });

  document.querySelectorAll("[data-filter]").forEach((b) => {
    b.addEventListener("click", () => filter(b.getAttribute("data-filter")));
  });
  document.querySelectorAll("[data-zoom]").forEach((b) => {
    b.addEventListener("click", () => {
      const current = Number(svg.dataset.zoom || 1);
      const action = b.getAttribute("data-zoom");
      if (action === "in") setZoom(current + 0.2);
      else if (action === "out") setZoom(current - 0.2);
      else setZoom(1);
    });
  });
  const copy = document.getElementById("atlas-copy-path");
  if (copy) copy.addEventListener("click", copyPath);
  const clear = document.getElementById("atlas-clear-path");
  if (clear)
    clear.addEventListener("click", () => {
      path = [];
      renderPath();
    });

  const hash = decodeURIComponent(location.hash.replace(/^#/, ""));
  if (hash && byId.has(hash)) select(hash, { hash: false });
  stepFocus();
  setZoom(1);
})();
