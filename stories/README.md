# Stories

The fixed runtime for talk pages: a sticky visual rail, scrolling copy, and a
collapse control. The model composes the page; this runtime only follows the
section in view.

```
stories/runtime/talk.css   layout, cards, mobile, print
stories/runtime/talk.js    active visual, caption, progress, collapse
```

See [`TALKS.md`](../TALKS.md) for the page contract and the talk pipeline. A talk
page lives at `talks/<slug>/experience/` and links the runtime with
`../../../stories/runtime/talk.js` and `talk.css`.
