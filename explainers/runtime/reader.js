/* Fixed reader-guide runtime. Bind behavior to the data attributes; style the
   rg-* classes in the page. Do not fork this file per explainer. */
(function () {
  "use strict";

  var dataEl = document.getElementById("reader-data");
  if (!dataEl) return;
  var DATA;
  try { DATA = JSON.parse(dataEl.textContent || "{}"); } catch (e) { return; }

  var terms = DATA.terms || {};
  var questions = DATA.questions || [];
  var meta = DATA.meta || {};
  var bySection = {};
  questions.forEach(function (q) { (bySection[q.section] = bySection[q.section] || []).push(q); });

  var panel = document.getElementById("reader-panel");
  if (!panel) {
    panel = document.createElement("aside");
    panel.id = "reader-panel";
    panel.setAttribute("aria-label", "Reader guide");
    document.body.appendChild(panel);
  }

  panel.innerHTML = [
    '<div class="rg-tabs" role="tablist">',
    '<button class="rg-tab" role="tab" data-rg-tab="terms" aria-selected="true">Terms</button>',
    '<button class="rg-tab" role="tab" data-rg-tab="ask" aria-selected="false">Ask</button>',
    "</div>",
    '<div class="rg-pane" data-rg-pane="terms">',
    '<input class="rg-search" type="search" placeholder="Find a term…" aria-label="Find a term">',
    '<div class="rg-terms"></div>',
    '<article class="rg-detail"><p class="rg-hint">Click a dotted term in the text, or pick one above.</p></article>',
    "</div>",
    '<div class="rg-pane" data-rg-pane="ask" hidden>',
    '<div class="rg-section">Section</div>',
    '<div class="rg-questions"></div>',
    '<textarea class="rg-input" rows="3" placeholder="Ask about this section…" aria-label="Ask about this section"></textarea>',
    '<button class="rg-ask" type="button">Ask</button>',
    '<div class="rg-answer" aria-live="polite"></div>',
    "</div>"
  ].join("");

  var q = function (sel) { return panel.querySelector(sel); };
  var current = { slug: "", title: "" };

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function showTab(name) {
    panel.querySelectorAll(".rg-tab").forEach(function (b) {
      b.setAttribute("aria-selected", b.getAttribute("data-rg-tab") === name ? "true" : "false");
    });
    panel.querySelectorAll(".rg-pane").forEach(function (p) {
      p.hidden = p.getAttribute("data-rg-pane") !== name;
    });
  }
  panel.querySelectorAll(".rg-tab").forEach(function (b) {
    b.addEventListener("click", function () { showTab(b.getAttribute("data-rg-tab")); });
  });

  function termKeys() {
    return Object.keys(terms).sort(function (a, b) { return a.localeCompare(b); });
  }

  function renderTerms(filter) {
    var list = q(".rg-terms");
    list.innerHTML = "";
    var needle = (filter || "").toLowerCase();
    termKeys().filter(function (t) {
      return !needle || t.toLowerCase().indexOf(needle) !== -1;
    }).forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "rg-term";
      b.textContent = t;
      b.addEventListener("click", function () { showTerm(t); });
      list.appendChild(b);
    });
  }

  function showTerm(key) {
    var lower = String(key || "").toLowerCase();
    var real = Object.keys(terms).filter(function (t) { return t.toLowerCase() === lower; })[0];
    var detail = q(".rg-detail");
    if (!real) {
      detail.innerHTML = '<p class="rg-hint">No entry for “' + escapeHtml(key) + '”. Ask about it below.</p>';
      showTab("terms");
      return;
    }
    var t = terms[real] || {};
    var see = (t.see || []).map(function (s) {
      return '<button type="button" class="rg-term" data-see="' + escapeHtml(s) + '">' + escapeHtml(s) + "</button>";
    }).join(" ");
    detail.innerHTML =
      "<h3>" + escapeHtml(real) + "</h3>" +
      "<p>" + escapeHtml(t.definition || "") + "</p>" +
      (t.why ? "<p>" + escapeHtml(t.why) + "</p>" : "") +
      (t.source ? '<p class="rg-src">Source: ' + escapeHtml(t.source) + "</p>" : "") +
      (see ? '<p class="rg-see">See: ' + see + "</p>" : "");
    detail.querySelectorAll("[data-see]").forEach(function (b) {
      b.addEventListener("click", function () { showTerm(b.getAttribute("data-see")); });
    });
    showTab("terms");
    panel.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  q(".rg-search").addEventListener("input", function (e) { renderTerms(e.target.value); });
  renderTerms("");

  document.addEventListener("click", function (e) {
    var el = e.target && e.target.closest ? e.target.closest("[data-term]") : null;
    if (!el) return;
    e.preventDefault();
    showTerm(el.getAttribute("data-term"));
  });

  function chapters() {
    var found = [].slice.call(document.querySelectorAll("[data-chapter]"));
    if (found.length) {
      return found.map(function (n) {
        return {
          el: n,
          slug: n.getAttribute("data-chapter"),
          title: n.getAttribute("data-title") || (n.querySelector("h2, h1") || n).textContent.trim()
        };
      });
    }
    return [].slice.call(document.querySelectorAll("#reader-doc h2[id]")).map(function (n) {
      return { el: n, slug: n.id, title: n.textContent.trim() };
    });
  }

  function contextFor(chapter) {
    return (chapter ? chapter.el.textContent : "").replace(/\s+/g, " ").trim().slice(0, 3000);
  }

  function setSection(slug, title) {
    if (current.slug === slug) return;
    current = { slug: slug, title: title };
    q(".rg-section").textContent = title || "Section";
    var list = q(".rg-questions");
    list.innerHTML = "";
    var qs = bySection[slug] || [];
    if (!qs.length) {
      var hint = document.createElement("div");
      hint.className = "rg-hint";
      hint.textContent = "Ask anything about this section.";
      list.appendChild(hint);
    }
    qs.forEach(function (item) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "rg-question";
      b.textContent = item.q;
      b.addEventListener("click", function () {
        q(".rg-answer").innerHTML =
          "<p>" + escapeHtml(item.a) + "</p>" +
          ((item.cites || []).length ? '<span class="rg-cite">' + item.cites.map(escapeHtml).join(" · ") + "</span>" : "");
        q(".rg-input").value = item.q;
      });
      list.appendChild(b);
    });
  }

  var ch = chapters();
  if (ch.length) {
    setSection(ch[0].slug, ch[0].title);
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var hit = ch.filter(function (c) { return c.el === entry.target; })[0];
          if (hit) setSection(hit.slug, hit.title);
        });
      }, { rootMargin: "-15% 0px -70% 0px" });
      ch.forEach(function (c) { io.observe(c.el); });
    }
  }

  function currentChapter() {
    return ch.filter(function (c) { return c.slug === current.slug; })[0] || ch[0];
  }

  async function ask(question) {
    var answer = q(".rg-answer");
    answer.textContent = "Asking…";
    var payload = {
      question: question,
      section: current.title,
      context: contextFor(currentChapter()),
      title: meta.title || document.title
    };
    if (location.protocol === "http:" || location.protocol === "https:") {
      try {
        var res = await fetch("/ask", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload)
        });
        var data = await res.json();
        answer.textContent = data.answer || data.error || "No answer.";
        return;
      } catch (e) { /* fall through to copy */ }
    }
    var prompt =
      'I am reading "' + (meta.title || document.title) + '".\n\n' +
      (current.title ? "Section: " + current.title + "\n\n" : "") +
      (payload.context ? "Text in view:\n" + payload.context + "\n\n" : "") +
      "Question: " + question + "\n\n" +
      "Answer from the recorded talks, citing the talk and timestamp. Say when the corpus does not cover it.";
    try {
      await navigator.clipboard.writeText(prompt);
      answer.textContent = "Copied a ready-made prompt to the clipboard. Paste it into the agent chat.";
    } catch (e) {
      answer.textContent = prompt;
    }
  }

  q(".rg-ask").addEventListener("click", function () {
    var text = q(".rg-input").value.trim();
    if (text) ask(text);
  });
  q(".rg-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      var text = q(".rg-input").value.trim();
      if (text) ask(text);
    }
  });
})();
