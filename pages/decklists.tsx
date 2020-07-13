import { Toolbar, Content, Page } from "../components/Toolbar";
import { dummyDeck } from "../cards/dummyDecks";
import styled from "styled-components";
import Favorite from "@material-ui/icons/Favorite";
import { DeckFilter } from "../components/DeckFilter";

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
  width: 75%;
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
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  padding-bottom: 12px;
  flex-grow: 1;
  margin-right: 20px;
`;

const HeartDiv = styled.div`
  display: flex;
  direction: row;
  font-size: 10px;
  color: red;
  justify-content: flex-end;
`;

const Days = styled.div`
  font-size: 12px;
  margin-top: 10px;
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
                  <HeartDiv>
                    <Favorite
                      style={{
                        color: "red",
                        fontSize: "14px",
                        marginRight: "4px"
                      }}
                    ></Favorite>
                    0
                  </HeartDiv>
                  <Days>{deck.days} days ago</Days>
                </IconDaysDiv>
              </DeckDiv>
            ))}
          </Table>
        </BodyContainer>
      </Content>
    </Page>
  );
}
