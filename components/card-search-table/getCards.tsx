import { Card } from "./card.interface";
import { memoize } from "../../utils/utils";
import { client } from "../apollo-client";
import { gql } from "@apollo/client";
import GetCardsQuery from "../../graphql/get-cards.gql";
import { GetCardsQuery as GetCardsQueryI } from "../../graphql/types";

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

function fetchCardsFromServer() {
  return client
    .query<GetCardsQueryI>({
      query: gql(GetCardsQuery),
    })
    .then(({ data }) => {
      return data.cards;
    });
}

export const getCardsFromServer = memoize(() => fetchCardsFromServer());

function removeLegacyCards({ legacy }: Card) {
  return legacy === false;
}

async function loadCards() {
  const cards = (await import("../../cards/cards.json")).default as Card[];
  const gempMapping = (await import("../../cards/gemp_id_mapping.json"))
    .default;
  return cards
    .sort(sortCardsByName)
    .filter(removeLegacyCards)
    .map((card) => {
      const gempId = gempMapping[card.id] && gempMapping[card.id].gemp_card_id;
      return {
        ...card,
        gemp_card_id: gempId,
      };
    });
}

const loadCardsOnce = memoize(loadCards);

/**
 * @deprecated Pleaase use getCardsFromServer
 */
export async function getCards() {
  return loadCardsOnce();
}
