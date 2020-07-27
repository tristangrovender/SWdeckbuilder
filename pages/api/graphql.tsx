import { ApolloServer, gql } from "apollo-server-micro";
import schema from "../../graphql/schema.gql";
import { PrismaClient } from "@prisma/client";
import { recentDecks } from "../../server/resolvers/recent-decks";
import { getSharedUser } from "../../server/create-shared-user";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const typeDefs = gql(schema + "");

// TODO put this secret into .env and load via .env npm module
const jwtSecret = "shhhhh";

function dbFieldsToApi(card) {
  return {
    id: card.id,
    type: card.front_type,
    card_id: card.card_id,
    side: card.side,
    rarity: card.rarity,
    set: card.set,
    title: card.front_title,
    imageUrl: card.front_imageurl,
    subType: card.front_subtype,
    destiny: card.front_destiny,
    power: card.front_power,
    deploy: card.front_deploy || undefined,
    forfeit: card.front_forfeit,
    gametext: card.front_gametext,
    lore: card.front_lore,
  };
}

const resolvers = {
  Query: {
    hello: (_parent, _args, _context) => "Hello!",
    recentDecks: () => recentDecks(prisma),
    cards: async () => {
      return (await prisma.card.findMany()).map(dbFieldsToApi);
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
      await prisma.deckCard.create({
        data: {
          Card: {
            connect: {
              id: _args.cardId,
            },
          },
          Deck: {
            connect: {
              id: _args.deckId,
            },
          },
        },
      });
      return {
        success: true,
      };
    },
    removeCardFromDeck: async (_parent, _args, _context) => {
      if (!_context.userId) {
        throw new Error("Please login");
      }
      await prisma.deckCard.delete({
        where: {
          id: _args.deckCardId,
        },
      });
      return {
        success: true,
      };
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, jwtSecret);
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
