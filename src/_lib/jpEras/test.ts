import { describe, expect, it } from "vitest";
import {
  getJpEraInfo,
  getJpEraYear,
  jpEraToDate,
} from "./index.ts";

describe("jpEras utilities", () => {
  describe("getJpEraInfo", () => {
    it("returns Meiji era info for 1868-01-25", () => {
      const date = new Date(1868, 0, 25);
      const result = getJpEraInfo(date);
      expect(result).toEqual({
        era: 1,
        code: "M",
        since: new Date(1868, 0, 25),
      });
    });

    it("returns Taisho era info for 1912-07-30", () => {
      const date = new Date(1912, 6, 30);
      const result = getJpEraInfo(date);
      expect(result).toEqual({
        era: 2,
        code: "T",
        since: new Date(1912, 6, 30),
      });
    });

    it("returns Showa era info for 1926-12-25", () => {
      const date = new Date(1926, 11, 25);
      const result = getJpEraInfo(date);
      expect(result).toEqual({
        era: 3,
        code: "S",
        since: new Date(1926, 11, 25),
      });
    });

    it("returns Heisei era info for 1989-01-08", () => {
      const date = new Date(1989, 0, 8);
      const result = getJpEraInfo(date);
      expect(result).toEqual({
        era: 4,
        code: "H",
        since: new Date(1989, 0, 8),
      });
    });

    it("returns Reiwa era info for 2019-05-01", () => {
      const date = new Date(2019, 4, 1);
      const result = getJpEraInfo(date);
      expect(result).toEqual({
        era: 5,
        code: "R",
        since: new Date(2019, 4, 1),
      });
    });

    it("returns the latest era for future dates (within Reiwa)", () => {
      const date = new Date(2099, 11, 31);
      const result = getJpEraInfo(date);
      expect(result?.era).toBe(5); // Reiwa
      expect(result?.code).toBe("R");
    });
  });

  describe("getJpEraYear", () => {
    it("returns 1 for Meiji year 1 (1868-01-25)", () => {
      const date = new Date(1868, 0, 25);
      const result = getJpEraYear(date);
      expect(result).toBe(1);
    });

    it("returns 45 for Meiji year 45 (1912-07-29)", () => {
      const date = new Date(1912, 6, 29);
      const result = getJpEraYear(date);
      expect(result).toBe(45);
    });

    it("returns 1 for Taisho year 1 (1912-07-30)", () => {
      const date = new Date(1912, 6, 30);
      const result = getJpEraYear(date);
      expect(result).toBe(1);
    });

    it("returns 15 for Taisho year 15 (1926-12-24)", () => {
      const date = new Date(1926, 11, 24);
      const result = getJpEraYear(date);
      expect(result).toBe(15);
    });

    it("returns 1 for Showa year 1 (1926-12-25)", () => {
      const date = new Date(1926, 11, 25);
      const result = getJpEraYear(date);
      expect(result).toBe(1);
    });

    it("returns 64 for Showa year 64 (1989-01-07)", () => {
      const date = new Date(1989, 0, 7);
      const result = getJpEraYear(date);
      expect(result).toBe(64);
    });

    it("returns 1 for Heisei year 1 (1989-01-08)", () => {
      const date = new Date(1989, 0, 8);
      const result = getJpEraYear(date);
      expect(result).toBe(1);
    });

    it("returns 31 for Heisei year 31 (2019-04-30)", () => {
      const date = new Date(2019, 3, 30);
      const result = getJpEraYear(date);
      expect(result).toBe(31);
    });

    it("returns 1 for Reiwa year 1 (2019-05-01)", () => {
      const date = new Date(2019, 4, 1);
      const result = getJpEraYear(date);
      expect(result).toBe(1);
    });

    it("returns null for dates before Meiji era", () => {
      const date = new Date(1867, 11, 31);
      const result = getJpEraYear(date);
      expect(result).toBeNull();
    });
  });

  describe("jpEraToDate", () => {
    it("converts Meiji 1 (gannen) to 1868-01-25", () => {
      const result = jpEraToDate(1, 1, 1, 25);
      expect(result).toEqual(new Date(1868, 0, 25));
    });

    it("converts Meiji 45 to 1912-07-01", () => {
      const result = jpEraToDate(1, 45, 7, 1);
      expect(result).toEqual(new Date(1912, 6, 1));
    });

    it("converts Taisho 1 to 1912-07-30", () => {
      const result = jpEraToDate(2, 1, 7, 30);
      expect(result).toEqual(new Date(1912, 6, 30));
    });

    it("converts Showa 1 to 1926-12-25", () => {
      const result = jpEraToDate(3, 1, 12, 25);
      expect(result).toEqual(new Date(1926, 11, 25));
    });

    it("converts Heisei 1 to 1989-01-08", () => {
      const result = jpEraToDate(4, 1, 1, 8);
      expect(result).toEqual(new Date(1989, 0, 8));
    });

    it("converts Reiwa 1 to 2019-05-01", () => {
      const result = jpEraToDate(5, 1, 5, 1);
      expect(result).toEqual(new Date(2019, 4, 1));
    });

    it("converts Reiwa 6 (2024) to 2024-06-15", () => {
      const result = jpEraToDate(5, 6, 6, 15);
      expect(result).toEqual(new Date(2024, 5, 15));
    });

    it("returns null for invalid era index", () => {
      const result = jpEraToDate(99 as any, 1, 1, 1);
      expect(result).toBeNull();
    });
  });
});
