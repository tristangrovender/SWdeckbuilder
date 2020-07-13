import styled from "styled-components";
import { useState } from "react";

const FilterLink = styled.div`
  display: flex;
  background-color: ${props => (props.active ? "#222" : "initial")};
  color: ${props => (props.active ? "white" : "black")};
  flex-grow: 1;
  align-items: center;
  padding: 15px;
  cursor: pointer;
`;

enum DeckFilters {
  popular = "Popular",
  recent = "Recent"
}

export function DeckFilter() {
  const [activeFilter, setActiveFilter] = useState(DeckFilters.popular);
  return (
    <div>
      <FilterLink
        onClick={() => setActiveFilter(DeckFilters.popular)}
        active={activeFilter === DeckFilters.popular}
      >
        Popular
      </FilterLink>
      <FilterLink
        onClick={() => setActiveFilter(DeckFilters.recent)}
        active={activeFilter === DeckFilters.recent}
      >
        Recent
      </FilterLink>
    </div>
  );
}
