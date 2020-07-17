import { Card } from "./card.interface";
import { memoize } from "../../utils/utils";

function sortCardsByName(a: Card, b: Card) {
  if (a.front.title < b.front.title) {
    return -1;
  }
  if (a.front.title > b.front.title) {
    return 1;
  }
  return 0;
}

function removeLegacyCards({ legacy }: Card) {
  return legacy === false;
}

async function loadCards() {
  const cards = (await import("../../cards/cards.json")).default as Card[];
  return cards.sort(sortCardsByName).filter(removeLegacyCards);
}

const loadCardsOnce = memoize(loadCards);

export async function getCards() {
  return loadCardsOnce();
}
