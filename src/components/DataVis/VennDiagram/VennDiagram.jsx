import React, { useId, useMemo, useRef, useState } from 'react';
import { onColour } from '../chartTheme';
import { ChartTooltip } from '../ChartTooltip';
import { ChartLegend } from '../ChartLegend';
import { CursorTooltip } from '../CursorTooltip';
import { useChartSize } from '../useChartSize';
import { datavisVar } from '../BarChart/BarChart';
import { datavisCategorical, datavisSequential } from '../../../tokens/datavis-colors';
import typography from '../../../tokens/typography';
import { MAX_SELECTED, SLOT_LETTERS, initialSelection, selectedIds, toggleChannel, zonesFromIntersections } from './vennLogic';

// Layouts in a 232 x 193 box. Three circles (A left, B right, C top) are the Figma layout, measured from the SVG
// assets; one and two circles are not in Figma yet, so they are drawn to match its sizes and need design review.
const BOX = { w: 232, h: 193 };
const LAYOUTS = {
  3: {
    overlap: { A: { x: 69, y: 124, r: 69 }, B: { x: 168.5, y: 124, r: 63 }, C: { x: 121, y: 58.5, r: 58.5 } },
    apart: { A: { x: 52, y: 141, r: 51 }, B: { x: 186, y: 142, r: 44.5 }, C: { x: 116, y: 54, r: 52 } },
  },
  2: {
    overlap: { A: { x: 84, y: 96.5, r: 78 }, B: { x: 160, y: 96.5, r: 66 } },
    apart: { A: { x: 62, y: 96.5, r: 56 }, B: { x: 176, y: 96.5, r: 48 } },
  },
  1: { overlap: { A: { x: 116, y: 96.5, r: 80 } }, apart: { A: { x: 116, y: 96.5, r: 80 } } },
};
const MIN_LABEL_AREA = 1000; // a zone smaller than this (px² at natural size) has no percentage, like the centre zone in Figma
const bodyRegular = typography.body.regular; // Body/regular: Inter 400 14/20, for the percentages

// A channel's colour is its group 2 colour. An overlap is drawn as a darker shade of one of its circles (the darkening
// factors are read from Figma) and the zone shared by all three is Charcoal/900.
const GROUP = 'group2';
const hexOf = (i) => datavisCategorical[GROUP][i % datavisCategorical[GROUP].length].default;
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const toHex = (c) => `#${c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
const darken = (hex, f) => toHex(rgb(hex).map((v) => v * f));
const lighten = (hex, k) => toHex(rgb(hex).map((v) => 255 * (1 - k) + v * k)); // k = share of the colour kept over white
const OWNER = { AB: ['A', 0.384], BC: ['B', 0.514], AC: ['C', 0.585] }; // overlap -> circle whose colour it darkens, factor
const CENTRE = datavisSequential.charcoal[900]; // Charcoal/900
const CENTRE_VAR = `var(--color-datavis-charcoal-900, ${CENTRE})`;

const inside = (c, x, y) => (x - c.x) ** 2 + (y - c.y) ** 2 <= c.r ** 2;
const zoneAt = (circles, x, y) => Object.keys(circles).filter((s) => inside(circles[s], x, y)).join('') || null;

// every non-empty combination of the circles, as zone keys: A, B, C, AB, AC, BC, ABC
const zoneKeys = (letters) => {
  const out = [];
  for (let mask = 1; mask < 1 << letters.length; mask++) out.push(letters.filter((_, i) => mask & (1 << i)).join(''));
  return out.sort((a, b) => a.length - b.length);
};

// centroid and area of every zone, sampled on a 1px grid
const measure = (circles) => {
  const zones = zoneKeys(Object.keys(circles));
  const acc = Object.fromEntries(zones.map((z) => [z, { x: 0, y: 0, n: 0 }]));
  for (let y = 0; y < BOX.h; y++) {
    for (let x = 0; x < BOX.w; x++) {
      const z = zoneAt(circles, x + 0.5, y + 0.5);
      if (z) { acc[z].x += x + 0.5; acc[z].y += y + 0.5; acc[z].n += 1; }
    }
  }
  return Object.fromEntries(zones.map((z) => [z, acc[z].n ? { x: acc[z].x / acc[z].n, y: acc[z].y / acc[z].n, area: acc[z].n } : null]));
};

/**
 * Hand-built SVG Venn diagram of up to three sets and their zones, in the Figma layout.
 *
 * Two ways to give it data:
 *  - data: { A, B, C, AB, AC, BC, ABC } — the size of each zone ("A" is only in set A, "AB" is in A and B, ...), with
 *    names / zoneLabel for the labels. Always three circles.
 *  - channels + sizes — any number of channels; the diagram compares up to three of them (see vennLogic.js for the
 *    size format and the selection rules). showLegend adds a legend that lets users switch channels: click to
 *    select or deselect, and picking a fourth replaces the oldest pick. onSelectionChange(ids) reports the picks.
 *
 * Values are shown as a share of everything in the compared zones, so they add up to 100%. The layout is fixed; the
 * numbers only drive labels and tooltips. When every overlap is 0 the circles are drawn apart.
 * Hovering a zone keeps it in its colour and switches the other zones to their dismissed colours. Hovering the part of
 * a circle with no overlap shows "Total" (the whole set) and the zone; an overlap shows just its own share.
 */
export const VennDiagram = ({
  data,
  names = SLOT_LETTERS,
  zoneLabel = 'Zone',
  channels,
  sizes,
  defaultSelected,
  onSelectionChange,
  showLegend = false,
  showPercentage = true,
  width: widthProp,
  height: heightProp,
  padding = 24,
  maxScale = Infinity, // the diagram fits its container, up or down; pass 1 to stop it growing past its natural 232 x 193 size
  showTooltip = true,
}) => {
  const uid = useId().replace(/:/g, '');
  const wrapRef = useRef(null);
  const legendMode = !!channels && showLegend;
  // with a legend the chart is whatever height is left above it, so it is always measured
  const { width, height } = useChartSize(wrapRef, widthProp, legendMode ? undefined : heightProp, { w: 405, h: 280 });
  const [hover, setHover] = useState(null);
  const [pointer, setPointer] = useState(null);
  const [selection, setSelection] = useState(() => initialSelection(defaultSelected ?? (channels || []).map((c) => c.id)));

  // what is compared: the selected channels (channel mode) or the three sets in `data`
  const picked = channels ? selectedIds(selection) : [];
  const chIndex = (id) => channels.findIndex((c) => c.id === id);
  const letters = channels ? SLOT_LETTERS.slice(0, picked.length) : SLOT_LETTERS;
  const zonesData = channels ? zonesFromIntersections(picked, sizes, channels) : data;
  const colourIdx = channels ? picked.map(chIndex) : [0, 1, 2]; // colour index of each circle
  const setNames = channels ? picked.map((id) => channels[chIndex(id)].name) : names;

  const n = letters.length;
  const keys = zoneKeys(letters);
  const overlaps = keys.filter((z) => z.length > 1);
  const apart = overlaps.length > 0 && overlaps.every((z) => !zonesData[z]) && n > 1;
  const circles = LAYOUTS[n][apart ? 'apart' : 'overlap'];
  const geo = useMemo(() => measure(circles), [n, apart]); // eslint-disable-line react-hooks/exhaustive-deps

  const sum = keys.reduce((s, z) => s + (zonesData[z] || 0), 0) || 1;
  const share = (z) => Math.round(((zonesData[z] || 0) / sum) * 100);
  const total = (set) => Math.round((keys.filter((z) => z.includes(set)).reduce((s, z) => s + (zonesData[z] || 0), 0) / sum) * 100);
  const nameOf = (z) => {
    const parts = z.split('').map((s) => setNames[SLOT_LETTERS.indexOf(s)]);
    return channels ? parts.join(' + ') : `${zoneLabel} ${parts.join('+')}`;
  };

  const zoneColour = (z, dismissed) => {
    const idxOf = (letter) => colourIdx[SLOT_LETTERS.indexOf(letter)];
    if (z.length === 1) return datavisVar(idxOf(z), GROUP, dismissed ? 'dismissed' : 'default');
    if (z === 'ABC') return dismissed ? lighten(CENTRE, 0.5) : CENTRE_VAR;
    const [owner, factor] = n === 2 ? ['A', 0.45] : OWNER[z];
    return dismissed ? lighten(hexOf(idxOf(owner)), 0.5) : darken(hexOf(idxOf(owner)), factor);
  };
  const colourOf = (z) => zoneColour(z, hover !== null && hover !== z);
  // hex of the zone as drawn, to pick readable percentage text
  const zoneHex = (z) => {
    const dismissed = hover !== null && hover !== z;
    if (z.length === 1) return datavisCategorical[GROUP][colourIdx[SLOT_LETTERS.indexOf(z)] % datavisCategorical[GROUP].length][dismissed ? 'dismissed' : 'default'];
    if (z === 'ABC') return dismissed ? lighten(CENTRE, 0.5) : CENTRE;
    const [owner, factor] = n === 2 ? ['A', 0.45] : OWNER[z];
    const base = hexOf(colourIdx[SLOT_LETTERS.indexOf(owner)]);
    return dismissed ? lighten(base, 0.5) : darken(base, factor);
  };

  const scale = Math.min(Math.max(Math.min((width - padding * 2) / BOX.w, (height - padding * 2) / BOX.h), 0.3), maxScale);
  const ox = (width - BOX.w * scale) / 2;
  const oy = (height - BOX.h * scale) / 2;

  const tooltipProps = () => {
    const z = hover;
    const item = { label: nameOf(z), value: `${share(z)}%`, colour: zoneColour(z, false), shape: 'filled' };
    // a circle's own zone also shows the whole set's total, when it differs
    if (z.length === 1 && total(z) !== share(z)) return { header: 'Total', headerValue: `${total(z)}%`, items: [item] };
    return { items: [item] };
  };

  const legendItems = channels
    ? channels.map((c, i) => ({ label: c.name, colour: datavisVar(i, GROUP, 'default'), shape: 'filled', deselected: !picked.includes(c.id) }))
    : [];
  const toggle = (i) => {
    const next = toggleChannel(selection, channels[i].id);
    setSelection(next);
    setHover(null);
    if (onSelectionChange) onSelectionChange(selectedIds(next));
  };

  const members = (z) => z.split('');
  const fixedSize = { width: widthProp !== undefined ? widthProp : '100%', height: heightProp !== undefined ? heightProp : '100%' };

  return (
    <div style={{ ...fixedSize, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg, 16px)' }}>
      <div ref={wrapRef} style={{ position: 'relative', flex: 1, minHeight: 0, width: '100%' }}>
        <svg
          width={width}
          height={height}
          role="img"
          aria-label="Venn diagram"
          style={{ display: 'block' }}
          onMouseMove={(e) => {
            const r = wrapRef.current.getBoundingClientRect();
            const px = e.clientX - r.left;
            const py = e.clientY - r.top;
            const z = zoneAt(circles, (px - ox) / scale, (py - oy) / scale);
            setPointer(z ? { x: px, y: py } : null);
            setHover(z);
          }}
          onMouseLeave={() => { setHover(null); setPointer(null); }}
        >
          <g transform={`translate(${ox} ${oy}) scale(${scale})`}>
            <defs>
              {letters.map((s) => (
                <clipPath key={s} id={`${uid}-c${s}`}><circle cx={circles[s].x} cy={circles[s].y} r={circles[s].r} /></clipPath>
              ))}
              {keys.map((z) => (
                // white where the zone is (inside every member circle), black over the circles it must not cover
                <mask key={z} id={`${uid}-m${z}`} maskUnits="userSpaceOnUse" x="0" y="0" width={BOX.w} height={BOX.h}>
                  {members(z).slice(1).reduceRight(
                    (child, s) => <g clipPath={`url(#${uid}-c${s})`}>{child}</g>,
                    <circle cx={circles[members(z)[0]].x} cy={circles[members(z)[0]].y} r={circles[members(z)[0]].r} fill="#fff" />
                  )}
                  {letters.filter((s) => !z.includes(s)).map((s) => (
                    <circle key={s} cx={circles[s].x} cy={circles[s].y} r={circles[s].r} fill="#000" />
                  ))}
                </mask>
              ))}
            </defs>
            {keys.map((z) => (
              <rect key={z} width={BOX.w} height={BOX.h} fill={colourOf(z)} mask={`url(#${uid}-m${z})`} pointerEvents="none" />
            ))}
            {/* white outlines between the zones */}
            {letters.map((s) => (
              <circle key={s} cx={circles[s].x} cy={circles[s].y} r={circles[s].r} fill="none" stroke="var(--color-core-bg-secondary, #fff)" strokeWidth={1} pointerEvents="none" />
            ))}
            {showPercentage &&
              keys.map((z) =>
                geo[z] && geo[z].area >= MIN_LABEL_AREA ? (
                  <text key={z} x={geo[z].x} y={geo[z].y} textAnchor="middle" dominantBaseline="central" pointerEvents="none" style={{ fontFamily: bodyRegular.fontFamily, fontWeight: bodyRegular.fontWeight, fontSize: bodyRegular.fontSize, fill: onColour(zoneHex(z)) }}>
                    {share(z)}%
                  </text>
                ) : null
              )}
          </g>
        </svg>
        {showTooltip && hover && pointer && (
          <CursorTooltip pointer={pointer} bounds={{ width, height }}>
            <ChartTooltip {...tooltipProps()} />
          </CursorTooltip>
        )}
      </div>
      {legendMode && (
        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
          <ChartLegend items={legendItems} onToggle={toggle} />
        </div>
      )}
    </div>
  );
};

export { MAX_SELECTED };
export default VennDiagram;
