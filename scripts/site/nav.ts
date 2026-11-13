// The one top bar every page in this build shows. render-pages.ts and
// render-site.ts use topnav(); the talk runtime (stories/runtime/talk.js) builds
// the same links in the browser. Keep the three in step.
//
// `up` is the path from the page back to the repo root ("", "../", "../../").

export type Section = "themes" | "talks" | "people" | "schedule";

export const SECTIONS: Array<[Section, string, string]> = [
  ["themes", "Themes", "index.html"],
  ["talks", "Talks", "site/talks/index.html"],
  ["people", "People", "site/people.html"],
  ["schedule", "Schedule", "site/schedule.html"],
];

export const topnav = (active: Section | null, up: string, brand = "AIE Code ’26"): string =>
  `<nav class="topnav" aria-label="Site"><a class="brand" href="${up}index.html">${brand}<span class="brand-badge">Archive</span></a>${SECTIONS.map(
    ([key, label, href]) => `<a href="${up}${href}"${key === active ? ' aria-current="page"' : ""}>${label}</a>`,
  ).join("")}</nav>`;
