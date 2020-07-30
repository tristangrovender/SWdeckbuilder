import { prisma } from "../../../pages/api/graphql";
import {
  ResolversParentTypes,
  MutationUpdateDeckArgs,
  RequireFields,
} from "../../../graphql/types";
import { Context } from "@apollo/client";

export async function updateDeck(
  _parent: ResolversParentTypes,
  _args: RequireFields<MutationUpdateDeckArgs, "deckId" | "updates">,
  _context: Context
) {
  const deck = await prisma.deck.findOne({
    where: {
      id: parseInt(_args.deckId),
    },
  });
  if (_context.userId !== deck?.authorId) {
    throw new Error("This deck doesn't belong to you.");
  }
  return prisma.deck.update({
    where: {
      id: parseInt(_args.deckId),
    },
    data: {
      title: _args.updates.title,
      description: _args.updates.description,
      published: _args.updates.published,
    },
  });
}
