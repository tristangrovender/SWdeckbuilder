import styled from "styled-components";
// import dark from "../public/images/dark.png";

const Tile = styled.div`
  background-color: white;
  /* border: 3px solid red; */
  color: white;
  width: 450px;
  height: 125px;
  margin-bottom: 40px;
`;

const TileBannerImage = styled.img`
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #1d7a99;
`;

const TileBannerContainer = styled.div`
  display: flex;
`;

const TileBanner = styled.div`
  height: 50px;
  background-color: #1d7a99;
  font-size: 16px;
  padding: 5px;
  width: 100%;
`;

const TileAuthor = styled.div`
  font-size: 10px;
`;

const TileDescription = styled.div`
  color: black;
  font-size: 14px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

const TileDeckContents = styled.div`
  color: black;
  font-size: 14px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

export function DeckTile({
  img,
  title,
  author,
  days,
  description,
  cardBreakdown
}: {
  img: string;
  title: string;
  author: string;
  days: number;
  description: string;
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
      <TileBannerContainer>
        <TileBannerImage src={img} />
        <TileBanner>
          {title}
          <TileAuthor>
            by {author} · {days} days ago
          </TileAuthor>
        </TileBanner>
      </TileBannerContainer>
      <TileDescription>Description: {description}</TileDescription>
      <TileDeckContents>
        {cardBreakdown.characters} Characters • {cardBreakdown.effects} Effects
        • {cardBreakdown.weapons} Weapons • {cardBreakdown.interrupts}{" "}
        Interrupts • {cardBreakdown.objectives} Objectives
      </TileDeckContents>
    </Tile>
  );
}
