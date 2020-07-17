import StarsRating from "stars-rating";
import { RatingText } from "./DeckTile";
export function StarsComponent({ rating }: { rating: number }) {
  return (
    <>
      <StarsRating
        count={5}
        size={15}
        color2={"#ffd700"}
        edit={false}
        value={rating}
        half={true}
      />
      <RatingText>133 ratings</RatingText>
    </>
  );
}
