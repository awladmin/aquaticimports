export function flagEmoji(countryCode: string): string {
  const upper = countryCode.toUpperCase();
  if (upper.length !== 2) return "🏳";
  const codePoints = [...upper].map((c) => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
