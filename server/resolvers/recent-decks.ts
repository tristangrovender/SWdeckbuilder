import { PrismaClient } from "@prisma/client";

export async function recentDecks(prisma: PrismaClient) {
  const decks = await prisma.deck.findMany({
    where: {
      NOT: {
        title: null,
      },
    },
  });
  return decks.map((deck) => {
    return {
      ...deck,
      averageRating: 4.5,
      description: "",
      createdAt: deck.created_at,
      author: () => {
        return prisma.user.findOne({
          where: {
            id: deck.authorId,
          },
        });
      },
      cards: async () => {
        const cards = await prisma.card.findMany({
          where: {
            DeckCard: {
              some: {
                Deck: {
                  id: deck.id,
                },
              },
            },
          },
        });
        return cards.map((card) => {
          return {
            ...card,
            type: card.front_type,
          };
        });
      },
    };
  });
}
