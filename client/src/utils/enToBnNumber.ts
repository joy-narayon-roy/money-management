const enToBnDigitsMap: Record<string, string> = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

export function enToBnNumber(input: string | number): string {
  return String(input).replace(/[0-9]/g, (digit) => enToBnDigitsMap[digit]);
}
