import { Card } from "@prisma/client";
import { prisma } from "../../../pages/api/graphql";

function isCardInSideDeck(card: Card) {
  return (
    card.front_type === "Objective" || card.front_type === "Defensive Shield"
  );
}
export async function addCardToDeck(_parent, _args, _context) {
  if (!_context.userId) {
    throw new Error("Please login");
  }
  const cardToAdd = await prisma.card.findOne({
    where: {
      id: parseInt(_args.cardId),
    },
  });
  if (!cardToAdd) {
    throw new Error(`card not found: ${_args.cardId}`);
  }
  const { id: newDeckCardId } = await prisma.deckCard.create({
    data: {
      is_in_side_deck: isCardInSideDeck(cardToAdd),
      Card: {
        connect: {
          id: cardToAdd.id,
        },
      },
      Deck: {
        connect: {
          id: parseInt(_args.deckId),
        },
      },
    },
  });
  return {
    newDeckCardId,
  };
}
