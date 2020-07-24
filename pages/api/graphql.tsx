import { ApolloServer, gql } from "apollo-server-micro";
import schema from "../../graphql/schema.gql";
import { dummyDeckData } from "../../utils/dummy-deck-data";
import { getRandomDeck } from "../deck/[id]";
import { PrismaClient } from "@prisma/client";
import { getSharedUser } from "../../server/create-shared-user";
const cards = require("../../cards/cards.json");

const prisma = new PrismaClient();
const sharedUser$ = getSharedUser(prisma);
sharedUser$.then((user) => {
  console.log("woohoo", user);
});

const typeDefs = gql(schema + "");

const resolvers = {
  Query: {
    hello: (_parent, _args, _context) => "Hello!",
    recentDecks: () =>
      dummyDeckData.map((deck) => {
        return {
          ...deck,
          cards: getRandomDeck(cards),
        };
      }),
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {};
  },
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
