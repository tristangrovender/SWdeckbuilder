import { useState } from "react";
import { Page, Toolbar, Content } from "../../components/Toolbar";
import { useRouter } from "next/router";
import { Card } from "../../components/card-search-table/card.interface";
import { getCards } from "../../components/card-search-table/getCards";

export default function CardPage(params) {
  const router = useRouter();
  const [cards, setCards] = useState(null);
  if (cards === null) {
    getCards().then(setCards);
    return (
      <Page>
        <Toolbar />
        <Content>Loading card...</Content>
      </Page>
    );
  }
  const { id: cardId } = router.query;
  const card: Card = cards.find(({ id }) => id.toString() === cardId);
  console.log("card:", card);
  if (!cardId) {
    return (
      <Page>
        <Toolbar />
        <Content>Loading card...</Content>
      </Page>
    );
  }
  if (!card) {
    return (
      <Page>
        <Toolbar />
        <Content>Card not found: {cardId}</Content>
      </Page>
    );
  }
  return (
    <Page>
      <Toolbar />
      <Content>
        <h2>{card.front.title}</h2>
        <div style={{ display: "flex" }}>
          <div>
            <div style={{ marginBottom: "30px" }}>
              {card.side}: {card.front.type} - {card.front.subType}
            </div>
            <div style={{ fontStyle: "italic" }}>{card.front.gametext}</div>
          </div>
          <img src={card.front.imageUrl} style={{ height: "500px" }}></img>
        </div>
      </Content>
    </Page>
  );
}
