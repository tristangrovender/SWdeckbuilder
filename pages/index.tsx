import { Toolbar, Content, Page } from "../components/Toolbar";
import styled from "styled-components";
import { DeckTile } from "../components/DeckTile";
import Footer from "../components/Footer";
import { useQuery, gql } from "@apollo/client";
import {
  GetRecentDecksQuery as GetRecentDecksQueryI,
  Side,
} from "../graphql/types";
import GetRecentDecksQuery from "../graphql/get-recent-decks.gql";

const HomePageContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const HomePageTitle = styled.div`
  font-size: 64px;
  font-weight: bold;
  color: #333333;
  margin-top: 20px;
`;

const HomePageH2 = styled.div`
  font-size: 32px;
  margin-bottom: 25px;
`;

const RecentTitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  border-bottom: 2px solid #404040;
  width: 100%;
  margin-bottom: 20px;
`;

const RecentTitle = styled.div`
  display: flex;
  display: block;
  width: 122px;
  height: 40px;
  font-size: 20px;
  text-align: center;
  color: #404040;
  border-radius: 4px;
`;

const TileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default function Home() {
  const { data } = useQuery<GetRecentDecksQueryI>(gql(GetRecentDecksQuery));

  return (
    <Page>
      <Toolbar />
      <Content>
        <HomePageContent>
          <HomePageTitle>SW:CCG DB</HomePageTitle>
          <HomePageH2>Deckbuilder for the Star Wars Card Game</HomePageH2>
          <RecentTitleContainer>
            <RecentTitle>Recent decks</RecentTitle>
          </RecentTitleContainer>
          <TileContainer>
            {data &&
              data.recentDecks.map((deck, i) => {
                if (!deck) {
                  return;
                }
                return (
                  <DeckTile
                    key={i}
                    img={
                      deck.side === Side.Dark
                        ? "/images/dark.png"
                        : "/images/light.png"
                    }
                    title={deck.title}
                    createdAt={deck.createdAt}
                    rating={deck.averageRating || undefined}
                    description={deck.description}
                    author={deck.author.username}
                    types={
                      deck.deckCards
                        .map((deckCard) => deckCard?.card.type)
                        .filter(Boolean) as string[]
                    }
                  />
                );
              })}
          </TileContainer>
        </HomePageContent>
      </Content>
      <Footer></Footer>
    </Page>
  );
}
