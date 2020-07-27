import { useState } from "react";
import { Toolbar, Content, Page } from "../components/Toolbar";
import { CardSearchResults } from "../components/card-search-table/card-search-results";
import { useRouter } from "next/router";
import {
  CardFiltersBar,
  applyFilters,
  CardFilters,
} from "../components/card-search-table/card-filters-bar";
import { getCardsFromServer } from "../components/card-search-table/getCards";
import Footer from "../components/Footer";
import { Card } from "../graphql/types";

export default function Cards() {
  const router = useRouter();
  const [filters, updateFilters]: [
    CardFilters,
    (filters: CardFilters) => void
  ] = useState({
    titleFilter: router.query.title,
  } as CardFilters);

  const [allCards, setCards]: [Card[], (cards: Card[]) => void] = useState([]);
  if (allCards.length === 0) {
    getCardsFromServer().then(setCards);
  }
  return (
    <Page>
      <Toolbar />
      <CardFiltersBar
        allCards={allCards}
        filters={filters}
        onUpdateFilters={(filters) => updateFilters(filters)}
      />
      <CardSearchResults cards={applyFilters(allCards, filters)} />
      <div style={{ display: "flex", flexGrow: 1 }}></div>
      <Footer></Footer>
    </Page>
  );
}
