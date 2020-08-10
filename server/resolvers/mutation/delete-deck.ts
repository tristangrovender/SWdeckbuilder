import { prisma } from "../../../pages/api/graphql";
export async function deleteDeck(_parent, _args, _context) {
  const deck = await prisma.deck.findOne({
    where: {
      id: parseInt(_args.deckId),
    },
  });

  if (deck.authorId !== _context.userId) {
    throw new Error("You can only delete decks you created.");
  }

  await prisma.deck.update({
    where: {
      id: parseInt(_args.deckId),
    },
    data: {
      deleted: true,
    },
  });

  return {
    success: true,
  };
}
