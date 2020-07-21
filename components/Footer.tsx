import styled from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  height: 50px;
  background-color: #222;
`;

const ConnectDiv = styled.div`
  color: #ccc;
  margin-right: 5px;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <ConnectDiv>Visit the main page: </ConnectDiv>
      <a
        href="https://www.starwarsccg.org/"
        style={{ textDecoration: "underline", color: "white" }}
      >
        Starwarsccg.org
      </a>
    </FooterContainer>
  );
}
