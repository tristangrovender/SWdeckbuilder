import { useState } from "react";
import styled from "styled-components";
import { getCards } from "../components/card-search-table/card-search-table";
import { CardSnippet } from "./card-snippet";
import Router from "next/router";

// 3. Go to card page when clicked
// 4. Press enter brings to card page with that filter applied
// 5. Add no results display when there are no matches

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
  const [focus, setFocus] = useState(false);

  const handleSearchInputChanges = e => {
    if (e.keyCode === 13) {
      Router.push({
        pathname: "/cards",
        query: { title: searchValue }
      });
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
          width: focus ? "300px" : "175px"
        }}
        type="text"
        placeholder="card search"
        onKeyUp={handleSearchInputChanges}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      {searchValue.length === 0 ? null : (
        <ResultsDropdown style={focus ? {} : { display: "none" }}>
          {matchingResults.slice(0, 5).map(card => (
            <CardSnippet
              card={card}
              onMouseDown={() => Router.push(`/card/${card.id}`)}
              style={{
                padding: "1px",
                cursor: "pointer"
              }}
            />
          ))}
        </ResultsDropdown>
      )}
    </div>
  );
}
