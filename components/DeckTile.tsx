import styled from "styled-components";

const Tile = styled.div`
  border: 3px solid red;
  color: white;
  width: 500px;
  height: 150px;
`;

const TileBanner = styled.div`
  height: 50px;
  background-color: #1d7a99;
`;

export function DeckTile() {
  return (
    <Tile>
      <TileBanner>May the 4th be with you</TileBanner>
    </Tile>
  );
}
