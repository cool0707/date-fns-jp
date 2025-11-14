import type { Match } from "../../../locale/types.ts";
import type { JpEra } from "../../../types.ts";
import { Parser } from "../Parser.ts";
import { jpEraToDate } from "../../../_lib/jpEras/index.ts";
import type { ParseFlags, ParseResult } from "../types.ts";
import { mapValue, parseNDigits } from "../utils.ts";

export class JpEraParser extends Parser<number> {
  priority = 140;

  parse(dateString: string, token: string, match: Match): ParseResult<JpEra> {
    if (!match.jpEra) return null;
    
    const valueCallback = (eraIndex: number) => (eraIndex as JpEra);

    switch (token) {
      // 1,2,3,4,5 (numeric or short)
      case "N":
        return mapValue(parseNDigits(2, dateString), valueCallback);
      case "NN":
        return match.jpEra(dateString, { width: "narrow", context: "formatting" });
      case "NNN":
        return match.jpEra(dateString, { width: "abbreviated", context: "formatting" });
      case "NNNN":
        return match.jpEra(dateString, { width: "wide", context: "formatting" });
      default:
        return (
          match.jpEra(dateString, { width: "wide", context: "formatting" }) ||
          match.jpEra(dateString, { width: "abbreviated", context: "formatting" }) ||
          match.jpEra(dateString, { width: "narrow", context: "formatting" })
        );
    }
  }

  validate<DateType extends Date>(_date: DateType, value: number): boolean {
    return value >= 1 && value <= 5;
  }

  set<DateType extends Date>(date: DateType, flags: ParseFlags, value: number): DateType {
    // store parsed jpEra index in flags for later use by JpEraYearParser
    flags.jpEra = value;

    // Try to set a placeholder to the era's first year so that subsequent
    // year parsers can compute the full year relative to the era.
    const eraStart = jpEraToDate(value as any, 1, 1, 1);
    if (eraStart) {
      date.setFullYear(eraStart.getFullYear(), eraStart.getMonth(), eraStart.getDate());
    }
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["R", "u", "t", "T", "G", "y", "Y"];
}
