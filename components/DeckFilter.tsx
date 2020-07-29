import styled from "styled-components";
import { useState } from "react";

const FilterLink = styled.div`
  display: flex;
  background-color: ${(props) => (props.active ? "#222" : "initial")};
  color: ${(props) => (props.active ? "white" : "black")};
  flex-grow: 1;
  align-items: center;
  padding: 15px;
  cursor: pointer;
`;

enum DeckFilters {
  all = "All",
}

export function DeckFilter() {
  const [activeFilter, setActiveFilter] = useState(DeckFilters.all);
  return (
    <div>
      <FilterLink
        onClick={() => setActiveFilter(DeckFilters.all)}
        active={activeFilter === DeckFilters.all}
      >
        All
      </FilterLink>
    </div>
  );
}
