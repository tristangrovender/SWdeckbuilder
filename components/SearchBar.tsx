import { useState } from "react";
import styled from "styled-components";
import { getCards } from "../components/card-search-table/card-search-table";
import { CardSnippet } from "./card-snippet";

// 1. When the search bar is active transition to the width of results
// 2. when the search bar is not active dont so results

const SearchBarContainer = styled.input`
  /* border: 3px solid red; */
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
  /* left: -120px; */
`;

export function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [cards, setCards] = useState([]);
  const [clicked, setFocus] = useState(false);

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
        style={{
          transitionDuration: "200ms",
          width: clicked ? "300px" : "175px"
        }}
        type="text"
        placeholder="card search"
        onKeyDown={handleSearchInputChanges}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <ResultsDropdown style={clicked ? {} : { display: "none" }}>
        {matchingResults.slice(0, 5).map(card => (
          <CardSnippet
            card={card}
            style={{
              padding: "1px"
            }}
          />
        ))}
      </ResultsDropdown>
    </div>
  );
}
