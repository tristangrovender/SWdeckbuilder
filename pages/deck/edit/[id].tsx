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
import { CardSnippet } from "../../../components/card-snippet";

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

function CardPanelRow({
  card,
  count,
  removeCard,
  addCard,
}: {
  card: Card;
  count: number;
  removeCard?: () => void;
  addCard?: () => void;
}) {
  const [isHovering, setHovering] = useState(false);
  return (
    <CardPanelRowContainer
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <CardSnippet
        card={card}
        removeCard={removeCard}
        addCard={addCard}
        isHovering={isHovering}
      />
      <div
        style={{
          color: "#fcd144",
          fontSize: "12px",
          display: "flex",
          width: "15px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {count > 1 ? count : null}
      </div>
    </CardPanelRowContainer>
  );
}

function groupCards(cards: Card[]): { count: number; card: Card }[] {
  const cardsByCount = cards.reduce((all, card, index) => {
    if (!all[card.id]) {
      all[card.id] = { card, count: 1, index };
    } else {
      all[card.id].count += 1;
    }
    return all;
  }, {});
  return Object.values(cardsByCount).sort(
    ({ index: a }, { index: b }) => a - b
  ) as { count: number; card: Card }[];
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
              <img src="/images/dark.png" style={{ height: "50px" }}></img>

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
              {cards.length === 0 ? (
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "12px",
                    justifyContent: "center",
                  }}
                >
                  Click add in the table to add cards to your deck
                </div>
              ) : (
                groupCards(cards).map(({ card, count }, i) => (
                  <CardPanelRow
                    key={i}
                    card={card}
                    count={count}
                    removeCard={() => removeCard(card)}
                    addCard={() => addCard(card)}
                  />
                ))
              )}
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
  const [filters, updateFilters] = useState(undefined);
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <CardFiltersBar
          filters={filters}
          onUpdateFilters={(filters) => updateFilters(filters)}
        />
        {/* TODO showSide will need to come from /deck/new choice */}
        <div style={{ display: "flex" }}>
          <CardSearchTable
            showSide={Side.dark}
            onCardSelected={addCard}
            filters={filters}
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
      </div>
    </Page>
  );
}
