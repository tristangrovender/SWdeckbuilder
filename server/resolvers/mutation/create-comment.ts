import { prisma } from "../../../pages/api/graphql";

export function createComment(_parent, _args, _context) {
  if (!_context.userId) {
    throw new Error("Please signin");
  }
  if (!_args.deckId && !_args.cardId) {
    throw new Error("Either deckId or cardId is required for a comment");
  }
  if (_args.deckId && _args.cardId) {
    throw new Error("Only deckId or cardId can be provided for a comment");
  }

  return prisma.comment.create({
    data: {
      User: {
        connect: {
          id: _context.userId,
        },
      },
      ...(_args.deckId
        ? {
            Deck: {
              connect: {
                id: parseInt(_args.deckId),
              },
            },
          }
        : {
            Card: {
              connect: {
                id: parseInt(_args.cardId),
              },
            },
          }),
      comment: _args.comment,
    },
  });
}
