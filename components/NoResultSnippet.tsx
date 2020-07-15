import styled from "styled-components";
import { darkBlue } from "../utils/colors";

const SnippetContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
  background-color: ${darkBlue};
  color: lightgray;
  font-size: 12px;
  padding: 4px;
`;

export default function NoResultSnippet() {
  return <SnippetContainer>No results</SnippetContainer>;
}
