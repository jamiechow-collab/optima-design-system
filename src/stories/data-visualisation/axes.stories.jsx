import React, { useEffect, useRef, useState } from 'react';
import { ChartAxes } from '../../components/DataVis/ChartAxes';
import { seriesColour } from '../../components/DataVis/chartTheme';
import { Page, Heading, Body, Section, Specimen, Row, SubHeading, Bullets } from './chartDesignDocs';

export default {
  title: 'Data Visualisation/Chart design/Axes and label',
  parameters: { layout: 'padded' },
};

const W = 540;
const H = 320;
const L = 'label';
const seven = Array.from({ length: 7 }, () => L);
const rows = (n = 6) => Array.from({ length: n + 1 }, (_, i) => ({ value: i, label: L }));
const yRows = rows(6);

const Example = ({ caption, width = W, height = H, ...props }) => (
  <Specimen caption={caption} style={{ padding: 16, background: 'var(--color-core-bg-secondary, #fff)' }}>
    <ChartAxes width={width - 32} height={height - 32} yTicks={yRows} categories={seven} {...props} />
  </Specimen>
);

const Cap = ({ children }) => (
  <p style={{ fontSize: 14, lineHeight: '20px', fontWeight: 500, color: 'var(--color-text-secondary, #474747)', margin: '8px 0 0', maxWidth: 540 }}>{children}</p>
);
const Fig = ({ children, caption }) => <div>{children}{caption && <Cap>{caption}</Cap>}</div>;

// ── Page ──────────────────────────────────────────────────────────────────────
const pctTicks = [0, 10, 20, 30, 40, 50, 60].map((v) => ({ value: v, label: v === 0 ? '0' : `${v}%` }));
const DATE_LABELS = ['20-26 Dec', '27 Dec - 30 Jan', '3-9 Jan', '10-16 Jan', '17-23 Jan', '24-30 Jan', '31 Jan - 5 Feb'];
const JOB_LABELS = ['Employed', 'Currently unemployed', 'Retired, Pensioner', 'Homemaker', 'Student'];
const jobTicks = [10, 20, 30, 40, 50, 60, 70].map((v) => ({ value: v, label: `${v}%` }));
const bars = [53, 43, 22, 63, 42, 74, 32];

export const Docs = () => (
  <Page maxWidth={1240}>
    <Heading>Axes and labels</Heading>
    <Body>
      Axes and labels provide essential context for chart data. Use clear, easy-to-understand descriptors and metrics
      to label charts and axes.
    </Body>

    <Section>
      <Heading>Guidelines</Heading>
      <Body>
        Guidelines ensure that charts are accurate, readable, and do not mislead the audience. Guidelines are optional
        for on Y-axis and X-axis or both. Display it only if it helps users to read the data
      </Body>
      <Row>
        <Fig><Example caption="Y-axis guideline" /></Fig>
        <Fig><Example caption="X-axis guideline" showGridlines={false} showXGridlines /></Fig>
        <Fig><Example caption="Both guidelines" showXGridlines /></Fig>
      </Row>
    </Section>

    <Section>
      <Heading>Orientation</Heading>
      <SubHeading>X-axis orientation</SubHeading>
      <Bullets>
        <li style={{ marginBottom: 12 }}><b>Default to the bottom.</b><br />It’s the convention for time, categories and anything continuous.</li>
        <li style={{ marginBottom: 12 }}>
          <b>Move it to the top when:</b>
          <Bullets>
            <li style={{ marginBottom: 12 }}>It’s a horizontal bar chart in a long or scrolling list (rankings, top-N tables). Putting the value scale on top means people see it before they scroll.</li>
            <li>Values are negative-heavy, like a waterfall that goes mostly downward, where a bottom axis would sit far from the data. In that case, also consider anchoring the axis at zero.</li>
          </Bullets>
        </li>
      </Bullets>
      <SubHeading>Y-axis orientation</SubHeading>
      <Bullets>
        <li style={{ marginBottom: 12 }}><b>Default to the left.</b><br />People read left to right, so the scale should come before the data.</li>
        <li style={{ marginBottom: 12 }}>
          <b>Move it to the right only when:</b>
          <Bullets>
            <li style={{ marginBottom: 12 }}>The latest value matters most. In time series where people care about “where are we now” (stock-style charts, live KPIs), a right axis puts the scale next to the newest point.</li>
            <li>There’s a second measure. On a dual-axis chart the secondary measure goes on the right (see below).</li>
          </Bullets>
        </li>
      </Bullets>
      <Row>
        <Fig caption="Default orientation"><Example showGridlines={false} /></Fig>
        <Fig caption="You can often drop the Y-axis altogether: if values are labelled directly on bars or points, gridlines plus labels are enough.">
          <Example yAxis="none" showGridlines={false} showXGridlines />
        </Fig>
      </Row>
      <Row>
        <Fig caption="Alternative orientation (top X-axes)"><Example xAxis="top" showGridlines={false} /></Fig>
        <Fig caption="Alternative orientation (right Y-axes)"><Example yAxis="right" showGridlines={false} /></Fig>
      </Row>
    </Section>

    <Section>
      <SubHeading>Dual axes</SubHeading>
      <Body>
        Dual Y-axes are the riskiest of the three. The chart’s apparent message depends on two arbitrary scale
        choices, so readers can see correlations or crossovers that aren’t real. Treat them as an exception that needs a
        reason.
      </Body>
      <SubHeading>Allow one only if all of these hold:</SubHeading>
      <Bullets>
        <li style={{ marginBottom: 12 }}>The two measures have different units (e.g. impressions vs. CTR %, spend vs. reach). If they share a unit, use one axis.</li>
        <li>There are at most two series, one per axis.<br />Each series is visually tied to its axis: matching colour on the axis labels and title, and ideally different marks (bars on the left, a line on the right).</li>
      </Bullets>
      <Row><Fig caption="Dual axes (L+R)"><Example yAxis="both" showGridlines={false} /></Fig></Row>
    </Section>

    <Section>
      <Heading>Tick mark</Heading>
      <Body>Tick marks are small scale lines along chart axes that establish value positions and anchor labels.</Body>
      <Body>Continuous vs. Categorical Alignment:</Body>
      <Bullets>
        <li style={{ marginBottom: 12 }}>For continuous data (like time or numbers), center the tick mark directly under or aligned with the label.</li>
        <li>For categorical data, tick marks are often optional, or labels can sit between the ticks.</li>
      </Bullets>
      <Row>
        <Fig caption="Tick mark on X-axes">
          <Example
            showTicks showGridlines={false} showXGridlines
            yTicks={rows(3)}
            categories={['Jan', '', '', 'Feb', '', '', 'Mar']}
          />
        </Fig>
        <Fig caption="Tick mark on Y-axes">
          <Example
            showTicks
            yDomain={[0, 7]}
            yTicks={[1, 2, 3, 4, 5, 6, 7].map((v, i) => ({ value: v, label: ['Jan', '', '', 'Feb', '', '', 'Mar'][i] }))}
          />
        </Fig>
      </Row>
    </Section>

    <Section>
      <Heading>Starting at zero</Heading>
      <Body>
        To start at zero, or not to start at zero. This is potentially history’s longest debate. As a charting
        library, we would like to support both directions, with the following recommendation.
      </Body>
      <SubHeading>When starting at non-zero is bad</SubHeading>
      <Body>
        Always start numerical axes at zero for part-to-whole and comparisons charts, such as bar and area chart.
        Truncating the Y axis can distort the perception, making a small difference look big and significant.
      </Body>
      <Row>
        <Specimen style={{ padding: 16, background: 'var(--color-core-bg-secondary, #fff)' }}>
          <ChartAxes
            width={W - 32}
            height={H - 32}
            yDomain={[0, 125]}
            yTicks={[{ value: 0, label: '0' }, { value: 50, label: '50%' }, { value: 100, label: '100%' }]}
            categories={seven}
          >
            {({ x, y, plot }) =>
              bars.map((v, i) => (
                <rect key={i} x={x(i) - 16} y={y(v)} width={32} height={plot.bottom - y(v)} fill={seriesColour(0, 'group1')} />
              ))
            }
          </ChartAxes>
        </Specimen>
      </Row>
    </Section>

    <Section>
      <Heading>Responsive x-axis label</Heading>
      <Row>
        <Fig caption="Narrow width: the label fills the column width and wraps onto a second row">
          <Example width={540} height={336} yTicks={pctTicks} categories={DATE_LABELS} />
        </Fig>
        <Fig caption="Wider width: the whole label is shown on one line">
          <Example width={907} height={336} yTicks={pctTicks} categories={DATE_LABELS} />
        </Fig>
      </Row>
    </Section>

    <Section>
      <Heading>Responsive y-axis label</Heading>
      <Row>
        <Fig caption="Narrow width: long labels are truncated to the first 7 and last 5 characters">
          <Example width={543} height={336} orientation="horizontal" xDomain={[0, 80]} categories={JOB_LABELS} xTicks={jobTicks} showGridlines={false} showXGridlines />
        </Fig>
        <Fig caption="Wider width: the whole label is shown">
          <Example width={907} height={336} orientation="horizontal" xDomain={[0, 80]} categories={JOB_LABELS} xTicks={jobTicks} showGridlines={false} showXGridlines />
        </Fig>
      </Row>
    </Section>
  </Page>
);

// ── Playground: resize the browser (or drag the corner handle) to watch labels adapt ──
const useWidth = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!ref.current) return undefined;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, width];
};

const PlaygroundDemo = ({ axis, xPosition, yPosition, showTicks, showXGuideline, showYGuideline }) => {
  const xAxis = xPosition === 'Top' ? 'top' : 'bottom';
  const yAxis = yPosition === 'Right' ? 'right' : yPosition === 'Left + right' ? 'both' : 'left';
  const [ref, width] = useWidth();
  const w = Math.max(width, 160);
  return (
    <div>
      <p style={{ fontSize: 14, lineHeight: '20px', fontWeight: 500, margin: '0 0 8px', color: 'var(--color-text-secondary, #474747)' }}>
        Chart width: {width}px — resize the browser window or drag the bottom-right corner of the box.
      </p>
      <div
        ref={ref}
        style={{
          resize: 'horizontal', overflow: 'hidden', width: '100%', minWidth: 200, maxWidth: '100%', boxSizing: 'border-box',
          padding: 16, background: 'var(--color-core-bg-secondary, #fff)', border: '1px solid var(--color-divider-tertiary, #ede9e3)', borderRadius: 8,
        }}
      >
        {axis === 'X-axis labels' ? (
          <ChartAxes width={w} height={300} yTicks={pctTicks} categories={DATE_LABELS} xAxis={xAxis} yAxis={yAxis} showTicks={showTicks} showGridlines={showYGuideline} showXGridlines={showXGuideline} />
        ) : (
          <ChartAxes
            width={w} height={300} orientation="horizontal" xAxis={xAxis} xDomain={[0, 80]} categories={JOB_LABELS} xTicks={jobTicks}
            showTicks={showTicks} showGridlines={showXGuideline} showXGridlines={showYGuideline}
          />
        )}
      </div>
    </div>
  );
};

export const Playground = {
  parameters: { layout: 'padded' },
  args: { axis: 'X-axis labels', xPosition: 'Bottom', yPosition: 'Left', showTicks: false, showXGuideline: false, showYGuideline: true },
  argTypes: {
    axis: { control: 'inline-radio', options: ['X-axis labels', 'Y-axis labels'], description: 'X: labels wrap to a second row when the column is narrow. Y: long labels are truncated to the first 7 + last 5 characters when the gutter is narrow.' },
    xPosition: { control: 'inline-radio', options: ['Bottom', 'Top'], name: 'X-axis position' },
    yPosition: { control: 'inline-radio', options: ['Left', 'Right', 'Left + right'], name: 'Y-axis position', description: 'Y-axis labels view always keeps the categories on the left' },
    showTicks: { control: 'boolean' },
    showXGuideline: { control: 'boolean', name: 'X-axis guideline (vertical)' },
    showYGuideline: { control: 'boolean', name: 'Y-axis guideline (horizontal)' },
  },
  render: (args) => <PlaygroundDemo {...args} />,
};
