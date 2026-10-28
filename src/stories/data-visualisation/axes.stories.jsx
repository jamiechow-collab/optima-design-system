import React, { useEffect, useRef, useState } from 'react';
import { ChartAxes } from '../../components/DataVis/ChartAxes';
import { seriesColour } from '../../components/DataVis/chartTheme';
import { BenchmarkLine } from '../../components/DataVis/BenchmarkLine';
import { Page, Heading, Body, Section, Specimen, Row, SubHeading, Bullets } from './chartDesignDocs';

const meta = {
  title: 'Data Visualisation/Chart design/Axes and label',
  parameters: { layout: 'padded' },
};

export default meta;

const W = 540;
const H = 320;
const L = 'label';
const seven = Array.from({ length: 7 }, () => L);
const rows = (n = 6) => Array.from({ length: n + 1 }, (_, i) => ({ value: i, label: L }));
const yRows = rows(6);

const Example = ({ caption, width = W, height = H, children, ...props }) => (
  <Specimen caption={caption} style={{ padding: 16, background: 'var(--color-core-bg-secondary, #fff)' }}>
    <ChartAxes width={width - 32} height={height - 32} yTicks={yRows} categories={seven} {...props}>{children}</ChartAxes>
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
      <Heading>Axes title</Heading>
      <Body>
        Axes title prevent user misinterpretation by explicitly stating units, scales, and data definitions. Include
        Units Clearly: Always state measurement units (such as Temperature (°C) or Revenue ($K)) directly in the axis
        title or label so users do not have to guess.
      </Body>
      <Body>
        Remove Redundant Labels: Delete repetitive or unnecessary axis labels if direct data labels on the bars or
        clean subtitles make the axes redundant.
      </Body>
      <Body>Axes titles are placed 16px away from the axis labels, on the left or right of the y-axis and below or above the x-axis.</Body>
      <Row>
        <Fig caption="Y-axis title (left)">
          <Specimen style={{ padding: 0, background: 'var(--color-core-bg-secondary, #fff)' }}>
            <ChartAxes width={556} height={336} yTicks={yRows} categories={seven} yTitle="Axes title" xTitle="Axes title" showGridlines={false} showXGridlines />
          </Specimen>
        </Fig>
        <Fig caption="Y-axis title (right)">
          <Specimen style={{ padding: 0, background: 'var(--color-core-bg-secondary, #fff)' }}>
            <ChartAxes width={556} height={336} yAxis="right" yTicks={yRows} categories={seven} yTitle="Axes title" xTitle="Axes title" showGridlines={false} showXGridlines />
          </Specimen>
        </Fig>
      </Row>
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
      <Heading>Benchmark line</Heading>
      <Body>
        A benchmark line marks a reference value, such as a target or an average, across the plot. It is drawn in
        divider/primary with its value and label next to the line. Use a horizontal line against the y-axis and a
        vertical line against the x-axis.
      </Body>
      <Row>
        <Fig caption="Left Y-axis + benchmark">
          <Example showGridlines={false} showXGridlines>
            {({ plot, y }) => <BenchmarkLine orientation="right" y={y(2)} x1={plot.left} x2={plot.right} value="100K" label="Benchmark" />}
          </Example>
        </Fig>
        <Fig caption="Right Y-axis + benchmark">
          <Example yAxis="right" showGridlines={false} showXGridlines>
            {({ plot, y }) => <BenchmarkLine orientation="left" y={y(2)} x1={plot.left} x2={plot.right} value="100K" label="Benchmark" />}
          </Example>
        </Fig>
        <Fig caption="X-axis + benchmark">
          <Example>
            {({ plot, bandWidth }) => (
              <BenchmarkLine type="vertical" orientation="top" x={plot.left + bandWidth * 2} y1={plot.top} y2={plot.bottom} value="100K" label="Benchmark" />
            )}
          </Example>
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

const PlaygroundDemo = ({ axis, xPosition, yPosition, showTicks, showXGuideline, showYGuideline, showXTitle, showYTitle }) => {
  const titles = { xTitle: showXTitle ? 'Axes title' : undefined, yTitle: showYTitle ? 'Axes title' : undefined };
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
          <ChartAxes width={w} height={300} yTicks={pctTicks} categories={DATE_LABELS} xAxis={xAxis} yAxis={yAxis} showTicks={showTicks} showGridlines={showYGuideline} showXGridlines={showXGuideline} {...titles} />
        ) : (
          <ChartAxes
            width={w} height={300} orientation="horizontal" xAxis={xAxis} xDomain={[0, 80]} categories={JOB_LABELS} xTicks={jobTicks}
            showTicks={showTicks} showGridlines={showXGuideline} showXGridlines={showYGuideline} {...titles}
          />
        )}
      </div>
    </div>
  );
};

export const Playground = {
  parameters: { layout: 'padded' },
  args: { axis: 'X-axis labels', xPosition: 'Bottom', yPosition: 'Left', showTicks: false, showXGuideline: false, showYGuideline: true, showXTitle: false, showYTitle: false },
  argTypes: {
    axis: { control: 'inline-radio', options: ['X-axis labels', 'Y-axis labels'], description: 'X: labels wrap to a second row when the column is narrow. Y: long labels are truncated to the first 7 + last 5 characters when the gutter is narrow.' },
    xPosition: { control: 'inline-radio', options: ['Bottom', 'Top'], name: 'X-axis position' },
    yPosition: { control: 'inline-radio', options: ['Left', 'Right', 'Left + right'], name: 'Y-axis position', description: 'Y-axis labels view always keeps the categories on the left' },
    showTicks: { control: 'boolean' },
    showXGuideline: { control: 'boolean', name: 'X-axis guideline (vertical)' },
    showYGuideline: { control: 'boolean', name: 'Y-axis guideline (horizontal)' },
    showXTitle: { control: 'boolean', name: 'X-axis title', description: 'Axes title below (or above) the X-axis labels' },
    showYTitle: { control: 'boolean', name: 'Y-axis title', description: 'Axes title beside the Y-axis labels (on the right when the Y-axis is on the right)' },
  },
  render: (args) => <PlaygroundDemo {...args} />,
};

// ── Mixed X-axis ──────────────────────────────────────────────────────────────
// Every column keeps its tick (and guideline); only the columns you name get a label.
const mixedCategories = ['Jan', '', '', 'Feb', '', '', 'Mar'];

export const MixedXAxis = {
  name: 'Mixed X-axis',
  parameters: { layout: 'padded' },
  render: () => (
    <Page>
      <Section>
        <Heading>Mixed X-axis</Heading>
        <Body>
          Not every column needs a label. You can choose which X-axis columns carry one and leave the rest blank, while every column keeps
          its tick. The ticks mark where each data point sits, so people can still tell how the data is spread without the labels
          crowding the axis.
        </Body>
        <Bullets>
          <li style={{ marginBottom: 12 }}><b>Label the columns that help people orient themselves.</b><br />For a time series that is usually the start of each month, quarter or year.</li>
          <li style={{ marginBottom: 12 }}><b>Keep a tick on every column.</b><br />Turn on the ticks (and the X-axis guideline) so the unlabelled columns are still visible.</li>
          <li><b>Pass an empty label for the columns you want to leave blank.</b></li>
        </Bullets>
        <Example caption="Labels on Jan, Feb and Mar only; every column keeps its tick and guideline" showTicks showGridlines={false} showXGridlines yTicks={rows(3)} categories={mixedCategories} />
      </Section>
    </Page>
  ),
};

// ── Benchmark line playground ─────────────────────────────────────────────────
const BENCH_ORIENTATIONS = {
  'Horizontal - label right': { type: 'horizontal', orientation: 'right' },
  'Horizontal - label left': { type: 'horizontal', orientation: 'left' },
  'Vertical - label top': { type: 'vertical', orientation: 'top' },
  'Vertical - label bottom': { type: 'vertical', orientation: 'bottom' },
};

export const BenchmarkPlayground = {
  name: 'Benchmark line playground',
  parameters: { layout: 'padded' },
  args: { orientation: 'Horizontal - label right', showText: true, showIcon: false },
  argTypes: {
    orientation: { control: 'select', options: Object.keys(BENCH_ORIENTATIONS) },
    showText: { control: 'boolean', name: 'Value + label', description: 'Shows or hides the value and benchmark label together' },
    showIcon: { control: 'boolean', name: 'Icon', description: 'Optional icon before the label (only shown with the label)' },
  },
  render: ({ orientation, showText, showIcon }) => {
    const cfg = BENCH_ORIENTATIONS[orientation];
    const horizontal = cfg.type === 'horizontal';
    const common = showText
      ? { value: '100K', label: 'Benchmark', icon: showIcon ? 'arrow-top-right' : undefined }
      : {};
    return (
      <Example
        yAxis={horizontal && cfg.orientation === 'left' ? 'right' : 'left'}
        showGridlines={!horizontal}
        showXGridlines={horizontal}
      >
        {({ plot, y, bandWidth }) =>
          horizontal ? (
            <BenchmarkLine {...cfg} y={y(2)} x1={plot.left} x2={plot.right} {...common} />
          ) : (
            <BenchmarkLine {...cfg} x={plot.left + bandWidth * 2} y1={plot.top} y2={plot.bottom} {...common} />
          )
        }
      </Example>
    );
  },
};
