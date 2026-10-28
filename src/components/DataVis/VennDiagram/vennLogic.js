// Pure logic behind the Venn diagram's channel picker. No React, so a product can reuse it with its own UI.
//
// A product has many channels but the diagram compares at most MAX_SELECTED of them. The backend only needs to return
// *intersection sizes*: how many people are in channel A, in A and B, in A and B and C, and so on. Never user IDs.
//
//   channels: [{ id: 'search', name: 'Search' }, { id: 'social', name: 'Social' }, ...]
//   sizes:    { search: 500, social: 400, 'search+social': 120, 'search+social+email': 40, ... }
//
// A size key is the channel ids in `channels` order, joined with "+" (see intersectionKey). Each size is inclusive:
// 'search+social' is everyone in both Search and Social, including people who are also in Email.

export const MAX_SELECTED = 3;
export const SLOT_LETTERS = ['A', 'B', 'C']; // the circle positions in the diagram: left, right, top

/** The key for a combination of channels, e.g. intersectionKey(['social', 'search'], channels) -> 'search+social'. */
export const intersectionKey = (ids, channels) =>
  [...ids].sort((a, b) => channels.findIndex((c) => c.id === a) - channels.findIndex((c) => c.id === b)).join('+');

/**
 * Turns the inclusive intersection sizes of the selected channels into the exclusive size of each zone of the diagram
 * (inclusion-exclusion). selectedIds are in circle order (A, B, C). Returns { A, B, C, AB, AC, BC, ABC } using only the
 * letters that exist (two channels give { A, B, AB }). Anything that comes out negative (inconsistent data) becomes 0.
 *
 *   A   = size(A) - size(AB) - size(AC) + size(ABC)      AB  = size(AB) - size(ABC)      ABC = size(ABC)
 */
export const zonesFromIntersections = (selectedIds, sizes, channels) => {
  const n = selectedIds.length;
  const inclusive = (mask) => sizes[intersectionKey(selectedIds.filter((_, i) => mask & (1 << i)), channels)] || 0;
  const bits = (mask) => selectedIds.reduce((c, _, i) => c + ((mask >> i) & 1), 0);
  const zones = {};
  for (let mask = 1; mask < 1 << n; mask++) {
    let size = 0;
    for (let sup = mask; sup < 1 << n; sup++) {
      if ((sup & mask) === mask) size += (-1) ** (bits(sup) - bits(mask)) * inclusive(sup);
    }
    zones[SLOT_LETTERS.filter((_, i) => mask & (1 << i)).join('')] = Math.max(size, 0);
  }
  return zones;
};

/**
 * Selection state: `slots` holds one channel id (or null) per circle position, `order` lists the selected ids from the
 * oldest pick to the newest. Rules, used by the legend:
 *  - clicking a selected channel deselects it, except the last one (at least one channel stays selected);
 *  - clicking an unselected channel fills a free circle;
 *  - if all circles are taken it replaces the oldest pick, in the same circle position, so the other circles don't move.
 */
export const initialSelection = (ids, max = MAX_SELECTED) => {
  const picked = ids.slice(0, max);
  return { slots: Array.from({ length: max }, (_, i) => picked[i] ?? null), order: picked };
};

export const toggleChannel = ({ slots, order }, id, max = MAX_SELECTED) => {
  if (slots.includes(id)) {
    if (order.length === 1) return { slots, order };
    return { slots: slots.map((s) => (s === id ? null : s)), order: order.filter((o) => o !== id) };
  }
  const free = slots.indexOf(null);
  if (free !== -1) return { slots: slots.map((s, i) => (i === free ? id : s)), order: [...order, id] };
  const oldest = order[0];
  return { slots: slots.map((s) => (s === oldest ? id : s)), order: [...order.slice(1), id] };
};

/** The selected ids in circle order (A, B, C), without the empty positions. */
export const selectedIds = ({ slots }) => slots.filter(Boolean);
