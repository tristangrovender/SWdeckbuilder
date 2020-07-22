import { ApolloServer, gql } from "apollo-server-micro";
import schema from "../../graphql/schema.gql";
import { dummyDeckData } from "../../utils/dummy-deck-data";
import { Card } from "../../components/card-search-table/card.interface";
const cards = require("../../cards/cards.json");

function generateDeck(allCards: Card[]): Card[] {
  /// TODO maake smarter
  return allCards.slice(0, 60);
}

const typeDefs = gql(schema);

const resolvers = {
  Query: {
    hello: (_parent, _args, _context) => "Hello!",
    recentDecks: () =>
      dummyDeckData.map((deck) => {
        return {
          ...deck,
          cards: generateDeck(cards),
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
