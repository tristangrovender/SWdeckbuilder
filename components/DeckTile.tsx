import styled from "styled-components";

import StarsRating from "stars-rating";

const ratingChanged = newRating => {
  console.log(newRating);
};

const Tile = styled.div`
  background-color: white;
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
  padding-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
`;

const TileRatingContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const RatingText = styled.div`
  font-size: 10px;
  margin-left: 10px;
  color: black;
`;

const TileDeckCardTypes = styled.div`
  color: black;
  font-size: 12px;
  padding-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
`;

export function DeckTile({
  img,
  title,
  author,
  days,
  description,
  cardBreakdown,
  rating
}: {
  img: string;
  title: string;
  author: string;
  days: number;
  description: string;
  rating: number;
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
      <TileDeckCardTypes>
        {cardBreakdown.characters} Characters • {cardBreakdown.effects} Effects
        • {cardBreakdown.weapons} Weapons • {cardBreakdown.interrupts}{" "}
        Interrupts • {cardBreakdown.objectives} Objectives
      </TileDeckCardTypes>
      <TileRatingContainer>
        <StarsRating
          count={5} // number of stars
          // onChange={ratingChanged}
          size={15}
          color2={"#ffd700"}
          edit={false}
          value={rating}
          half={true}
        />
        <RatingText>133 ratings</RatingText>
      </TileRatingContainer>
    </Tile>
  );
}
