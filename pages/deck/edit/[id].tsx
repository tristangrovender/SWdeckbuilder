import { useState } from "react";
import { Page, Toolbar, Content } from "../../../components/Toolbar";
import { StickyContainer, Sticky } from "react-sticky";
import { useRouter } from "next/router";
import { CardSearchTable } from "../../../components/card-search-table/card-search-table";
import {
  Side,
  Card,
} from "../../../components/card-search-table/card.interface";
import { url } from "inspector";

function CardPanelRow({ card, count }: { card: Card; count: number }) {
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "1px",
        justifyContent: "space-between",
        backgroundColor: "#292e3c",
        color: "white",
        paddingLeft: "3px",
      }}
    >
      <div style={{ flex: 50 }}>{card.front.title}</div>
      <div
        style={{
          backgroundImage: `url(${card.front.imageUrl})`,
          backgroundPosition: "-24px -130px",
          backgroundSize: "240px",
          width: "130px",
          flex: 45,
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
      <div
        style={{
          color: "#fcd144",
          fontSize: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 5,
        }}
      >
        {count > 1 ? count : null}
      </div>
    </div>
  );
}

function groupCards(cards: Card[]): { count: number; card: Card }[] {
  const cardsByCount = cards.reduce((all, card) => {
    if (!all[card.id]) {
      all[card.id] = { card, count: 1 };
    } else {
      all[card.id].count += 1;
    }
    return all;
  }, {});
  return Object.values(cardsByCount);
}

function CardPanel({ cards }: { cards: Card[] }) {
  return (
    <StickyContainer>
      <Sticky>
        {({ style }) => (
          <div
            style={{
              ...style,
              width: "300px",
              height: "400px",
              border: "2px solid grey",
              backgroundColor: "#292e3c",
              margin: "10px",
              color: "white",
              overflowY: "scroll",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src="/images/Dark.png" style={{ height: "50px" }}></img>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <div contentEditable={true} style={{ marginLeft: "-30px" }}>
                  Un-named Deck
                </div>
              </div>
            </div>
            {groupCards(cards).map(({ card, count }, i) => (
              <CardPanelRow key={i} card={card} count={count} />
            ))}
          </div>
        )}
      </Sticky>
    </StickyContainer>
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
        <div style={{ display: "flex" }}>
          {/* TODO showSide will need to come from /deck/new choice */}
          <CardSearchTable showSide={Side.dark} onCardSelected={addCard} />
          <CardPanel cards={deckCards}></CardPanel>
        </div>
      </Content>
    </Page>
  );
}
