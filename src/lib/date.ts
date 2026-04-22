const LONG_MONTH: Intl.DateTimeFormatOptions = {
  month: "long",
  timeZone: "UTC",
};

function ordinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

/** Format an ISO date as "21st April" (no year). */
export function formatOrdinalDate(iso: string): string {
  const d = new Date(iso);
  const day = d.getUTCDate();
  const month = new Intl.DateTimeFormat("en-GB", LONG_MONTH).format(d);
  return `${day}${ordinalSuffix(day)} ${month}`;
}

/** Format an ISO date as "21st April 2026". */
export function formatOrdinalDateLong(iso: string): string {
  const d = new Date(iso);
  const day = d.getUTCDate();
  const month = new Intl.DateTimeFormat("en-GB", LONG_MONTH).format(d);
  const year = d.getUTCFullYear();
  return `${day}${ordinalSuffix(day)} ${month} ${year}`;
}
