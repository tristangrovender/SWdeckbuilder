import { useState } from "react";
import { Toolbar, Content, Page } from "../components/Toolbar";
import { CardSearchResults } from "../components/card-search-table/card-search-results";
import { useRouter } from "next/router";
import {
  CardFiltersBar,
  applyFilters,
} from "../components/card-search-table/card-filters-bar";
import { getCards } from "../components/card-search-table/getCards";

export default function Cards() {
  const router = useRouter();
  const [filters, updateFilters] = useState({
    titleFilter: router.query.title as string,
  });

  const [allCards, setCards] = useState([]);
  if (allCards.length === 0) {
    getCards().then(setCards);
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
    </Page>
  );
}
