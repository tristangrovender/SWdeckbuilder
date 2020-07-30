import { prisma } from "../../../pages/api/graphql";
export function createDeckRating(_parent, _args, _context) {
  if (!_context.userId) {
    throw new Error("Please signin");
  }
  if (_args.rating < 0 || _args.rating > 5) {
    throw new Error("Only ratings between 1 and 5 are allowed");
  }

  return prisma.deckRating.create({
    data: {
      Deck: {
        connect: {
          id: _args.deckId,
        },
      },
      User: {
        connect: {
          id: _context.userId,
        },
      },
      rating: _args.rating,
    },
  });
}
