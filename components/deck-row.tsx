import StarsRating from "stars-rating";
import moment from "moment";
import styled from "styled-components";
import { GetDecksQuery, Side } from "../graphql/types";
import { useRouter } from "next/router";

const DeckDiv = styled.div`
  cursor: pointer;
  display: flex;
  height: 75px;
  color: black;
  border-bottom: 1px solid grey;
`;

const Image = styled.img`
  height: 65px;
  margin: 5px;
`;

const TitleAuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Title = styled.div`
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const Author = styled.div`
  font-size: 10px;
`;

const IconDaysDiv = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  justify-content: flex-end;
  padding-top: 14px;
  flex-grow: 1;
  margin-right: 20px;
`;

const RatingText = styled.div`
  font-size: 10px;
  margin-left: 10px;
  color: black;
`;

const TileRatingContainer = styled.div`
  display: flex;
  font-size: 10px;
  margin-top: 6px;
  justify-content: flex-end;
  align-items: center;
`;

const Days = styled.div`
  font-size: 12px;
`;

const ratingChanged = (newRating: number) => {
  console.log(newRating);
};

type Deck = GetDecksQuery["decks"][0];

export function DeckRow({ deck }: { deck: Deck }) {
  const router = useRouter();
  if (!deck) {
    return null;
  }
  return (
    <DeckDiv key={deck.id} onClick={() => router.push("/deck/111")}>
      <Image
        src={deck.side === Side.Dark ? "/images/dark.png" : "/images/light.png"}
      ></Image>
      <TitleAuthorContainer>
        <Title>{deck.title}</Title>
        <Author>By {deck.author.username}</Author>
      </TitleAuthorContainer>
      <IconDaysDiv>
        <TileRatingContainer>
          <StarsRating
            count={5} // number of stars
            onChange={ratingChanged}
            size={15}
            color2={"#ffd700"}
            edit={false}
            value={deck.averageRating}
            half={true}
          />
          <RatingText>133 ratings</RatingText>
        </TileRatingContainer>
        <Days>Created {moment(deck.createdAt).from(moment(new Date()))}</Days>
      </IconDaysDiv>
    </DeckDiv>
  );
}
