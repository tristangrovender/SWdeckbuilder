import { ApolloServer, gql } from "apollo-server-micro";
import schema from "../../graphql/schema.gql";
import { dummyDeckData } from "../../utils/dummy-deck-data";
import { getRandomDeck } from "../deck/[id]";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const sharedUserId$ = (async function () {
  const sharedUser = await prisma.user.findOne({
    where: {
      email: "allusers@example.com",
    },
  });
  if (sharedUser) {
    return sharedUser.id;
  }

  return prisma.user.create({
    data: {
      email: "allusers@example.com",
      name: "Shared User Account",
    },
  });
})();
sharedUserId$.then((id) => {
  console.log("id", id);
});

const cards = require("../../cards/cards.json");

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
