import { useMemo } from "react";
import Papa from "papaparse";
import rawCsv from "../data/cpi_food_vs_allitems_canada_202003-202505.csv?raw";

/** Shape of one monthly CPI record */
export interface CpiPoint {
  date: Date;    // first-of-month
  food: number;  // food CPI 12-mo % change
  all: number;   // all-items CPI 12-mo % change
}

/**
 * Parse the CSV exactly once and memoise the result.
 * ───────────────────────────────────────────────── */
export default function useCpiData(): CpiPoint[] {
  return useMemo(() => {
    if (!rawCsv) return [];

    const parsed = Papa.parse(rawCsv, {
      header: true,
      dynamicTyping: true,
    }).data as any[];

    return parsed
      .filter((r) => r.date && !isNaN(Date.parse(r.date)))
      .map((r) => ({
        date: new Date(r.date),             // ISO → Date
        food: r.food_pct_change as number,
        all: r.all_items_pct_change as number,
      }));
  }, []);
}
