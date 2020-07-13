import { useState } from "react";
import { Page, Toolbar, Content } from "../../../components/Toolbar";
import { useRouter } from "next/router";
import { CardSearchTable } from "../../../components/card-search-table/card-search-table";
import {
  Side,
  Card,
} from "../../../components/card-search-table/card.interface";

function CardPanel({ cards }: { cards: Card[] }) {
  return (
    <div style={{ width: "300px", height: "400px", border: "1px solid red" }}>
      Card Panel
      {cards.map((card, i) => (
        <div key={i}>{card.front.title}</div>
      ))}
    </div>
  );
}

export default function EditDeck(params) {
  const router = useRouter();
  const [deckCards, setDeckCards] = useState([]);
  const addCard = (card: Card) => {
    setDeckCards([...deckCards, card]);
  };
  const { id: deckId } = router.query;
  if (!deckId) {
    return (
      <Page>
        <Toolbar />
        <Content>Deck not found: {deckId}</Content>
      </Page>
    );
  }

  console.log("deckId", deckId);
  return (
    <Page>
      <Toolbar />
      <Content>
        <div contentEditable={true}>Un-named Deck</div>
        <div style={{ display: "flex" }}>
          {/* TODO showSide will need to come from /deck/new choice */}
          <CardSearchTable showSide={Side.dark} onCardSelected={addCard} />
          <CardPanel cards={deckCards}></CardPanel>
        </div>
      </Content>
    </Page>
  );
}
