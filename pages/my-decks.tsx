import { Toolbar, Content, Page } from "../components/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import styled from "styled-components";
import Footer from "../components/Footer";
import { getToken } from "../utils/frontend-auth";
import Router from "next/router";

const NoDecksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default function MyDecks() {
  if (!getToken()) {
    Router.push({ pathname: "/login" });
  }
  return (
    <Page>
      <Toolbar />
      <Content>
        <NoDecksContainer>
          <div>Build your first deck:&nbsp;</div>
          <Link href="/deck/new">
            <Button variant="contained" color="primary">
              New Deck
            </Button>
          </Link>
        </NoDecksContainer>
      </Content>
      <Footer></Footer>
    </Page>
  );
}
