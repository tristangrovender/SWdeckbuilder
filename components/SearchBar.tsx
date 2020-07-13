import styled from "styled-components";

const SearchBarContainer = styled.input`
  color: lightslategrey;
  height: 25px;
  padding: 15px 10px;
`;

export function SearchBar() {
  return (
    <div>
      <SearchBarContainer
        type="text"
        placeholder="card search"
      ></SearchBarContainer>
    </div>
  );
}

// Make a css search bar

// Add state/the ability to change values

// show autocomplete for cards
//

// hit enter to accept autocomplete and go to that card page
//
