import { ApolloServer, gql } from "apollo-server-micro";
import schema from "raw-loader!../../graphql/schema.gql";
import { PrismaClient, Deck } from "@prisma/client";
import { recentDecks } from "../../server/resolvers/recent-decks";
import { getSharedUser } from "../../server/create-shared-user";
import jwt from "jsonwebtoken";
import { addCardToDeck } from "../../server/resolvers/mutation/add-card-to-deck";
import { CardResolver } from "../../server/resolvers/Card";
import { createDeck } from "../../server/resolvers/mutation/create-deck";
import { DeckCard } from "../../server/resolvers/DeckCard";
import { setStartingCard } from "../../server/resolvers/mutation/set-starting-card";
import { updateDeck } from "../../server/resolvers/mutation/update-deck";
import { decks } from "../../server/resolvers/query/decks";
import { createDeckRating } from "../../server/resolvers/mutation/create-deck-rating";

export const prisma = new PrismaClient();

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

const resolvers = {
  Query: {
    hello: (_parent, _args, _context) => "Hello!",
    recentDecks: () => recentDecks(prisma),
    cards: async () => {
      return (await prisma.card.findMany()).sort(sortCardsByName);
    },
    deck: (_parent, _args) => {
      return prisma.deck.findOne({
        where: { id: parseInt(_args.id) },
      });
    },
    decks,
  },
  Mutation: {
    login: async () => {
      const user = await getSharedUser(prisma);
      return {
        jwt: jwt.sign({ userId: user.id }, jwtSecret),
      };
    },
    updateDeck,
    setStartingCard,
    createDeck,
    createDeckRating,
    addCardToDeck,
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
    createdAt: (_parent) => _parent.created_at,
    title: (_parent) => _parent.title || "Un-named Deck",
    description: (_parent) => _parent.description || "",
    averageRating: () => 4.5,
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
  DeckCard: DeckCard,
  Card: CardResolver,
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
