import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getToken } from "../utils/frontend-auth";

function getOrigin() {
  try {
    return window.location.origin;
  } catch (e) {
    return;
  }
}

const httpLink = createHttpLink({
  uri: getOrigin() + "/api/graphql",
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
