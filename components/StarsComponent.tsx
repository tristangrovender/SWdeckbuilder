import StarsRating from "stars-rating";
import { RatingText } from "./DeckTile";
import { average } from "../utils/utils";
import { Maybe } from "../graphql/types";
import { getToken } from "../utils/frontend-auth";
export function StarsComponent({
  ratings,
  onChange,
}: {
  onChange?: (rating: number) => void;
  ratings: Maybe<{ id: string; rating: number }>[];
}) {
  const scores = ratings
    .map((rating) => rating?.rating)
    .filter((rating) => rating !== null && rating !== undefined) as number[];
  const isLoggedIn = Boolean(getToken());
  return (
    <>
      <StarsRating
        count={5}
        size={15}
        color2={"#ffd700"}
        edit={Boolean(onChange) && isLoggedIn}
        value={average(scores)}
        half={true}
        onChange={onChange}
      />
      <RatingText>{ratings.length} ratings</RatingText>
    </>
  );
}
