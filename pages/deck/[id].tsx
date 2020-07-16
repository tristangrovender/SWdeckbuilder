import { useState } from "react";
import { Page, Toolbar, Content } from "../../components/Toolbar";
import { Card } from "../../components/card-search-table/card.interface";
import { getCards } from "../../components/card-search-table/getCards";
import { FadedImage } from "../../components/card-snippet";

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
        <div
          style={{
            width: "100%",
            display: "flex",
            backgroundColor: "black",
            color: "white",
            padding: "0px 20px ",
            height: "50px",
            fontSize: "20px",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            Planet Destroyer
          </div>
          <div style={{ display: "flex", flexGrow: 1 }}></div>
          <FadedImage imageUrl={"/images/dark.png"} backgroundColor="black" />
        </div>
      </Content>
    </Page>
  );
}
