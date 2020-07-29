import { prisma } from "../../pages/api/graphql";

export async function setStartingCard(_parent, _args) {
  const startingCard = await prisma.deckCard.update({
    where: {
      id: parseInt(_args.deckCardId),
    },
    data: {
      is_starting_card: _args.isStartingCard,
    },
  });
  return startingCard;
}
