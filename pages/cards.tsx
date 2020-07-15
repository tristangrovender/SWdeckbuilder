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

  const [cards, setCards] = useState(null);
  if (cards === null) {
    getCards().then(setCards);
  }
  return (
    <Page>
      <Toolbar />
      <CardFiltersBar
        allCards={cards}
        filters={filters}
        onUpdateFilters={(filters) => updateFilters(filters)}
      />
      <CardSearchResults
        filters={filters}
        cards={applyFilters(cards, filters)}
      />
    </Page>
  );
}
