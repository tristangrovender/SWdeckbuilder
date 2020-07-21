import { Toolbar, Content, Page } from "../components/Toolbar";
import styled from "styled-components";
import { DeckTile } from "../components/DeckTile";

const HomePageContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const HomePageTitle = styled.div`
  font-size: 64px;
  font-weight: bold;
  color: #333333;
  margin-top: 30px;
  margin-bottom: 15px;
`;

const HomePageH2 = styled.div`
  font-size: 32px;
  margin-bottom: 100px;
`;

const TileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default function Home() {
  return (
    <Page>
      <Toolbar />
      <Content>
        <HomePageContent>
          <HomePageTitle>SW:CCG DB</HomePageTitle>
          <HomePageH2>
            Deckbuilder for the Star Wars Customizable Card Game
          </HomePageH2>
          <TileContainer>
            <DeckTile
              img="/images/dark.png"
              title="May the 4th be with you"
              author="darthvoodoo"
              days={2}
              description="Fast paced, high stakes, fun deck"
              rating={3}
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
                sideDeck: 20
              }}
            />
            <DeckTile
              img="/images/light.png"
              title="Princess leia's legion"
              author="freeForce4you"
              days={10}
              description="Slow methodical deck good against many types"
              rating={5}
              cardBreakdown={{
                objectives: 3,
                locations: 5,
                characters: 40,
                creatures: 25,
                weapons: 10,
                devices: 13,
                starships: 13,
                vehicles: 13,
                effects: 5,
                interrupts: 2,
                epicEvents: 13,
                jediTests: 13,
                admiralsOrders: 2,
                podracers: 1,
                sideDeck: 20
              }}
            />
            <DeckTile
              img="/images/dark.png"
              title="PLANET DESTROYER"
              author="darthWillMaulYou"
              days={7}
              description="Weapons galore"
              rating={2.5}
              cardBreakdown={{
                objectives: 1,
                locations: 5,
                characters: 16,
                creatures: 25,
                weapons: 20,
                devices: 13,
                starships: 13,
                vehicles: 13,
                effects: 8,
                interrupts: 15,
                epicEvents: 13,
                jediTests: 13,
                admiralsOrders: 2,
                podracers: 1,
                sideDeck: 20
              }}
            />
            <DeckTile
              img="/images/light.png"
              title="Solo's surprise"
              author="Falconator"
              days={15}
              description="Fast paced, high stakes, fun deck"
              rating={4.5}
              cardBreakdown={{
                objectives: 1,
                locations: 5,
                characters: 33,
                creatures: 25,
                weapons: 14,
                devices: 13,
                starships: 13,
                vehicles: 13,
                effects: 11,
                interrupts: 1,
                epicEvents: 13,
                jediTests: 13,
                admiralsOrders: 2,
                podracers: 1,
                sideDeck: 20
              }}
            />
            <DeckTile
              img="/images/light.png"
              title="Jar Jar's Jam"
              author="solo547"
              days={12}
              description="Slow methodical deck good against many types"
              rating={3.5}
              cardBreakdown={{
                objectives: 4,
                locations: 5,
                characters: 39,
                creatures: 25,
                weapons: 11,
                devices: 13,
                starships: 13,
                vehicles: 13,
                effects: 1,
                interrupts: 5,
                epicEvents: 13,
                jediTests: 13,
                admiralsOrders: 2,
                podracers: 1,
                sideDeck: 20
              }}
            />
            <DeckTile
              img="/images/dark.png"
              title="Empire"
              author="IamYourFather?"
              days={1}
              description="Solid all around deck"
              rating={3}
              cardBreakdown={{
                objectives: 3,
                locations: 5,
                characters: 33,
                creatures: 25,
                weapons: 12,
                devices: 13,
                starships: 13,
                vehicles: 13,
                effects: 10,
                interrupts: 2,
                epicEvents: 13,
                jediTests: 13,
                admiralsOrders: 2,
                podracers: 1,
                sideDeck: 20
              }}
            />
          </TileContainer>
        </HomePageContent>
      </Content>
    </Page>
  );
}
