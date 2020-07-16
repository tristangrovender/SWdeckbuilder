import { useState } from "react";
import { Page, Toolbar, Content } from "../../components/Toolbar";
import { Card } from "../../components/card-search-table/card.interface";
import { getCards } from "../../components/card-search-table/getCards";

function getRandomDeck(allCards: Card[]) {
  return [];
}

export default function Deck() {
  const [allCards, setCards] = useState([]);
  if (allCards.length === 0) {
    getCards().then(setCards);
  }
  if (allCards.length) {
    console.log("Tristans Random Deck", getRandomDeck(allCards));
  }
  return (
    <Page>
      <Toolbar />
      <Content>
        <div>deck page</div>
      </Content>
    </Page>
  );
}
