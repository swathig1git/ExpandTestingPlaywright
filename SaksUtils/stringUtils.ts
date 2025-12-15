export function toUrlName(name: string): string {
  return name
    .toLowerCase()
    .replace(/ \+ /g, "-")
    .replace(/ /g, "-")
    .replace(/'/g, "")
    .replace(/à/g, "a")
    .replace(/&/g, "and");
}

export function priceInNumber(priceText: string): number {
  // Remove everything except digits and decimal point
  const cleaned = priceText.replace(/[^0-9.]/g, "");

  // Convert to number
  const value = parseFloat(cleaned);

  // Return NaN if nothing valid was found
  return isNaN(value) ? NaN : value;
}

export function getBrandFromURL(url: string): string | null {
  const match = url.match(/[?&]query=([^&]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}