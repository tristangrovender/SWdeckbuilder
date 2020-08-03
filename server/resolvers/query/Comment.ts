import { prisma } from "../../../pages/api/graphql";
export const Comment = {
  createdAt: (_parent) => _parent.created_at,
  updatedAt: (_parent) => _parent.updated_at,
  deck: (_parent) =>
    prisma.deck.findOne({
      where: {
        id: _parent.deckId,
      },
    }),
  card: (_parent) =>
    prisma.card.findOne({
      where: {
        id: _parent.cardId,
      },
    }),
};
