import { Toolbar, Content, Page } from "../components/Toolbar";
import { LinearProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import styled from "styled-components";
import Footer from "../components/Footer";
import { getToken, getUserId } from "../utils/frontend-auth";
import Router from "next/router";
import { useQuery, gql } from "@apollo/client";
import { GetDecksQuery, GetDecksQueryVariables } from "../graphql/types";
import GetDecks from "raw-loader!../graphql/get-decks.gql";
import { DeckRow } from "../components/deck-row";

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

function DeckList({ decks }: { decks: GetDecksQuery["decks"] }) {
  return (
    <div>
      {decks.map((deck) => (
        <DeckRow deck={deck} />
      ))}
    </div>
  );
}

export default function MyDecks() {
  let userId;
  try {
    userId = getUserId();
    if (!getToken()) {
      Router.push({ pathname: "/login" });
    }
  } catch (e) {}
  const { data } = useQuery<GetDecksQuery, GetDecksQueryVariables>(
    gql(GetDecks),
    {
      variables: {
        authorId: userId,
      },
    }
  );
  const decks = data && data.decks;
  if (!decks) {
    return (
      <Page>
        <Toolbar />
        <LinearProgress />
      </Page>
    );
  }
  return (
    <Page>
      <Toolbar />
      <Content>
        {decks.length > 0 ? <DeckList decks={decks} /> : <NoDecks />}
      </Content>
      <Footer></Footer>
    </Page>
  );
}
