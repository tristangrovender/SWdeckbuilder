import { PrismaClient } from "@prisma/client";

export async function recentDecks(prisma: PrismaClient) {
  return prisma.deck.findMany({
    where: {
      deleted: false,
      published: true,
    },
    take: 6,
  });
}
