import { Card } from "./card.interface";
import { memoize } from "../../utils/utils";

function sortCardsByName(a: Card, b: Card) {
  // update function so that the dots before the name are ignored

  const aTitle = a.front.title.replace(/[^0-9a-zA-z_.]/gi, "");
  const bTitle = b.front.title.replace(/[^0-9a-zA-z_.]/gi, "");

  if (aTitle < bTitle) {
    return -1;
  }
  if (aTitle > bTitle) {
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
