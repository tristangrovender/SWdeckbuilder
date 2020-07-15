export function unique(items: string[]) {
  return Array.from(new Set(items));
}

export function sortAlphabetically(items: string[]) {
  var collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });
  return items.sort(collator.compare);
}
