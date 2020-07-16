import { useState } from "react";
import { Toolbar, Content, Page } from "../../components/Toolbar";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import Link from "next/link";
import styled from "styled-components";

const DeckSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
`;

export default function NewDeck() {
  const [side, setSide] = useState("dark");
  return (
    <Page>
      <Toolbar />
      <Content>
        <h3>Choose a side</h3>
        <div style={{ display: "flex" }}>
          <DeckSideContainer onClick={() => setSide("dark")}>
            <img src="/images/dark.png"></img>
            <RadioContainer>
              <Radio
                checked={side === "dark"}
                onChange={() => setSide("dark")}
                value="a"
                name="radio-button-demo"
              />
              Dark
            </RadioContainer>
          </DeckSideContainer>
          <DeckSideContainer onClick={() => setSide("light")}>
            <img src="/images/light.png"></img>
            <RadioContainer>
              <Radio
                checked={side === "light"}
                onChange={() => setSide("light")}
                value="a"
                name="radio-button-demo"
              />
              Light
            </RadioContainer>
          </DeckSideContainer>
        </div>
        <Link href="/deck/edit/111">
          <Button variant="contained" color="primary">
            Create deck
          </Button>
        </Link>
      </Content>
    </Page>
  );
}
