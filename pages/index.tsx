import { Toolbar, Content, Page } from "../components/Toolbar";
import styled from "styled-components";
import { DeckTile } from "../components/DeckTile";
import Footer from "../components/Footer";
import { Side } from "../components/card-search-table/card.interface";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";

const client = new ApolloClient({
  // uri: window.location.origin + "/api/graphql",
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
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
    `,
  })
  .then((result) => console.log(result));

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
    side: Side.dark,
    title: "May the 4th be with you",
    author: "darthvoodoo",
    days: 2,
    description: "Fast paced, high stakes, fun deck",
    rating: 3.5,
  },
  {
    side: Side.light,
    title: "Princess leia's legion",
    author: "freeForce4you",
    days: 10,
    description: "Slow methodical deck good against many types",
    rating: 5,
  },
  {
    side: Side.dark,
    title: "PLANET DESTROYER",
    author: "darthWillMaulYou",
    days: 7,
    description: "Weapons galore",
    rating: 2.5,
  },
  {
    side: Side.light,
    title: "Solo's surprise",
    author: "Falconator",
    days: 15,
    description: "Fast paced, high stakes, fun deck",
    rating: 4.5,
  },
  {
    side: Side.dark,
    title: "Jar Jar's Jam",
    author: "solo547",
    days: 12,
    description: "Slow methodical deck good against many types",
    rating: 3.5,
  },
  {
    side: Side.dark,
    title: "Empire",
    author: "Iam Your Father?",
    days: 1,
    description: "Solid all around deck",
    rating: 3,
  },
];

export default function Home() {
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
            {dummyDecks.map(
              ({ side, title, author, days, description, rating }, i) => (
                <DeckTile
                  key={i}
                  img={
                    side === Side.dark
                      ? "/images/dark.png"
                      : "/images/light.png"
                  }
                  title={title}
                  days={days}
                  rating={rating}
                  description={description}
                  author={author}
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
