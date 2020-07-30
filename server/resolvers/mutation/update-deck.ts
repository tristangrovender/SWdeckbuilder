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
