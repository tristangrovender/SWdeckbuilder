import { useState } from "react";
import { Page, Toolbar, Content } from "../../components/Toolbar";
import { Card } from "../../components/card-search-table/card.interface";
import { getCards } from "../../components/card-search-table/getCards";
import { FadedImage, CardSnippet } from "../../components/card-snippet";
import styled from "styled-components";
import { darkBlue } from "../../utils/colors";
import { groupBy } from "../../utils/utils";
import { ClickAwayListener } from "@material-ui/core";

const GrowComponent = styled.div`
  display: flex;
  flex-grow: 1;
`;

const PageTitle = styled.div`
  display: flex;
  align-items: center;
`;

const TypeSectionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TypeContainer = styled.div`
  width: 300px;
  color: white;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TypeTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  font-size: 16px;
  padding: 5px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  background-color: black;
  color: white;
  padding: 0px 20px;
  height: 50px;
  font-size: 20px;
  border-radius: 5px;
  margin-top: 20px;
`;

function getRandomDeck(allCards: Card[]) {
  // map over current array
  const newArray = allCards.map((cards) => {
    return cards;
  });

  // Shuffle array
  const shuffled = newArray.sort(() => 0.5 - Math.random());

  // Get sub-array of first 60 elements after shuffle
  let randomDeck = shuffled.slice(0, 60);

  return randomDeck;
}

function CardRow({ card }: { card: Card }) {
  const [isHovering, setHovering] = useState(false);
  const [viewCard, setViewCard] = useState(false);
  return (
    <div
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ cursor: "pointer" }}
    >
      <CardSnippet
        title={card.front.title}
        imageUrl={card.front.imageUrl}
        isHovering={isHovering}
        hoverButtons={[
          {
            text: "i",
            onClick: () => setViewCard(true),
          },
        ]}
      />
      {viewCard ? (
        <ClickAwayListener onClickAway={() => setViewCard(false)}>
          <div style={{ position: "absolute", height: "400px", zIndex: 1 }}>
            <img src={card.front.imageUrl}></img>
          </div>
        </ClickAwayListener>
      ) : null}
    </div>
  );
}

function CardTypeSection({ cards }: { cards: Card[] }) {
  if (cards.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <TypeContainer>
      <TypeTitle>{cards[0].front.type}</TypeTitle>
      <div
        style={{
          backgroundColor: darkBlue,
        }}
      >
        {cards.map((card) => (
          <CardRow card={card} />
        ))}
      </div>
    </TypeContainer>
  );
}

export default function Deck() {
  const [allCards, setCards] = useState([]);
  const [deck, setDeck] = useState([]);
  if (allCards.length === 0) {
    getCards().then(setCards);
  }
  if (allCards.length && deck.length === 0) {
    setDeck(getRandomDeck(allCards));
  }
  return (
    <Page>
      <Toolbar />
      <Content>
        <TitleContainer>
          <PageTitle>Planet Destroyer</PageTitle>
          <GrowComponent />
          <FadedImage imageUrl={"/images/dark.png"} backgroundColor="black" />
        </TitleContainer>
        <TypeSectionsContainer>
          {groupBy(deck, ["front", "type"])
            .sort((groupA, groupB) => groupA.length - groupB.length)
            .map((cardsInType, i) => (
              <CardTypeSection key={i} cards={cardsInType} />
            ))}
        </TypeSectionsContainer>
      </Content>
    </Page>
  );
}
