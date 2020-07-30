import { prisma } from "../../../pages/api/graphql";
import {
  ResolversParentTypes,
  RequireFields,
  QueryDecksArgs,
} from "../../../graphql/types";
import { Context } from "@apollo/client";

export function decks(
  _parent: ResolversParentTypes,
  _args: RequireFields<QueryDecksArgs, "authorId">,
  _context: Context
) {
  if (_args.authorId) {
    if (parseInt(_args.authorId) !== _context.userId) {
      throw new Error("You can only query for your own decks");
    } else {
      if (_args.authorId) {
        return prisma.deck.findMany({
          orderBy: {
            updated_at: "desc",
          },
          where: {
            User: {
              id: parseInt(_args.authorId),
            },
          },
        });
      }
    }
  }
  return prisma.deck.findMany({
    orderBy: {
      updated_at: "desc",
    },
    where: {
      published: true,
    },
  });
}
