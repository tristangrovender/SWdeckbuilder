import { useState } from "react";
import styled from "styled-components";
import { getCards } from "../components/card-search-table/card-search-table";

const SearchBarContainer = styled.input`
  color: lightslategrey;
  height: 25px;
  padding: 15px 10px;
`;

const ResultsDropdown = styled.div`
  position: absolute;
  width: 200px;
  min-height: 100px;
  background-color: white;
  color: black;
`;

export function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [cards, setCards] = useState([]);

  const handleSearchInputChanges = e => {
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
        {matchingResults.slice(0, 3).map(card => (
          <div>{card.front.title}</div>
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
