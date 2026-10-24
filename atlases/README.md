# Atlases

An argument atlas is a map of a conference's claims. Nodes are themes, clusters,
claims, talks, and questions; edges are supports, contests, refines, and asks.
Every claim carries a verbatim quote and a talk timestamp. The reader can follow
a guided scroll, explore the graph, or assemble a reading path.

```
atlases/<slug>/
  atlas.json     nodes, edges, evidence
  page.html      composed shell and argument steps
  index.html     bundled
runtime/         fixed atlas.js + atlas.css
```

Build one with `/atlas`. The model composes `page.html` against
[`design.md`](../design.md); the bundle injects the graph and links the runtime:

```bash
bun scripts/bundle-atlas.ts atlases/<slug>/page.html
bun scripts/validate-atlas.ts atlases/<slug>/index.html
bun scripts/explainer-server.ts --root . --dir atlases/<slug>
```

The validator checks that every claim has evidence, every quote is verbatim,
every timestamp is a section heading, every talk resolves, and every node
reaches the theme.

In the template, `atlases/<slug>/` is part of the conference build and
gitignored; `atlases/runtime/` is shared and tracked. A build deletes the
`conference build data` fence in `.gitignore`, so its atlases are tracked.
