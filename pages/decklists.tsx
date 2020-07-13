import { Toolbar, Content, Page } from "../components/Toolbar";
import { dummyDeck } from "../cards/dummyDecks";
import styled from "styled-components";
import Favorite from "@material-ui/icons/Favorite";
import { red } from "@material-ui/core/colors";

const Table = styled.div`
  background-color: grey;
  color: white;
  height: 100vh;
  margin-top: 30px;
  width: 75%;
`;

const DeckDiv = styled.div`
  display: flex;
  height: 75px;
  background-color: #ecf0f1;
  color: black;
  border-top: 1px dotted grey;
`;

const Image = styled.img`
  height: 65px;
  margin: 5px;
`;

const TitleAuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
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
  align-items: flex-start;
  justify-content: flex-end;
  padding-bottom: 12px;
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
                    style={{ color: "red", fontSize: "14px" }}
                  ></Favorite>
                  0
                </HeartDiv>
                <Days>{deck.days} days ago</Days>
              </IconDaysDiv>
            </DeckDiv>
          ))}
        </Table>
      </Content>
    </Page>
  );
}
