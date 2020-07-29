import { PrismaClient } from "@prisma/client";

export async function createDeck(prisma: PrismaClient) {
  return (_parent, _args, _context) => {
    if (!_context.userId) {
      throw new Error("Please login");
    }
    return prisma.deck.create({
      data: {
        side: _args.side,
        User: {
          connect: {
            id: _context.userId,
          },
        },
      },
    });
  };
}
