// Pure layout for the Sankey diagram (no React), so a product can reuse it with its own rendering.
//
//   nodes: [{ id, name }]                         links: [{ source, target, value }]   (source / target are node ids)
//
// Nodes sit in columns: a node's column is the longest chain of links leading to it, and nodes with nothing after them
// are pulled to the last column. Heights and link widths share one scale (value -> px), so every column uses the
// same px-per-unit and columns with fewer nodes are centred. Nodes are re-ordered inside each column to reduce crossing
// links, and each link is a ribbon whose width is its value.

const sum = (items, pick) => items.reduce((s, i) => s + pick(i), 0);

export const layoutSankey = ({ nodes, links, width, height, left = 0, right = 0, nodeWidth = 12, nodePadding = 12 }) => {
  const index = new Map(nodes.map((n, i) => [n.id, i]));
  const valid = links.filter((l) => l.value > 0 && index.has(l.source) && index.has(l.target) && l.source !== l.target);

  const items = nodes.map((n, i) => ({ ...n, i, colourIndex: n.colour ?? i, column: 0, y: 0, h: 0, out: [], in: [] }));
  const edges = valid.map((l, k) => ({ ...l, id: `${l.source}->${l.target}`, k, s: items[index.get(l.source)], t: items[index.get(l.target)] }));
  edges.forEach((e) => { e.s.out.push(e); e.t.in.push(e); });

  // columns: longest path from a source (the loop count also stops cycles from running forever)
  for (let pass = 0; pass < items.length; pass++) {
    let changed = false;
    edges.forEach((e) => { if (e.t.column < e.s.column + 1) { e.t.column = e.s.column + 1; changed = true; } });
    if (!changed) break;
  }
  const last = Math.max(0, ...items.map((n) => n.column));
  items.forEach((n) => { if (n.out.length === 0 && n.in.length > 0) n.column = last; });
  const columns = Array.from({ length: last + 1 }, (_, c) => items.filter((n) => n.column === c));

  items.forEach((n) => {
    n.inValue = sum(n.in, (e) => e.value);
    n.outValue = sum(n.out, (e) => e.value);
    n.value = Math.max(n.inValue, n.outValue);
  });

  const usable = Math.max(width - left - right - nodeWidth, 0);
  items.forEach((n) => { n.x = left + (last === 0 ? usable / 2 : (n.column * usable) / last); n.w = nodeWidth; });

  // one scale for every column: the tightest column decides
  const scale = Math.min(...columns.filter((c) => c.length).map((c) => (height - nodePadding * (c.length - 1)) / (sum(c, (n) => n.value) || 1)));
  const place = () => {
    columns.forEach((col) => {
      const total = sum(col, (n) => n.value * scale) + nodePadding * Math.max(col.length - 1, 0);
      let y = (height - total) / 2;
      col.forEach((n) => { n.h = n.value * scale; n.y = y; y += n.h + nodePadding; });
    });
  };
  place();

  // order each column by the weighted centre of the nodes it links to, sweeping right then left
  const centre = (n) => n.y + n.h / 2;
  const sweep = (cols, side) => {
    cols.forEach((col) => {
      const bary = (n) => {
        const ends = n[side];
        const w = sum(ends, (e) => e.value);
        return w ? sum(ends, (e) => centre(side === 'in' ? e.s : e.t) * e.value) / w : centre(n);
      };
      const keyed = col.map((n) => [bary(n), n]);
      keyed.sort((a, b) => a[0] - b[0]);
      keyed.forEach(([, n], k) => { col[k] = n; });
    });
    place();
  };
  for (let pass = 0; pass < 6; pass++) {
    sweep(columns.slice(1), 'in');
    sweep(columns.slice(0, -1).reverse(), 'out');
  }

  // stack the links along each node edge, ordered by where they go, so ribbons leave and arrive without twisting
  items.forEach((n) => {
    let sy = n.y;
    [...n.out].sort((a, b) => centre(a.t) - centre(b.t)).forEach((e) => { e.sy = sy; sy += e.value * scale; });
    let ty = n.y;
    [...n.in].sort((a, b) => centre(a.s) - centre(b.s)).forEach((e) => { e.ty = ty; ty += e.value * scale; });
  });
  edges.forEach((e) => {
    e.w = e.value * scale;
    const x0 = e.s.x + nodeWidth;
    const x1 = e.t.x;
    const xm = (x0 + x1) / 2;
    e.path = `M${x0},${e.sy} C${xm},${e.sy} ${xm},${e.ty} ${x1},${e.ty} L${x1},${e.ty + e.w} C${xm},${e.ty + e.w} ${xm},${e.sy + e.w} ${x0},${e.sy + e.w} Z`;
  });

  return { nodes: items, links: edges, columns: last + 1, scale };
};

/** Nodes and links that light up when `focus` is hovered: { node: id } lights a node's own links and the nodes at their ends; { link: id } lights that link and its two nodes. */
export const focusSet = (layout, focus) => {
  if (!focus) return null;
  const nodes = new Set();
  const links = new Set();
  if (focus.node !== undefined) {
    nodes.add(focus.node);
    layout.links.forEach((e) => {
      if (e.s.id === focus.node || e.t.id === focus.node) { links.add(e.id); nodes.add(e.s.id); nodes.add(e.t.id); }
    });
  } else {
    const e = layout.links.find((l) => l.id === focus.link);
    if (e) { links.add(e.id); nodes.add(e.s.id); nodes.add(e.t.id); }
  }
  return { nodes, links };
};
