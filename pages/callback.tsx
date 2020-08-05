import Login from "raw-loader!../graphql/login.gql";
import { useMutation, gql } from "@apollo/client";
import { LoginMutationVariables, LoginMutation } from "../graphql/types";
import { LinearProgress } from "@material-ui/core";
import { setToken } from "../utils/frontend-auth";
import Router from "next/router";

export default function Callback() {
  const [login] = useMutation<LoginMutation, LoginMutationVariables>(
    gql(Login)
  );
  try {
    const hash = window.location.href.split("#")[1];
    const [_, token] = hash
      .split("&")
      .map((segment) => segment.split("="))
      .find(([key]) => key === "access_token");
    login({
      variables: {
        awsJWTToken: token,
      },
    }).then(({ data }) => {
      const jwt = data && data.login && data.login.jwt;
      if (jwt) {
        setToken(jwt);
        Router.push({
          pathname: "/my-decks",
        });
      } else {
        console.log("JWT not found", data);
      }
    });
    return <LinearProgress />;
  } catch (e) {
    console.log(e);
    return <div>Error</div>;
  }
}
