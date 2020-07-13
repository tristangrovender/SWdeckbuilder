import styled from "styled-components";

const SearchBarContainer = styled.input`
  color: lightslategrey;
  height: 25px;
`;

export function SearchBar() {
  return (
    <div>
      <SearchBarContainer
        type="text"
        defaultValue="card search"
      ></SearchBarContainer>
    </div>
  );
}

// Make a decent search css search bar

// Add state and the ability to change values

// show autocomplete for cards

// hit enter to accept autocomplete and go to that card page
