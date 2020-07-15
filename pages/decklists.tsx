import { Toolbar, Content, Page } from "../components/Toolbar";
import { dummyDeck } from "../cards/dummyDecks";
import styled from "styled-components";
import { DeckFilter } from "../components/DeckFilter";
import StarsRating from "stars-rating";

const ratingChanged = newRating => {
  console.log(newRating);
};

const BodyContainer = styled.div`
  display: flex;
  background-color: white;
  margin-top: 30px;
  border-radius: 5px;
`;

const DeckFilterContainer = styled.div`
  width: 20%;
  border-right: 1px solid grey;
  border-bottom: 1px solid grey;
  margin-right: 70px;
`;

const Table = styled.div`
  color: white;
  height: 100vh;
  width: 65%;
`;

const DeckDiv = styled.div`
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
  /* width: 50%; */
  margin-left: 10px;
`;

const Title = styled.div`
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const Author = styled.div`
  /* margin-top: 4px; */
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
  /* flex-direction: row-reverse; */
  /* flex-direction: column-reverse; */
  font-size: 10px;
  margin-top: 6px;
  justify-content: flex-end;
  align-items: center;
`;

const Days = styled.div`
  font-size: 12px;
  /* margin-top: 10px; */
`;

export default function DeckLists() {
  return (
    <Page>
      <Toolbar />
      <Content>
        <BodyContainer>
          <DeckFilterContainer>
            <DeckFilter></DeckFilter>
          </DeckFilterContainer>
          <Table>
            {dummyDeck.map(deck => (
              <DeckDiv key={deck.id}>
                <Image src={deck.img}></Image>
                <TitleAuthorContainer>
                  <Title>{deck.title}</Title>
                  <Author>By {deck.author}</Author>
                </TitleAuthorContainer>
                <IconDaysDiv>
                  <TileRatingContainer>
                    <StarsRating
                      count={5} // number of stars
                      onChange={ratingChanged}
                      size={15}
                      color2={"#ffd700"}
                      edit={false}
                      value={deck.rating}
                      half={true}
                    />
                    <RatingText>133 ratings</RatingText>
                  </TileRatingContainer>
                  <Days>Created {deck.days} days ago</Days>
                </IconDaysDiv>
              </DeckDiv>
            ))}
          </Table>
        </BodyContainer>
      </Content>
    </Page>
  );
}
