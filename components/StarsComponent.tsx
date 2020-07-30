import StarsRating from "stars-rating";
import { RatingText } from "./DeckTile";
import { average } from "../utils/utils";
import { Maybe } from "../graphql/types";
export function StarsComponent({
  ratings,
}: {
  ratings: Maybe<{ id: string; rating: number }>[];
}) {
  const scores = ratings
    .map((rating) => rating?.rating)
    .filter((rating) => rating !== null && rating !== undefined) as number[];
  return (
    <>
      <StarsRating
        count={5}
        size={15}
        color2={"#ffd700"}
        edit={false}
        value={average(scores)}
        half={true}
      />
      <RatingText>{ratings.length} ratings</RatingText>
    </>
  );
}
