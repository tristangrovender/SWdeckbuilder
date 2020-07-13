import { useState } from "react";
import { Page, Toolbar, Content } from "../../../components/Toolbar";
import { StickyContainer, Sticky } from "react-sticky";
import { useRouter } from "next/router";
import { CardSearchTable } from "../../../components/card-search-table/card-search-table";
import {
  Side,
  Card,
} from "../../../components/card-search-table/card.interface";
import styled from "styled-components";
import { CardFiltersBar } from "../../../components/card-search-table/card-filters-bar";

const CardPanelRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #292e3c;
  color: white;
  padding-left: 3px;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid #fcd144;
  }
`;

const CardControlButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fcd144;
  border-left: 1px solid #2f2f2f;
  height: 100%;
  width: 30px;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

function CardPanelRow({
  card,
  count,
  removeCard,
  addCard,
}: {
  card: Card;
  count: number;
  removeCard: () => void;
  addCard: () => void;
}) {
  const [isHovering, setHovering] = useState(false);
  return (
    <CardPanelRowContainer
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div style={{ flex: 50 }}>{card.front.title}</div>
      <div
        style={{
          backgroundImage: `url(${card.front.imageUrl})`,
          backgroundPosition: "-24px -130px",
          backgroundSize: "240px",
          width: "130px",
          flex: 45,
          position: "relative",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(to left, rgba(255,255,255,0) 0%,rgb(41, 46, 60) 100%)",
            height: "100%",
          }}
        ></div>
        <div
          style={{
            display: isHovering ? "flex" : "none",
            zIndex: 10,
            position: "absolute",
            top: "0px",
            right: "0px",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            userSelect: "none",
          }}
        >
          <CardControlButton onClick={removeCard}>-</CardControlButton>
          <CardControlButton onClick={addCard}>+</CardControlButton>
        </div>
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
    </CardPanelRowContainer>
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

function CardPanel({
  cards,
  addCard,
  removeCard,
}: {
  cards: Card[];
  addCard: (card: Card) => void;
  removeCard: (card: Card) => void;
}) {
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
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src="/images/Dark.png" style={{ height: "50px" }}></img>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <span contentEditable={true}>Un-named Deck</span>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>
                  &nbsp;({cards.length}/60)
                </span>
              </div>
            </div>
            <div style={{ overflowY: "scroll", height: "400px" }}>
              {groupCards(cards).map(({ card, count }, i) => (
                <CardPanelRow
                  key={i}
                  card={card}
                  count={count}
                  removeCard={() => removeCard(card)}
                  addCard={() => addCard(card)}
                />
              ))}
            </div>
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
  const removeCard = (cardToRemove: Card) => {
    const index = deckCards.findIndex((card) => card.id == cardToRemove.id);
    setDeckCards([...deckCards.slice(0, index), ...deckCards.slice(index + 1)]);
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
      <div style={{ display: "flex" }}>
        <CardFiltersBar />
        {/* TODO showSide will need to come from /deck/new choice */}
        <CardSearchTable
          showSide={Side.dark}
          onCardSelected={addCard}
          style={{
            width: "70vw",
            marginLeft: "3vw",
          }}
        />
        <CardPanel
          cards={deckCards}
          addCard={addCard}
          removeCard={removeCard}
        ></CardPanel>
      </div>
    </Page>
  );
}
