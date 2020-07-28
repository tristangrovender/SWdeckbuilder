import { ApolloServer, gql } from "apollo-server-micro";
import schema from "../../graphql/schema.gql";
import { PrismaClient } from "@prisma/client";
import { recentDecks } from "../../server/resolvers/recent-decks";
import { getSharedUser } from "../../server/create-shared-user";
import jwt from "jsonwebtoken";
import { Resolvers } from "../../graphql/types";

const prisma = new PrismaClient();

const typeDefs = gql(schema + "");

// TODO put this secret into .env and load via .env npm module
const jwtSecret = "shhhhh";

function sortCardsByName(a: any, b: any) {
  const aTitle = a.front_title.replace(/[^0-9a-zA-z_.]/gi, "");
  const bTitle = b.front_title.replace(/[^0-9a-zA-z_.]/gi, "");

  if (aTitle < bTitle) {
    return -1;
  }
  if (aTitle > bTitle) {
    return 1;
  }
  return 0;
}

const resolvers: Resolvers = {
  Query: {
    hello: (_parent, _args, _context) => "Hello!",
    recentDecks: () => recentDecks(prisma),
    cards: async () => {
      return (await prisma.card.findMany()).sort(sortCardsByName);
    },
    deck: async (_parent, _args) => {
      return prisma.deck.findOne({
        where: { id: parseInt(_args.id) },
      });
    },
  },
  Mutation: {
    login: async () => {
      const user = await getSharedUser(prisma);
      return {
        jwt: jwt.sign({ userId: user.id }, jwtSecret),
      };
    },
    createDeck: async (_parent, _args, _context) => {
      if (!_context.userId) {
        throw new Error("Please login");
      }
      return prisma.deck.create({
        data: {
          side: _args.side,
          User: {
            connect: {
              id: _context.userId,
            },
          },
        },
      });
    },
    addCardToDeck: async (_parent, _args, _context) => {
      if (!_context.userId) {
        throw new Error("Please login");
      }
      const { id: newDeckCardId } = await prisma.deckCard.create({
        data: {
          Card: {
            connect: {
              id: parseInt(_args.cardId),
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
    },
    removeCardFromDeck: async (_parent, _args, _context) => {
      if (!_context.userId) {
        throw new Error("Please login");
      }
      await prisma.deckCard.delete({
        where: {
          id: parseInt(_args.deckCardId),
        },
      });
      return {
        success: true,
      };
    },
  },
  Deck: {
    title: (_parent) => (_parent.title ? _parent.title : "Un-named Deck"),
    author: (_parent) => {
      return prisma.user.findOne({
        where: {
          id: _parent.authorId,
        },
      });
    },
    deckCards: (_parent) => {
      return prisma.deckCard.findMany({
        where: {
          Deck: {
            id: _parent.id,
          },
        },
      });
    },
  },
  DeckCard: {
    updatedAt: (_parent) => _parent.updated_at,
    createdAt: (_parent) => _parent.created_at,
    isInSideDeck: (_parent) => _parent.is_in_side_deck,
    card: (_parent) => {
      return prisma.card.findOne({
        where: {
          id: _parent.cardId,
        },
      });
    },
    deck: (_parent) => {
      return prisma.deck.findOne({
        where: {
          id: _parent.deckId,
        },
      });
    },
  },
  Card: {
    id: (_parent) => _parent.id,
    type: (_parent) => _parent.front_type,
    cardId: (_parent) => _parent.card_id,
    side: (_parent) => _parent.side,
    rarity: (_parent) => _parent.rarity,
    set: (_parent) => _parent.set,
    title: (_parent) => _parent.front_title,
    imageUrl: (_parent) => _parent.front_imageurl,
    subType: (_parent) => _parent.front_subtype,
    destiny: (_parent) => _parent.front_destiny,
    power: (_parent) => _parent.front_power,
    deploy: (_parent) => _parent.front_deploy || undefined,
    forfeit: (_parent) => _parent.front_forfeit,
    gametext: (_parent) => _parent.front_gametext,
    lore: (_parent) => _parent.front_lore,
    gemp_card_id: (_parent) => _parent.gemp_card_id,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, jwtSecret) as { userId: string };
      return { userId: decoded.userId };
    } catch (e) {
      return {};
    }
  },
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
