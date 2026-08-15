export type EthiopianPeriod = "ጠዋት" | "ከሰዓት" | "ማታ" | "ለሊት";

export type EthiopianPeriodEnglish = "Morning" | "Afternoon" | "Evening" | "Night";

export interface EthiopianTimeResult {
  hour: number;
  minute: number;
  period: EthiopianPeriod;
  periodEnglish: EthiopianPeriodEnglish;
  formatted: string;
}

export function getEthiopianPeriod(
  westernHour: number
): { period: EthiopianPeriod; periodEnglish: EthiopianPeriodEnglish } {
  if (westernHour >= 6 && westernHour < 12) {
    return { period: "ጠዋት", periodEnglish: "Morning" };
  }
  if (westernHour >= 12 && westernHour < 18) {
    return { period: "ከሰዓት", periodEnglish: "Afternoon" };
  }
  if (westernHour >= 18 && westernHour < 24) {
    return { period: "ማታ", periodEnglish: "Evening" };
  }
  return { period: "ለሊት", periodEnglish: "Night" };
}

export function convertToEthiopian(
  westernHour24: number,
  minute: number
): EthiopianTimeResult {
  if (
    westernHour24 < 0 ||
    westernHour24 > 23 ||
    minute < 0 ||
    minute > 59 ||
    !Number.isInteger(westernHour24) ||
    !Number.isInteger(minute)
  ) {
    throw new Error("Invalid time values");
  }

  let ethHour = ((westernHour24 - 6) % 12 + 12) % 12;
  if (ethHour === 0) {
    ethHour = 12;
  }

  const { period, periodEnglish } = getEthiopianPeriod(westernHour24);
  const m = String(minute).padStart(2, "0");

  return {
    hour: ethHour,
    minute,
    period,
    periodEnglish,
    formatted: `${ethHour}:${m} ${period}`,
  };
}

export function parse12HourTo24Hour(
  hour12: number,
  minute: number,
  period: "AM" | "PM"
): number {
  if (hour12 < 1 || hour12 > 12 || minute < 0 || minute > 59) {
    throw new Error("Invalid time values");
  }

  if (period === "AM") {
    return hour12 === 12 ? 0 : hour12;
  }
  return hour12 === 12 ? 12 : hour12 + 12;
}
