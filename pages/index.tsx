import { Toolbar, Content, Page } from "../components/Toolbar";
import styled from "styled-components";
import { DeckTile } from "../components/DeckTile";
import Footer from "../components/Footer";
import { useQuery, gql } from "@apollo/client";
import {
  GetRecentDecksQuery as GetRecentDecksQueryI,
  Side,
} from "../graphql/types";

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

const GetRecentDecksQuery = gql`
  query GetRecentDecks {
    recentDecks {
      id
      side
      title
      description
      author {
        username
      }
      createdAt
      averageRating
    }
  }
`;

export default function Home() {
  const { data }: { data: GetRecentDecksQueryI } = useQuery(
    GetRecentDecksQuery
  );

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
              data.recentDecks.map(
                (
                  {
                    side,
                    title,
                    author: { username },
                    description,
                    averageRating,
                  },
                  i
                ) => (
                  <DeckTile
                    key={i}
                    img={
                      side === Side.Dark
                        ? "/images/dark.png"
                        : "/images/light.png"
                    }
                    title={title}
                    days={2}
                    rating={averageRating}
                    description={description}
                    author={username}
                    cardBreakdown={{
                      objectives: 5,
                      locations: 5,
                      characters: 25,
                      creatures: 25,
                      weapons: 13,
                      devices: 13,
                      starships: 13,
                      vehicles: 13,
                      effects: 10,
                      interrupts: 7,
                      epicEvents: 13,
                      jediTests: 13,
                      admiralsOrders: 2,
                      podracers: 1,
                    }}
                  />
                )
              )}
          </TileContainer>
        </HomePageContent>
      </Content>
      <Footer></Footer>
    </Page>
  );
}
