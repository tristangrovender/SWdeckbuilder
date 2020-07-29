import { DeckCard } from "./card-panel";
// yea this function is confusing...
// it gets complicated with adding removing group cards
// and confirming the order works
export function groupCards(
  deckCards: DeckCard[]
): { count: number; deckCard: DeckCard }[] {
  const cardsByCount = Array.from(deckCards).reduce(
    (
      all: {
        [cardId: string]: {
          deckCard: DeckCard;
          count: number;
          lowestCreatedAt: number;
        };
      },
      deckCard
    ) => {
      if (!deckCard || !deckCard.card) {
        return all;
      }
      if (!all[deckCard.card.cardId]) {
        all[deckCard.card.cardId] = {
          deckCard,
          count: 1,
          lowestCreatedAt: new Date(deckCard.createdAt).getTime(),
        };
      } else {
        all[deckCard.card.cardId].count += 1;
        const time = new Date(deckCard.createdAt).getTime();
        if (time < all[deckCard.card.cardId].lowestCreatedAt) {
          all[deckCard.card.cardId].lowestCreatedAt = time;
        } else {
          all[deckCard.card.cardId].deckCard = deckCard;
        }
      }
      return all;
    },
    {}
  );
  const ordering = Object.values(cardsByCount).sort(
    (a, b) => a.lowestCreatedAt - b.lowestCreatedAt
  );
  return ordering;
}
