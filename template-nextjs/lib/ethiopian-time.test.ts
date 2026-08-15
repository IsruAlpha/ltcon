import { convertToEthiopian, parse12HourTo24Hour } from "./ethiopian-time";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`FAIL: ${message}`);
  }
}

function testConvert12(
  hour12: number,
  minute: number,
  period: "AM" | "PM",
  expectedEthHour: number,
  expectedEthMinute: number,
  expectedPeriodLabel: string,
  description: string
) {
  const westernHour = parse12HourTo24Hour(hour12, minute, period);
  const result = convertToEthiopian(westernHour, minute);

  assert(
    result.hour === expectedEthHour,
    `${description}: expected hour ${expectedEthHour}, got ${result.hour}`
  );
  assert(
    result.minute === expectedEthMinute,
    `${description}: expected minute ${expectedEthMinute}, got ${result.minute}`
  );
  assert(
    result.period === expectedPeriodLabel,
    `${description}: expected period "${expectedPeriodLabel}", got "${result.period}"`
  );
  console.log(`  PASS: ${description}`);
}

function testConvert24(
  westernHour: number,
  minute: number,
  expectedEthHour: number,
  expectedEthMinute: number,
  expectedPeriodLabel: string,
  description: string
) {
  const result = convertToEthiopian(westernHour, minute);

  assert(
    result.hour === expectedEthHour,
    `${description}: expected hour ${expectedEthHour}, got ${result.hour}`
  );
  assert(
    result.minute === expectedEthMinute,
    `${description}: expected minute ${expectedEthMinute}, got ${result.minute}`
  );
  assert(
    result.period === expectedPeriodLabel,
    `${description}: expected period "${expectedPeriodLabel}", got "${result.period}"`
  );
  console.log(`  PASS: ${description}`);
}

// Worked examples
console.log("Worked examples:");
testConvert12(7, 0, "AM", 1, 0, "ጠዋት", "7:00 AM → 1:00 ጠዋት");
testConvert12(9, 30, "AM", 3, 30, "ጠዋት", "9:30 AM → 3:30 ጠዋት");
testConvert12(12, 0, "PM", 6, 0, "ከሰዓት", "12:00 PM (noon) → 6:00 ከሰዓት");
testConvert12(3, 0, "PM", 9, 0, "ከሰዓት", "3:00 PM → 9:00 ከሰዓት");
testConvert12(6, 0, "PM", 12, 0, "ማታ", "6:00 PM → 12:00 ማታ");
testConvert12(8, 15, "PM", 2, 15, "ማታ", "8:15 PM → 2:15 ማታ");
testConvert12(12, 0, "AM", 6, 0, "ለሊት", "12:00 AM (midnight) → 6:00 ለሊት");
testConvert12(3, 0, "AM", 9, 0, "ለሊት", "3:00 AM → 9:00 ለሊት");
testConvert12(6, 0, "AM", 12, 0, "ጠዋት", "6:00 AM → 12:00 ጠዋት (boundary)");

// Edge cases with boundary minutes
console.log("\nBoundary minutes:");
testConvert12(5, 59, "AM", 11, 59, "ለሊት", "5:59 AM → 11:59 ለሊት");
testConvert12(6, 1, "AM", 12, 1, "ጠዋት", "6:01 AM → 12:01 ጠዋት");
testConvert12(11, 59, "AM", 5, 59, "ጠዋት", "11:59 AM → 5:59 ጠዋት");
testConvert12(12, 1, "PM", 6, 1, "ከሰዓት", "12:01 PM → 6:01 ከሰዓት");
testConvert24(17, 59, 11, 59, "ከሰዓት", "17:59 → 11:59 ከሰዓት");
testConvert12(6, 0, "PM", 12, 0, "ማታ", "6:00 PM → 12:00 ማታ (boundary)");
testConvert12(6, 1, "PM", 12, 1, "ማታ", "6:01 PM → 12:01 ማታ");
testConvert24(23, 59, 5, 59, "ማታ", "23:59 → 5:59 ማታ");
testConvert12(12, 0, "AM", 6, 0, "ለሊት", "12:00 AM → 6:00 ለሊት (midnight)");
testConvert12(12, 1, "AM", 6, 1, "ለሊት", "12:01 AM → 6:01 ለሊት");

// Validation tests
console.log("\nValidation:");
try {
  convertToEthiopian(-1, 0);
  console.log("  FAIL: should reject negative hour");
} catch {
  console.log("  PASS: rejects negative hour");
}
try {
  convertToEthiopian(24, 0);
  console.log("  FAIL: should reject hour 24");
} catch {
  console.log("  PASS: rejects hour 24");
}
try {
  convertToEthiopian(10, 60);
  console.log("  FAIL: should reject minute 60");
} catch {
  console.log("  PASS: rejects minute 60");
}
try {
  convertToEthiopian(10, -1);
  console.log("  FAIL: should reject minute -1");
} catch {
  console.log("  PASS: rejects minute -1");
}
try {
  parse12HourTo24Hour(0, 0, "AM");
  console.log("  FAIL: should reject 12-hour 0");
} catch {
  console.log("  PASS: rejects 12-hour 0");
}
try {
  parse12HourTo24Hour(13, 0, "AM");
  console.log("  FAIL: should reject 12-hour 13");
} catch {
  console.log("  PASS: rejects 12-hour 13");
}

console.log("\nAll tests passed!");
