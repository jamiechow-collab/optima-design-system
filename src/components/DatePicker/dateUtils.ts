// ─────────────────────────────────────────────────────────────────────────────
//  Plain-Date helpers shared by Calendar / DateField / DatePicker — no
//  external date library, matching this codebase's zero-dependency convention.
// ─────────────────────────────────────────────────────────────────────────────

export const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const MONTH_LABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const isSameDay = (a: Date | null | undefined, b: Date | null | undefined) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const isSameMonth = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

export const startOfDay = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const addMonths = (date: Date, amount: number) => {
  const d = new Date(date);
  d.setDate(1);
  d.setMonth(d.getMonth() + amount);
  return d;
};

export const addYears = (date: Date, amount: number) => {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + amount);
  return d;
};

export const addDays = (date: Date, amount: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + amount);
  return d;
};

export const isBefore = (a: Date, b: Date) => startOfDay(a).getTime() < startOfDay(b).getTime();
export const isAfter = (a: Date, b: Date) => startOfDay(a).getTime() > startOfDay(b).getTime();

/** ISO-8601 week number (Monday-first week containing the date's Thursday). */
export const getISOWeekNumber = (date: Date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

export interface CalendarCell {
  date: Date;
  isOutsideMonth: boolean;
}

/** Always 42 cells (6 full weeks), Sunday-first, matching the Figma grid. */
export const getCalendarMatrix = (viewDate: Date): CalendarCell[][] => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = firstOfMonth.getDay(); // 0 = Sunday
  const gridStart = addDays(firstOfMonth, -startWeekday);

  const weeks: CalendarCell[][] = [];
  let cursor = gridStart;
  for (let week = 0; week < 6; week += 1) {
    const row: CalendarCell[] = [];
    for (let day = 0; day < 7; day += 1) {
      row.push({ date: cursor, isOutsideMonth: cursor.getMonth() !== month });
      cursor = addDays(cursor, 1);
    }
    weeks.push(row);
  }
  return weeks;
};

const pad2 = (n: number) => String(n).padStart(2, '0');

export const formatDate = (date: Date) => `${pad2(date.getDate())}/${pad2(date.getMonth() + 1)}/${date.getFullYear()}`;

/** Parses a strict DD/MM/YYYY string, returns null if invalid or out of range. */
export const parseDate = (value: string): Date | null => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim());
  if (!match) return null;
  const [, dd, mm, yyyy] = match;
  const day = Number(dd);
  const month = Number(mm);
  const year = Number(yyyy);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return date;
};
