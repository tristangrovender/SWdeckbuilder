import { PrismaClient } from "@prisma/client";

export async function recentDecks(prisma: PrismaClient) {
  return prisma.deck.findMany({
    where: {
      NOT: {
        title: null,
      },
    },
    take: 6,
  });
}
