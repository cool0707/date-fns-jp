import type { Match } from "../../../locale/types.ts";
import type { JpEra } from "../../../types.ts";
import { Parser } from "../Parser.ts";
import type { ParseFlags, ParseResult } from "../types.ts";
import { mapValue, parseNDigits } from "../utils.ts";
import { jpEraToDate } from "../../../_lib/jpEras/index.ts";
type JpEraYearValue = { year: number };

// Parser for Japanese era year token 'n' (and ordinal 'no')
export class JpEraYearParser extends Parser<JpEraYearValue> {
  priority = 130;
  incompatibleTokens = ["Y", "R", "G", "u", "w", "I", "i", "e", "c", "t", "T"];

  parse(
    dateString: string,
    token: string,
    match: Match,
  ): ParseResult<JpEraYearValue> {
    const valueCallback = (year: number) => ({ year });

    switch (token) {
      case "n":
        return mapValue(parseNDigits(4, dateString), valueCallback);
      case "no":
        // Try to use jpEraYear if available (handles "元" -> 1)
        if (match.jpEraYear) {
          return mapValue(match.jpEraYear(dateString), valueCallback);
        }
        // Fallback to ordinalNumber if jpEraYear not available
        return mapValue(
          match.ordinalNumber(dateString, { unit: "year" }),
          valueCallback,
        );
      default:
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
    }
  }

  validate<DateType extends Date>(_date: DateType, value: JpEraYearValue): boolean {
    return value.year > 0;
  }

  set<DateType extends Date>(date: DateType, flags: ParseFlags, value: JpEraYearValue): DateType {
    // If jpEra flag is present, compute absolute year based on era
    if ("jpEra" in flags && typeof flags.jpEra === "number") {
      const eraIndex = flags.jpEra as JpEra;
      // convert eraIndex + era-year to Date (month/day set to Jan 1)
      const eraDate = jpEraToDate(eraIndex, value.year, 1, 1);
      if (eraDate) {
        date.setFullYear(eraDate.getFullYear(), eraDate.getMonth(), eraDate.getDate());
        date.setHours(0, 0, 0, 0);
        return date;
      }
    }

    // Fallback: set absolute year as provided (same behavior as YearParser without era handling)
    const year = value.year;
    date.setFullYear(year, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
}
