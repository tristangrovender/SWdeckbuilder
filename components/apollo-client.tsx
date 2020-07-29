import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getToken } from "../utils/frontend-auth";

const httpLink = createHttpLink({
  // TODO figure out how to make this work on local and production
  uri: "https://sw-deckbuilder.danielrasmuson.vercel.app/api/graphql",
});

const authLink = setContext((_, { headers }) => {
  let token;
  try {
    token = getToken();
  } catch {}
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
