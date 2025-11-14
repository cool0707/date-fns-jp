import type { JpEra } from "../../types.ts";

// Define Japanese eras (Meiji onward) and their start dates as an array
export type JpEraInfo = {
    era: JpEra
    code: 'M' | 'T' | 'S' | 'H' | 'R'
    since: Date
}

// Note: Date months are zero-based (0 = January)
const jpEras: ReadonlyArray<JpEraInfo> = [
    { era: 1, code: 'M', since: new Date(1868, 0, 25) }, // 1868-01-25 (MEIJI)
    { era: 2, code: 'T', since: new Date(1912, 6, 30) }, // 1912-07-30 (TAISHO)
    { era: 3, code: 'S', since: new Date(1926, 11, 25) }, // 1926-12-25 (SHOWA)
    { era: 4, code: 'H', since: new Date(1989, 0, 8) }, // 1989-01-08 (HEISEI)
    { era: 5, code: 'R', since: new Date(2019, 4, 1) }, // 2019-05-01 (REIWA)
]

/**
 * Get Japanese era info for a given Date.
 *
 * @param {Date} date - The Date to check.
 * @returns {JpEraInfo | null} The era info (Meiji onward) or null if the date is before the Meiji era.
 */
export function getJpEraInfo(date: Date): JpEraInfo | null {
    for (let i = jpEras.length - 1; i >= 0; i--) {
        if (date >= jpEras[i].since) {
            return jpEras[i]
        }
    }
    return null // Return null for dates before the Meiji era
}

/**
 * Get the year within the Japanese era for a given Date.
 *
 * @param {Date} date - The Date to check.
 * @returns {number | null} Era year (1 for the first year) or null if the date is before the Meiji era.
 */
export function getJpEraYear(date: Date): number | null {
    const era = getJpEraInfo(date)
    if (!era) {
        return null // Return null for dates before the Meiji era
    }
    const eraStartYear = era.since.getFullYear()
    return date.getFullYear() - eraStartYear + 1
}

/**
 * Convert an era index and era-year/month/day into a JavaScript Date.
 *
 * @param {JpEra} eraIndex - Era index (1=Meiji, 2=Taisho, 3=Showa, 4=Heisei, 5=Reiwa).
 * @param {number} [year=1] - Year within the era (1 = first year).
 * @param {number} [month=1] - Month (1 = January).
 * @param {number} [day=1] - Day of the month.
 * @returns {Date | null} The corresponding Date, or null if the era index is invalid or the resulting date is before the era start.
 */
export function jpEraToDate(
    eraIndex: JpEra,
    year: number = 1,
    month: number = 1,
    day: number = 1
): Date | null {
    const era = jpEras.find((e) => e.era === eraIndex)
    if (!era) {
        return null // Return null for invalid era index
    }
    const eraStartYear = era.since.getFullYear()
    const date = new Date(eraStartYear + year - 1, month - 1, day)
    
    return date
}
