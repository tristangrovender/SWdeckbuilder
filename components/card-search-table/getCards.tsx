async function loadCards() {
  const cards = (await import("../../cards/cards.json")).default;
  return cards;
}

function memoize<T>(func: Function) {
  let result;
  return (...args: T[]) => {
    if (!result) {
      result = func();
    }
    return result;
  };
}

const loadCardsOnce = memoize(loadCards);

export async function getCards() {
  return loadCardsOnce();
}
