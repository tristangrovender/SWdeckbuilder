import { useState } from "react";
import styled from "styled-components";
import { getCards } from "../components/card-search-table/card-search-table";
import { CardSnippet } from "./card-snippet";

const SearchBarContainer = styled.input`
  color: lightslategrey;
  height: 25px;
  padding: 15px 10px;
  &:focus {
    outline: none;
  }
`;

const ResultsDropdown = styled.div`
  border: 1px solid white;
  position: absolute;
  width: 300px;
  background-color: white;
  color: black;
  left: -130px;
`;

export function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [cards, setCards] = useState([]);

  const handleSearchInputChanges = (e) => {
    if (e.keyCode === 13) {
      console.log("enter!!");
    } else {
      setSearchValue(e.target.value);
    }
  };

  if (cards.length === 0) {
    getCards().then(setCards);
  }

  const matchingResults = cards.filter(({ front: { title: cardName } }) => {
    return cardName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
  });

  return (
    <div style={{ position: "relative" }}>
      <SearchBarContainer
        type="text"
        placeholder="card search"
        onKeyDown={handleSearchInputChanges}
      />
      <ResultsDropdown>
        {matchingResults.slice(0, 3).map((card) => (
          <CardSnippet card={card} style={{ padding: "1px" }} />
        ))}
      </ResultsDropdown>
    </div>
  );
}

// Make a css search bar

// Add state/the ability to change values

// show autocomplete for cards
//

// hit enter to accept autocomplete and go to that card page
//
