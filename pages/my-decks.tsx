import { Toolbar, Content, Page } from "../components/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import styled from "styled-components";
import Footer from "../components/Footer";
import { getToken } from "../utils/frontend-auth";
import Router from "next/router";
import { useQuery, gql } from "@apollo/client";
import { GetDecksQuery, GetDecksQueryVariables } from "../graphql/types";
import GetDecks from "raw-loader!../graphql/get-decks.gql";

const NoDecksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

function NoDecks() {
  return (
    <NoDecksContainer>
      <div>Build your first deck:&nbsp;</div>
      <Link href="/deck/new">
        <Button variant="contained" color="primary">
          New Deck
        </Button>
      </Link>
    </NoDecksContainer>
  );
}

export default function MyDecks() {
  try {
    if (!getToken()) {
      Router.push({ pathname: "/login" });
    }
  } catch (e) {}
  const { data } = useQuery<GetDecksQuery, GetDecksQueryVariables>(
    gql(GetDecks)
  );
  const decks = data && data.decks;
  if (!decks) {
    return <div>No decks found</div>;
  }
  console.log(decks);
  return (
    <Page>
      <Toolbar />
      <Content>
        <NoDecks />
      </Content>
      <Footer></Footer>
    </Page>
  );
}
