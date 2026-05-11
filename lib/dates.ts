// Parses "YYYY-M" or "YYYY-MM" into a Date. Returns the epoch on missing or
// malformed input so sort comparators stay stable instead of receiving NaN
// (which would produce an unpredictable order). The `month - 1` offset is
// because JavaScript Date months are 0-indexed.
export const parseYearMonth = (ym: string): Date => {
  if (!ym) return new Date(0);
  const [yearStr, monthStr] = ym.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  if (Number.isNaN(year) || Number.isNaN(month)) return new Date(0);
  return new Date(year, month - 1, 1);
};

export const formatYearMonth = (ym: string): string =>
  ym
    ? parseYearMonth(ym).toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "In-Progress";

export const formatYear = (ym: string): string =>
  ym ? ym.split("-")[0] : "Now";
