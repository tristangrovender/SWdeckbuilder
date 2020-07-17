import { Card } from "./card.interface";
import { sortAlphabetically } from "../../utils/utils";

async function loadCards() {
  const cards = (await import("../../cards/cards.json")).default as Card[];
  return cards
    .sort((a, b) => {
      if (a.front.title < b.front.title) {
        return -1;
      }
      if (a.front.title > b.front.title) {
        return 1;
      }
      return 0;
    })
    .filter(({ legacy }) => {
      return legacy === false;
    });
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
