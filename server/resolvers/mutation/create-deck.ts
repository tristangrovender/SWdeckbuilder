import { prisma } from "../../../pages/api/graphql";

export async function createDeck(_parent, _args, _context) {
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
}
