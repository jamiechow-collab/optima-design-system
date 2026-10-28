// Static sample data and shared page pieces for the Mini-charts and Score cards stories.
import React from 'react';
import { Sparkline, StarReview, LinearGauge, CircularGauge, MiniBarChart, MiniHeatmap } from '../../components/DataVis/MiniCharts';
import { Card } from './chartDocs';

export const SPARK = [6, 8, 5, 5, 7, 9, 8, 6, 7, 11, 18, 15, 17, 12, 14, 9, 8, 6, 7, 5, 4];
export const BARS = [4, 7, 3, 9, 5, 8, null, null];
export const BARS_ALT = [6, 3, 8, 4, 9, null, null, null];

// Position-only values, so a grid is always the same.
export const heat = (rows, cols) => Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (__, c) => ((c % 5) * 3 + r * 2 + ((r * c) % 3)) % 12));

export const Row = ({ children }) => <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'flex-end' }}>{children}</div>;
export const Item = ({ caption, children }) => <Card caption={caption}>{children}</Card>;

// The five mini-charts used in the Score card and Table examples, in the Figma order.
export const miniChartFor = (type) => ({
  bar: <MiniBarChart data={BARS} width={49} />,
  sparkline: <Sparkline data={SPARK} variant="area-gradient" width={52} height={22} />,
  circular: <CircularGauge value={72.8} size="sm" />,
  linear: <LinearGauge value={30} max={100} target={50} />,
  stars: <StarReview value={4} />,
}[type]);

export { Sparkline, StarReview, LinearGauge, CircularGauge, MiniBarChart, MiniHeatmap };
