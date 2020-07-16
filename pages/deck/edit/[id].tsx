import { useState } from "react";
import { Page, Toolbar, Content } from "../../../components/Toolbar";
import { useRouter } from "next/router";
import { CardSearchResults } from "../../../components/card-search-table/card-search-results";
import {
  Side,
  Card,
} from "../../../components/card-search-table/card.interface";
import {
  CardFiltersBar,
  applyFilters,
} from "../../../components/card-search-table/card-filters-bar";
import { getCards } from "../../../components/card-search-table/getCards";
import { CardPanel } from "../../../components/card-panel";

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
            suggestedCards={allCards.length ? [allCards[0]] : []}
            addCard={addCard}
            removeCard={removeCard}
          ></CardPanel>
        </div>
      </div>
    </Page>
  );
}
