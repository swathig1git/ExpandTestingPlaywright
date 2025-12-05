export function toUrlName(name: string): string {
  return name
    .toLowerCase()
    .replace(/ \+ /g, "-")
    .replace(/ /g, "-")
    .replace(/'/g, "")
    .replace(/à/g, "a")
    .replace(/&/g, "and");
}