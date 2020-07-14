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
  /* max-width: 800px; */
`;

// const Tile = styled.div`
//   display: flex;
// `;

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
              cardBreakdown={{
                characters: 25,
                effects: 10,
                weapons: 13,
                interrupts: 7,
                objectives: 5
              }}
            />
            <DeckTile
              img="/images/light.png"
              title="Princess leia's legion"
              author="freeForce4you"
              days={10}
              description="Slow methodical deck good against many types"
              cardBreakdown={{
                characters: 40,
                effects: 5,
                weapons: 10,
                interrupts: 2,
                objectives: 3
              }}
            />
            <DeckTile
              img="/images/dark.png"
              title="PLANET DESTROYER"
              author="darthWillMaulYou"
              days={7}
              description="Weapons galore"
              cardBreakdown={{
                characters: 10,
                effects: 10,
                weapons: 20,
                interrupts: 15,
                objectives: 5
              }}
            />
            <DeckTile
              img="/images/light.png"
              title="Solo's surprise"
              author="Falconator"
              days={15}
              description="Fast paced, high stakes, fun deck"
              cardBreakdown={{
                characters: 33,
                effects: 11,
                weapons: 14,
                interrupts: 1,
                objectives: 1
              }}
            />
            <DeckTile
              img="/images/light.png"
              title="Jar Jar's Jam"
              author="solo547"
              days={12}
              description="Slow methodical deck good against many types"
              cardBreakdown={{
                characters: 39,
                effects: 1,
                weapons: 11,
                interrupts: 5,
                objectives: 4
              }}
            />
            <DeckTile
              img="/images/dark.png"
              title="Empire"
              author="IamYourFather?"
              days={1}
              description="Solid all around deck"
              cardBreakdown={{
                characters: 33,
                effects: 10,
                weapons: 12,
                interrupts: 2,
                objectives: 3
              }}
            />
          </TileContainer>
        </HomePageContent>
      </Content>
    </Page>
  );
}
