const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const WEEKDAYS = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const MONTHS = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];
const UNITS: Record<string, string> = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };

// 148 -> "১৪৮"
export function toBn(value: string | number) {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

export function formatNumber(n: number | string) {
  const number = Number(n);
  const hasDecimal = !Number.isInteger(number);
  const text = number.toLocaleString("en-US", {
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: 2,
  });
  return toBn(text);
}

export function formatTaka(n: number | string) {
  return formatNumber(n) + " টাকা";
}

export function formatPercent(pct: number) {
  return toBn(Math.abs(pct).toFixed(1)) + "%";
}

export function unitName(unit: string) {
  return UNITS[unit] || unit;
}

export function perUnit(unit: string) {
  return "প্রতি " + unitName(unit);
}

export function formatBanglaDate(date: Date) {
  const weekday = WEEKDAYS[date.getDay()];
  const day = toBn(date.getDate());
  const month = MONTHS[date.getMonth()];
  const year = toBn(date.getFullYear());
  return `${weekday}, ${day} ${month}, ${year}`;
}

export function formatBanglaTime(date: Date) {
  const hour = date.getHours();
  const minute = String(date.getMinutes()).padStart(2, "0");
  let period = "রাত";
  if (hour >= 4 && hour < 12) period = "সকাল";
  else if (hour >= 12 && hour < 16) period = "দুপুর";
  else if (hour >= 16 && hour < 18) period = "বিকাল";
  else if (hour >= 18 && hour < 20) period = "সন্ধ্যা";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${period} ${toBn(hour12)}:${toBn(minute)}`;
}
