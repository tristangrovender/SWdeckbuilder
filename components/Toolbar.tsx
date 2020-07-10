import styled from "styled-components";

const ToolbarContainer = styled.div`
  background-color: #222;
  height: 80px;
  color: #ccc;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const ToolbarContent = styled.div`
  display: flex;
  width: 960px;
  align-items: center;
`;

const ToolbarLink = styled.div`
  margin-right: 25px;
  cursor: pointer;
`;

export default function Toolbar() {
  return (
    <ToolbarContainer>
      <ToolbarContent>
        <ToolbarLink>SW:CCG DB</ToolbarLink>
        <ToolbarLink>My decks</ToolbarLink>
        <ToolbarLink>Decklists</ToolbarLink>
        <ToolbarLink>Cards</ToolbarLink>
      </ToolbarContent>
    </ToolbarContainer>
  );
}
