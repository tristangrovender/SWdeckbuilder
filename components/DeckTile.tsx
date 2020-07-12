import styled from "styled-components";

const Tile = styled.div`
  background-color: white;
  border: 3px solid red;
  color: white;
  width: 500px;
  height: 150px;
`;

const TileBanner = styled.div`
  height: 50px;
  background-color: #1d7a99;
  font-size: 16px;
  padding: 5px;
`;

const TileBannerAuthor = styled.div`
  font-size: 10px;
`;

const TileBannerDeck = styled.div`
  color: black;
  font-size: 14px;
`;

const TileBannerDeckContents = styled.div`
  color: black;
  font-size: 14px;
`;

export function DeckTile({
  title,
  author,
  days,
  deck,
  cardBreakdown
}: {
  title: string;
  author: string;
  days: number;
  deck: string;
  cardBreakdown: {
    characters: number;
    effects: number;
    weapons: number;
    interrupts: number;
    objectives: number;
  };
}) {
  return (
    <Tile>
      <TileBanner>
        {title}
        <TileBannerAuthor>
          by {author} · {days} days ago
        </TileBannerAuthor>
      </TileBanner>
      <TileBannerDeck>Deck: {deck}</TileBannerDeck>
      <TileBannerDeckContents>
        {cardBreakdown.characters} Characters • {cardBreakdown.effects} Effects
        • {cardBreakdown.weapons} Weapons • {cardBreakdown.interrupts}{" "}
        Interrupts • {cardBreakdown.objectives} Objectives
      </TileBannerDeckContents>
    </Tile>
  );
}
