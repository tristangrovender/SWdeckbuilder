import { useState } from "react";
import { Page, Toolbar, Content } from "../../components/Toolbar";
import { useRouter } from "next/router";
import { getCardsFromServer } from "../../components/card-search-table/getCards";
import { CommentsSection } from "../../components/comments-section";
import Footer from "../../components/Footer";
import { Card } from "../../graphql/types";

export default function CardPage(params) {
  const router = useRouter();
  const [cards, setCards] = useState(null);
  if (cards === null) {
    getCardsFromServer().then(setCards);
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
        <h2>{card.title}</h2>
        <div style={{ display: "flex" }}>
          <div>
            <div style={{ marginBottom: "30px" }}>
              {card.side}: {card.type} - {card.subType}
            </div>
            <div style={{ fontStyle: "italic" }}>{card.gametext}</div>
            <CommentsSection></CommentsSection>
          </div>
          <img src={card.imageUrl} style={{ height: "500px" }}></img>
        </div>
      </Content>
      <Footer></Footer>
    </Page>
  );
}
