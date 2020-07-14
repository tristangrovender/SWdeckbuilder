import { useState } from "react";
import { Toolbar, Content, Page } from "../components/Toolbar";
import { CardSearchTable } from "../components/card-search-table/card-search-table";
import { CardFiltersBar } from "../components/card-search-table/card-filters-bar";

export default function Cards() {
  const [filters, updateFilters] = useState(undefined);
  return (
    <Page>
      <Toolbar />
      <CardFiltersBar
        filters={filters}
        onUpdateFilters={(filters) => updateFilters(filters)}
      />
      <CardSearchTable filters={filters} />
    </Page>
  );
}
