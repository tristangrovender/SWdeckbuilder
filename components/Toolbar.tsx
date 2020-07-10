import styled from "styled-components";

const ToolbarContainer = styled.div`
  background-color: #222;
  height: 80px;
  color: #ccc;
  justify-content: center;
  align-items: center;
`;

const ToolbarContent = styled.div`
  width: 960px;
  align-items: center;
`;

export default function Toolbar() {
  return (
    <ToolbarContainer>
      <ToolbarContent>Toolbar</ToolbarContent>
    </ToolbarContainer>
  );
}
