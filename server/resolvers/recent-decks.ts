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
    };
  });
}
