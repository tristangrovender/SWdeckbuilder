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

export function groupBy<T extends Object>(items: T[], keys: string[]): T[][] {
  const getValue = (obj: T, keys: string[]) => {
    if (keys.length === 1) {
      return obj[keys[0]];
    }
    return getValue(obj[keys[0]], keys.slice(1));
  };
  const groupByKey = items.reduce((all, item) => {
    const value = getValue(item, keys);
    if (!all[value]) {
      all[value] = [];
    }
    console.log(value);
    all[value].push(item);
    return all;
  }, {});
  return Object.values(groupByKey);
}
