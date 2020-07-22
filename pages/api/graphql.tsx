import { ApolloServer, gql } from "apollo-server-micro";
import { Side } from "../../components/card-search-table/card.interface";

const typeDefs = gql`
  type Query {
    hello: String!
    recentDecks: [Deck]!
  }
  enum Side {
    Dark
    Light
  }
  type Deck {
    id: ID!
    side: Side!
    title: String!
  }
`;

const resolvers = {
  Query: {
    hello: (_parent, _args, _context) => "Hello!",
    recentDecks: () => [{ id: "test", title: "test", side: Side.dark }],
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
