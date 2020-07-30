import { prisma } from "../../../pages/api/graphql";

export async function updateDeck(_parent, _args) {
  return prisma.deck.update({
    where: {
      id: parseInt(_args.deckId),
    },
    data: {
      title: _args.updates.title,
      description: _args.updates.description,
    },
  });
}
