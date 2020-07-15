export function unique(items: string[]) {
  return Array.from(new Set(items));
}

export function sortAlphabetically(items: string[]) {
  return items.sort(function (a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });
}
