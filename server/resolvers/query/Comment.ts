import { prisma } from "../../../pages/api/graphql";
export const Comment = {
  createdAt: (_parent) => _parent.created_at,
  updatedAt: (_parent) => _parent.updated_at,
  author: (_parent) => {
    return prisma.user.findOne({
      where: {
        id: _parent.authorId,
      },
    });
  },
  deck: (_parent) => {
    if (!_parent.deckId) {
      return null;
    }
    return prisma.deck.findOne({
      where: {
        id: _parent.deckId,
      },
    });
  },
  card: (_parent) => {
    if (!_parent.cardId) {
      return null;
    }
    return prisma.card.findOne({
      where: {
        id: _parent.cardId,
      },
    });
  },
};
