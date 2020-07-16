import { useState } from "react";
import { Page, Toolbar, Content } from "../../components/Toolbar";
import { Card } from "../../components/card-search-table/card.interface";
import { getCards } from "../../components/card-search-table/getCards";
import { FadedImage, CardSnippet } from "../../components/card-snippet";
import styled from "styled-components";
import { darkBlue } from "../../utils/colors";

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  background-color: black;
  color: white;
  padding: 0px 20px;
  height: 50px;
  font-size: 20px;
  border-radius: 5px;
  margin-top: 20px;
`;

function getRandomDeck(allCards: Card[]) {
  // map over current array
  const newArray = allCards.map((cards) => {
    return cards;
  });

  // Shuffle array
  const shuffled = newArray.sort(() => 0.5 - Math.random());

  // Get sub-array of first 60 elements after shuffle
  let randomDeck = shuffled.slice(0, 60);

  return randomDeck;
}

function CardTypeSection({ cards }: { cards: Card[] }) {
  if (cards.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ backgroundColor: darkBlue, width: "300px", color: "white" }}>
      <div>{cards[0].front.type}</div>
      {cards.map((card) => (
        <CardSnippet title={card.front.title} imageUrl={card.front.imageUrl} />
      ))}
    </div>
  );
}

export default function Deck() {
  const [allCards, setCards] = useState([]);
  const [deck, setDeck] = useState([]);
  if (allCards.length === 0) {
    getCards().then(setCards);
  }
  if (allCards.length && deck.length === 0) {
    setDeck(getRandomDeck(allCards));
  }
  return (
    <Page>
      <Toolbar />
      <Content>
        <TitleContainer>
          <div style={{ display: "flex", alignItems: "center" }}>
            Planet Destroyer
          </div>
          <div style={{ display: "flex", flexGrow: 1 }}></div>
          <FadedImage imageUrl={"/images/dark.png"} backgroundColor="black" />
        </TitleContainer>
        <CardTypeSection cards={deck} />
      </Content>
    </Page>
  );
}
