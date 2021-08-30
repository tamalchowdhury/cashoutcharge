export function makeCapitalCase(name) {
  return name
    .split("")
    .map((ch, i) => (i === 0 ? ch.toUpperCase() : ch))
    .join("");
}
