import { prisma } from "../../../pages/api/graphql";
export const Deck = {
  createdAt: (_parent) => _parent.created_at,
  title: (_parent) => _parent.title || "Un-named Deck",
  description: (_parent) => _parent.description || "",
  ratings: async (_parent) => {
    return prisma.deckRating.findMany({
      where: {
        Deck: {
          id: _parent.id,
        },
      },
    });
  },
  author: (_parent) => {
    return prisma.user.findOne({
      where: {
        id: _parent.authorId,
      },
    });
  },
  deckCards: (_parent) => {
    return prisma.deckCard.findMany({
      where: {
        Deck: {
          id: _parent.id,
        },
      },
    });
  },
};
