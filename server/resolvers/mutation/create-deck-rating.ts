import { prisma } from "../../../pages/api/graphql";

export async function createDeckRating(_parent, _args, _context) {
  if (!_context.userId) {
    throw new Error("Please signin");
  }
  if (_args.rating < 0 || _args.rating > 5) {
    throw new Error("Only ratings between 1 and 5 are allowed");
  }

  const previousRatings = await prisma.deckRating.findMany({
    where: {
      Deck: {
        id: parseInt(_args.deckId),
      },
      User: {
        id: parseInt(_context.userId),
      },
    },
  });
  let rating;
  if (previousRatings.length > 0) {
    rating = await prisma.deckRating.update({
      where: {
        id: previousRatings[0].id as number,
      },
      data: {
        rating: _args.rating,
      },
    });
  } else {
    rating = await prisma.deckRating.create({
      data: {
        Deck: {
          connect: {
            id: parseInt(_args.deckId),
          },
        },
        User: {
          connect: {
            id: parseInt(_context.userId),
          },
        },
        rating: _args.rating,
      },
    });
  }

  return {
    ...rating,
    deck: () =>
      prisma.deck.findOne({
        where: {
          id: parseInt(_args.deckId),
        },
      }),
  };
}
