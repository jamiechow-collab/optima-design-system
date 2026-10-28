import React, { useMemo, useRef, useState } from 'react';
import { chartText } from '../chartTheme';
import { ChartTooltip } from '../ChartTooltip';
import { CursorTooltip } from '../CursorTooltip';
import { useChartSize } from '../useChartSize';
import { datavisVar } from '../BarChart/BarChart';
import typography from '../../../tokens/typography';
import { layoutSankey, focusSet } from './sankeyLayout';

const caption = typography.caption.regular; // Caption/regular: Inter 12/16, for the node labels
const GROUP = 'group2';
const LABEL_GAP = 8; // between a node and its label
const CHAR = 6.4; // average label character width at 12px, to size the side margins
const V_PAD = 8; // room above and below the nodes

/**
 * Hand-built SVG Sankey (alluvial) diagram: nodes in columns joined by ribbons whose width is the flow between them.
 *
 * nodes: [{ id, name, colour? }] — colour is a group 2 colour index; it defaults to the node's position in the list.
 * links: [{ source, target, value }] — source / target are node ids. Columns follow the flow (see sankeyLayout.js).
 *
 * Design follows the Carbon alluvial guidance, with this design system's colours and hover rule:
 *  - nodes are labelled directly (no legend): the first column's labels sit left, the last column's right, the middle
 *    ones beside their node; showValues adds the value to each label;
 *  - nodes always use their default colour; ribbons take their source node's colour and rest in its dismissed colour,
 *    so the nodes lead;
 *  - hovering a node, or a ribbon, lights the flow it belongs to: those ribbons switch to the default colour and the
 *    rest stay dismissed;
 *  - the tooltip lists a node's outgoing flows or a ribbon's share of both of its nodes.
 * Flow only: a Sankey does not show a relationship between nodes that are not directly linked.
 */
export const SankeyChart = ({
  nodes,
  links,
  showValues = false,
  formatValue = (v) => v.toLocaleString(),
  nodeWidth = 12,
  nodePadding = 12,
  width: widthProp,
  height: heightProp,
  showTooltip = true,
}) => {
  const wrapRef = useRef(null);
  const { width, height } = useChartSize(wrapRef, widthProp, heightProp, { w: 540, h: 320 });
  const [hover, setHover] = useState(null); // { node: id } | { link: id }
  const [pointer, setPointer] = useState(null);

  // the side margins hold the first column's labels (left) and the last column's (right)
  const labelText = (n) => (showValues ? `${n.name}  ${formatValue(n.value)}` : n.name);
  const sizeOf = useMemo(() => {
    const pre = layoutSankey({ nodes, links, width: 100, height: 100, nodeWidth, nodePadding });
    const longest = (col) => Math.max(0, ...pre.nodes.filter((n) => n.column === col).map((n) => labelText(n).length)) * CHAR + LABEL_GAP;
    return { left: Math.min(longest(0), width * 0.3), right: Math.min(longest(pre.columns - 1), width * 0.3) };
  }, [nodes, links, showValues, nodeWidth, nodePadding, width]); // eslint-disable-line react-hooks/exhaustive-deps

  const layout = useMemo(
    () => layoutSankey({ nodes, links, width, height: Math.max(height - V_PAD * 2, 40), left: sizeOf.left, right: sizeOf.right, nodeWidth, nodePadding }),
    [nodes, links, width, height, sizeOf, nodeWidth, nodePadding]
  );
  const lit = focusSet(layout, hover);

  // ribbons rest in their source's dismissed colour; the lit ones take its default colour
  const linkState = (e) => (lit && lit.links.has(e.id) ? 'default' : 'dismissed');

  const tooltipProps = () => {
    if (hover.node !== undefined) {
      const n = layout.nodes.find((x) => x.id === hover.node);
      const items = n.out.length
        ? n.out.map((e) => ({ label: e.t.name, value: formatValue(e.value), colour: datavisVar(e.t.colourIndex, GROUP, 'default'), shape: 'filled' }))
        : n.in.map((e) => ({ label: e.s.name, value: formatValue(e.value), colour: datavisVar(e.s.colourIndex, GROUP, 'default'), shape: 'filled' }));
      return { header: n.name, headerValue: formatValue(n.value), items };
    }
    const e = layout.links.find((x) => x.id === hover.link);
    const pct = (v, of) => `${Math.round((v / (of || 1)) * 100)}%`;
    return {
      header: `${e.s.name} → ${e.t.name}`,
      headerValue: formatValue(e.value),
      items: [
        { label: `Share of ${e.s.name}`, value: pct(e.value, e.s.outValue), swatch: false },
        { label: `Share of ${e.t.name}`, value: pct(e.value, e.t.inValue), swatch: false },
      ],
    };
  };

  // labels are Caption/regular in colour/text/primary; the value after a label is Caption/regular in colour/text/disabled
  const text = { fontFamily: caption.fontFamily, fontWeight: caption.fontWeight, fontSize: caption.fontSize, fill: chartText.primary };
  const move = (e, focus) => {
    const r = wrapRef.current.getBoundingClientRect();
    setPointer({ x: e.clientX - r.left, y: e.clientY - r.top });
    setHover(focus);
  };
  const leave = () => { setHover(null); setPointer(null); };

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: widthProp !== undefined ? widthProp : '100%', height: heightProp !== undefined ? heightProp : '100%' }}>
      <svg width={width} height={height} role="img" aria-label="Sankey diagram" style={{ display: 'block' }}>
        <g transform={`translate(0 ${V_PAD})`}>
          {layout.links.map((e) => (
            <path
              key={e.id}
              d={e.path}
              fill={datavisVar(e.s.colourIndex, GROUP, linkState(e))}
              onMouseMove={(ev) => move(ev, { link: e.id })}
              onMouseLeave={leave}
            />
          ))}
          {layout.nodes.map((n) => (
            <rect
              key={n.id}
              x={n.x}
              y={n.y}
              width={n.w}
              height={Math.max(n.h, 1)}
              fill={datavisVar(n.colourIndex, GROUP, 'default')}
              onMouseMove={(ev) => move(ev, { node: n.id })}
              onMouseLeave={leave}
            />
          ))}
          {layout.nodes.map((n) => {
            const toLeft = n.column === 0 && layout.columns > 1;
            const x = toLeft ? n.x - LABEL_GAP : n.x + n.w + LABEL_GAP;
            return (
              <text
                key={`l${n.id}`}
                x={x}
                y={n.y + n.h / 2}
                textAnchor={toLeft ? 'end' : 'start'}
                dominantBaseline="central"
                pointerEvents="none"
                style={text}
              >
                {n.name}
                {showValues && <tspan style={{ fill: chartText.label }}>{`  ${formatValue(n.value)}`}</tspan>}
              </text>
            );
          })}
        </g>
      </svg>
      {showTooltip && hover && pointer && (
        <CursorTooltip pointer={pointer} bounds={{ width, height }}>
          <ChartTooltip {...tooltipProps()} />
        </CursorTooltip>
      )}
    </div>
  );
};

export default SankeyChart;
