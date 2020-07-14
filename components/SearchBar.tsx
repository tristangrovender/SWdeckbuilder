import { useState } from "react";
import styled from "styled-components";
import { getCards } from "../components/card-search-table/card-search-table";
import { CardSnippet } from "./card-snippet";

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
  display: none;
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
    <div
      style={{ position: "relative" }}
      onFocus={() => {
        setFocus(true);
      }}
      onBlur={() => {
        setFocus(false);
      }}
    >
      <SearchBarContainer
        style={{
          transitionDuration: "200ms",
          width: focus ? "300px" : "175px"
        }}
        type="text"
        placeholder="card search"
        onKeyUp={handleSearchInputChanges}
        onFocus={() => setFocus(true)}
      />
      {searchValue.length === 0 ? null : (
        <ResultsDropdown style={focus ? {} : { display: "none" }}>
          {matchingResults.slice(0, 5).map(card => (
            <CardSnippet
              card={card}
              onClick={() => console.log("Clicked!", card.id)}
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
