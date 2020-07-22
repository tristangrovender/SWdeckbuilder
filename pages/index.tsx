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

const dummyDecks = [
  {
    side: Side.Dark,
    title: "May the 4th be with you",
    author: "darthvoodoo",
    days: 2,
    description: "Fast paced, high stakes, fun deck",
    rating: 3.5,
  },
  {
    side: Side.Light,
    title: "Princess leia's legion",
    author: "freeForce4you",
    days: 10,
    description: "Slow methodical deck good against many types",
    rating: 5,
  },
  {
    side: Side.Dark,
    title: "PLANET DESTROYER",
    author: "darthWillMaulYou",
    days: 7,
    description: "Weapons galore",
    rating: 2.5,
  },
  {
    side: Side.Light,
    title: "Solo's surprise",
    author: "Falconator",
    days: 15,
    description: "Fast paced, high stakes, fun deck",
    rating: 4.5,
  },
  {
    side: Side.Dark,
    title: "Jar Jar's Jam",
    author: "solo547",
    days: 12,
    description: "Slow methodical deck good against many types",
    rating: 3.5,
  },
  {
    side: Side.Dark,
    title: "Empire",
    author: "Iam Your Father?",
    days: 1,
    description: "Solid all around deck",
    rating: 3,
  },
];

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

  console.log("data!", data);

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
