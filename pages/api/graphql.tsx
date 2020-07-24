import { ApolloServer, gql } from "apollo-server-micro";
import schema from "../../graphql/schema.gql";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const typeDefs = gql(schema + "");

const resolvers = {
  Query: {
    hello: (_parent, _args, _context) => "Hello!",
    recentDecks: async () => {
      const decks = await prisma.deck.findMany();
      return decks.map((deck) => {
        return {
          ...deck,
          averageRating: 4.5,
          description: "",
          createdAt: deck.created_at,
          author: () => {
            return prisma.user.findOne({
              where: {
                id: deck.authorId,
              },
            });
          },
        };
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
