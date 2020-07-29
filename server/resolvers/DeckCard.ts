import { prisma } from "../../pages/api/graphql";

export const DeckCard = {
  updatedAt: (_parent) => _parent.updated_at,
  createdAt: (_parent) => _parent.created_at,
  isInSideDeck: (_parent) => _parent.is_in_side_deck,
  isStartingCard: (_parent) => _parent.is_starting_card,
  card: async (_parent) => {
    const card = await prisma.card.findOne({
      where: {
        id: _parent.cardId,
      },
    });
    if (!card) {
      throw new Error(`Card ${_parent.cardId} not found`);
    }
    return card;
  },
  deck: async (_parent) => {
    const deck = await prisma.deck.findOne({
      where: {
        id: _parent.deckId,
      },
    });
    if (!deck) {
      throw new Error(`Deck ${_parent.cardId} not found`);
    }
    return deck;
  },
};
