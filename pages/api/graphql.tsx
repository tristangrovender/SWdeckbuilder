import { ApolloServer, gql } from "apollo-server-micro";
import { Side } from "../../components/card-search-table/card.interface";
import * as schema from "../../graphql/schema.gql";

const typeDefs = gql(schema);

const resolvers = {
  Query: {
    hello: (_parent, _args, _context) => "Hello!",
    recentDecks: () => [
      {
        id: "1",
        side: Side.dark,
        title: "May the 4th be with you",
        createdAt: new Date(),
        author: { username: "darthvoodoo" },
        days: 2,
        description: "Fast paced, high stakes, fun deck",
        rating: 3.5,
      },
      {
        id: "2",
        side: Side.light,
        title: "Princess leia's legion",
        createdAt: new Date(),
        author: { username: "freeForce4you" },
        days: 10,
        description: "Slow methodical deck good against many types",
        rating: 5,
      },
      {
        id: "3",
        side: Side.dark,
        title: "PLANET DESTROYER",
        createdAt: new Date(),
        author: { username: "darthWillMaulYou" },
        days: 7,
        description: "Weapons galore",
        rating: 2.5,
      },
      {
        id: "4",
        side: Side.light,
        title: "Solo's surprise",
        createdAt: new Date(),
        author: { username: "Falconator" },
        days: 15,
        description: "Fast paced, high stakes, fun deck",
        rating: 4.5,
      },
      {
        id: "5",
        side: Side.dark,
        title: "Jar Jar's Jam",
        createdAt: new Date(),
        author: { username: "solo547" },
        days: 12,
        description: "Slow methodical deck good against many types",
        rating: 3.5,
      },
      {
        id: "6",
        side: Side.dark,
        title: "Empire",
        createdAt: new Date(),
        author: { username: "Iam Your Father?" },
        days: 1,
        description: "Solid all around deck",
        rating: 3,
      },
    ],
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
