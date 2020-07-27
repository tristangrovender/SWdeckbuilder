import { ApolloServer, gql } from "apollo-server-micro";
import schema from "../../graphql/schema.gql";
import { PrismaClient } from "@prisma/client";
import { recentDecks } from "../../server/resolvers/recent-decks";
import { getSharedUser } from "../../server/create-shared-user";

const prisma = new PrismaClient();

const typeDefs = gql(schema + "");

const resolvers = {
  Query: {
    hello: (_parent, _args, _context) => "Hello!",
    recentDecks: () => recentDecks(prisma),
  },
  Mutation: {
    login: () => {
      return {
        jwt: "hi",
      };
    },
    createDeck: async (_parent, _args) => {
      const user = await getSharedUser(prisma);
      return prisma.deck.create({
        data: {
          side: _args.side,
          User: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    },
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
