import { useState } from "react";
import { Toolbar, Content, Page } from "../../components/Toolbar";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import Link from "next/link";
import styled from "styled-components";
import Router from "next/router";
import { Side } from "../../components/card-search-table/card.interface";

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
  const [side, setSide] = useState(Side.dark);
  return (
    <Page>
      <Toolbar />
      <Content>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DeckSideContainer onClick={() => setSide(Side.dark)}>
              <img src="/images/dark.png"></img>
              <RadioContainer>
                <Radio
                  checked={side === Side.dark}
                  onChange={() => setSide(Side.dark)}
                  value="a"
                  name="radio-button-demo"
                />
                Dark
              </RadioContainer>
            </DeckSideContainer>
            <DeckSideContainer onClick={() => setSide(Side.light)}>
              <img src="/images/light.png"></img>
              <RadioContainer>
                <Radio
                  checked={side === Side.light}
                  onChange={() => setSide(Side.light)}
                  value="a"
                  name="radio-button-demo"
                />
                Light
              </RadioContainer>
            </DeckSideContainer>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                Router.push({
                  pathname: `/deck/edit/111`,
                  query: {
                    side,
                  },
                })
              }
            >
              Create deck
            </Button>
          </div>
        </div>
      </Content>
    </Page>
  );
}
