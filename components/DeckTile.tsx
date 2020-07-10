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

export function DeckTile() {
  return (
    <Tile>
      <TileBanner>
        May the 4th be with you
        <TileBannerAuthor>by darthvoodoo 2 · days ago</TileBannerAuthor>
      </TileBanner>
      <TileBannerDeck>Deck: Dark</TileBannerDeck>
      <TileBannerDeckContents>
        35 Characters • 10 Effects • 13 Weapons • 15 Interrupts • 3 Objectives
      </TileBannerDeckContents>
    </Tile>
  );
}
