import { useState } from "react";
import { Toolbar, Content, Page } from "../components/Toolbar";
import { CardSearchResults } from "../components/card-search-table/card-search-results";
import { useRouter } from "next/router";
import { CardFiltersBar } from "../components/card-search-table/card-filters-bar";

export default function Cards() {
  const router = useRouter();
  const [filters, updateFilters] = useState({
    titleFilter: router.query.title as string,
  });
  return (
    <Page>
      <Toolbar />
      <CardFiltersBar
        filters={filters}
        onUpdateFilters={(filters) => updateFilters(filters)}
      />
      <CardSearchResults filters={filters} />
    </Page>
  );
}
