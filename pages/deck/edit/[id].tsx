import { useState } from "react";
import { Page, Toolbar, Content } from "../../../components/Toolbar";
import { StickyContainer, Sticky } from "react-sticky";
import { useRouter } from "next/router";
import { CardSearchResults } from "../../../components/card-search-table/card-search-results";
import {
  Side,
  Card,
} from "../../../components/card-search-table/card.interface";
import styled from "styled-components";
import {
  CardFiltersBar,
  applyFilters,
} from "../../../components/card-search-table/card-filters-bar";
import { CardSnippet } from "../../../components/card-snippet";
import { getCards } from "../../../components/card-search-table/getCards";
import { darkBlue } from "../../../utils/colors";

const CardSnippetCountContainer = styled.div`
  color: #fcd144;
  font-size: 12px;
  display: flex;
  width: 15px;
  justify-content: center;
  align-items: center;
`;

const DeckBuilderContainer = styled.div`
  width: 300px;
  background-color: ${darkBlue};
  height: 400px;
  border: 2px solid grey;
  margin: 10px;
  color: white;
`;

const DeckBuilderTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const DeckBuilderHeader = styled.div`
  display: flex;
  align-items: center;
`;

const EmptyDeckState = styled.div`
  margin-top: 20px;
  display: flex;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  justify-content: center;
`;

const CardPanelRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${darkBlue};
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
  onCardInfo,
}: {
  card: Card;
  count: number;
  removeCard?: () => void;
  addCard?: () => void;
  onCardInfo?: () => void;
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
        onCardInfo={onCardInfo}
        isHovering={isHovering}
        style={{ maxWidth: "94%" }}
      />
      <CardSnippetCountContainer>
        {count > 1 ? count : null}
      </CardSnippetCountContainer>
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
          <DeckBuilderContainer style={style}>
            <DeckBuilderHeader>
              <img src="/images/dark.png" style={{ height: "50px" }}></img>

              <DeckBuilderTitle>
                <span
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                >
                  Un-named Deck
                </span>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>
                  &nbsp;({cards.length}/60)
                </span>
              </DeckBuilderTitle>
            </DeckBuilderHeader>
            <div style={{ overflowY: "scroll", height: "400px" }}>
              {cards.length === 0 ? (
                <EmptyDeckState>
                  Click add in the table to add cards to your deck
                </EmptyDeckState>
              ) : (
                groupCards(cards).map(({ card, count }, i) => (
                  <CardPanelRow
                    key={i}
                    card={card}
                    count={count}
                    removeCard={() => removeCard(card)}
                    addCard={() => addCard(card)}
                    onCardInfo={() => console.log("on card info")}
                  />
                ))
              )}
            </div>
          </DeckBuilderContainer>
        )}
      </Sticky>
    </StickyContainer>
  );
}

export default function EditDeck(params) {
  const router = useRouter();
  const [deckCards, setDeckCards] = useState([]);
  const [filters, updateFilters] = useState(undefined);
  const [allCards, setCards] = useState([]);
  if (allCards.length === 0) {
    getCards().then(setCards);
  }
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

  return (
    <Page>
      <Toolbar />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <CardFiltersBar
          allCards={allCards}
          filters={filters}
          onUpdateFilters={(filters) => updateFilters(filters)}
        />
        {/* TODO showSide will need to come from /deck/new choice */}
        <div style={{ display: "flex" }}>
          <CardSearchResults
            cards={applyFilters(allCards, filters)}
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
      </div>
    </Page>
  );
}
