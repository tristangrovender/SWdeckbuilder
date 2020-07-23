import { ApolloServer, gql } from "apollo-server-micro";
import schema from "../../graphql/schema.gql";
import { dummyDeckData } from "../../utils/dummy-deck-data";
import { getRandomDeck } from "../deck/[id]";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  await prisma.user.create({
    data: {
      name: "test",
      email: "teset@test.io",
    },
  });
  const allUsers = await prisma.user.findMany({});
  console.dir(allUsers, { depth: null });
}
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.disconnect();
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
