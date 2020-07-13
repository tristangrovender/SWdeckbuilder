import { useState } from "react";
import { Page, Toolbar, Content } from "../../../components/Toolbar";
import { useRouter } from "next/router";
import { CardSearchTable } from "../../../components/card-search-table/card-search-table";
import {
  Side,
  Card,
} from "../../../components/card-search-table/card.interface";
import { url } from "inspector";

function CardPanelRow({ card }: { card: Card }) {
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid grey",
        justifyContent: "space-between",
        backgroundColor: "#292e3c",
        color: "white",
      }}
    >
      <div>{card.front.title}</div>
      <div
        style={{
          backgroundImage: `url(${card.front.imageUrl})`,
          backgroundPosition: "-24px -130px",
          backgroundSize: "240px",
          width: "130px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(to left, rgba(255,255,255,0) 0%,rgb(41, 46, 60) 100%)",
            height: "100%",
          }}
        ></div>
      </div>
    </div>
  );
}

function CardPanel({ cards }: { cards: Card[] }) {
  return (
    <div style={{ width: "300px", height: "400px", border: "1px solid red" }}>
      Card Panel
      {cards.map((card, i) => (
        <CardPanelRow key={i} card={card} />
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
