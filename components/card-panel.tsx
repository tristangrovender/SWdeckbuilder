import { useState } from "react";
import { StickyContainer, Sticky } from "react-sticky";
import styled from "styled-components";
import { ClickAwayListener } from "@material-ui/core";
import { darkBlue, goldenColor } from "../utils/colors";
import { Card } from "./card-search-table/card.interface";
import { CardSnippet } from "./card-snippet";

const CardPanelSection = styled.div`
  background-color: black;
`;

const DeckBuilderCardsContainer = styled.div`
  overflow-y: scroll;
  height: 350px;
`;
const CardPanelSectionTitle = styled.div`
  color: ${goldenColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardInfoContainer = styled.div`
  position: absolute;
  width: 350px;
  top: 0px;
  left: -350px;
`;

const CardSnippetCountContainer = styled.div`
  color: ${goldenColor};
  font-size: 12px;
  display: flex;
  width: 15px;
  justify-content: center;
  align-items: center;
`;

const DeckBuilderTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const DeckBuilderHeader = styled.div`
  display: flex;
  align-items: center;
`;

const EmptyDeckState = styled.div`
  margin-top: 20px;
  display: flex;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  justify-content: center;
`;

const CardPanelRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  padding-left: 3px;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid #fcd144;
  }
`;

function groupCards(cards: Card[]): { count: number; card: Card }[] {
  const cardsByCount = cards.reduce((all, card, index) => {
    if (!all[card.id]) {
      all[card.id] = { card, count: 1, index };
    } else {
      all[card.id].count += 1;
    }
    return all;
  }, {});
  return Object.values(cardsByCount).sort(
    ({ index: a }, { index: b }) => a - b
  ) as { count: number; card: Card }[];
}

function CardPanelRow({
  card,
  count,
  backgroundColor,
  hoverButtons,
}: {
  card: Card;
  count: number;
  backgroundColor?: string;
  hoverButtons?: {
    text: string;
    fontSize?: string;
    onClick: () => void;
  }[];
}) {
  const [isHovering, setHovering] = useState(false);
  return (
    <CardPanelRowContainer
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <CardSnippet
        title={card.front.title}
        imageUrl={card.front.imageUrl}
        hoverButtons={hoverButtons}
        backgroundColor={backgroundColor}
        isHovering={isHovering}
        style={{ maxWidth: "94%" }}
      />
      <CardSnippetCountContainer>
        {count > 1 ? count : null}
      </CardSnippetCountContainer>
    </CardPanelRowContainer>
  );
}

export function CardPanel({
  cards,
  suggestedCards,
  addCard,
  removeCard,
}: {
  cards: Card[];
  suggestedCards: Card[];
  addCard: (card: Card) => void;
  removeCard: (card: Card) => void;
}) {
  const [cardInfo, setCardInfo]: [
    { card: Card; clickAwayActive: boolean } | undefined,
    (cardInfo: { card: Card; clickAwayActive: boolean }) => void
  ] = useState(undefined);
  const onCardInfoHandler = (card: Card) => () => {
    if (cardInfo && cardInfo.card.id === card.id) {
      setCardInfo(undefined);
    } else {
      if (cardInfo) {
        // this means we are switching between cards
        // and we dont want the click away listener to remove
        // the card
        setCardInfo({ card, clickAwayActive: false });
      } else {
        setCardInfo({ card, clickAwayActive: true });
      }
    }
  };
  return (
    <StickyContainer>
      <Sticky>
        {({ style }) => (
          <div
            style={{
              ...style,
              width: "300px",
              backgroundColor: darkBlue,
              border: "2px solid grey",
              margin: "10px",
              color: "white",
            }}
          >
            <DeckBuilderHeader>
              <img src="/images/dark.png" style={{ height: "50px" }}></img>

              <DeckBuilderTitle>
                <span
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                >
                  Un-named Deck
                </span>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>
                  &nbsp;({cards.length}/60)
                </span>
              </DeckBuilderTitle>
            </DeckBuilderHeader>
            <DeckBuilderCardsContainer>
              {cards.length === 0 ? (
                <EmptyDeckState>
                  Click add in the table to add cards to your deck
                </EmptyDeckState>
              ) : (
                groupCards(cards).map(({ card, count }, i) => (
                  <CardPanelRow
                    key={i}
                    card={card}
                    count={count}
                    hoverButtons={[
                      {
                        onClick: onCardInfoHandler(card),
                        text: "i",
                        fontSize: "12px",
                      },
                      { onClick: () => removeCard(card), text: "-" },
                      { onClick: () => addCard(card), text: "+" },
                    ]}
                  />
                ))
              )}
            </DeckBuilderCardsContainer>
            <CardPanelSection>
              <CardPanelSectionTitle>Side Deck</CardPanelSectionTitle>
            </CardPanelSection>
            {suggestedCards.length ? (
              <CardPanelSection>
                <CardPanelSectionTitle>Suggested Cards</CardPanelSectionTitle>
                {suggestedCards.map((card, i) => (
                  <CardPanelRow
                    key={i}
                    card={card}
                    count={0}
                    backgroundColor="black"
                    hoverButtons={[
                      {
                        onClick: onCardInfoHandler(card),
                        text: "i",
                        fontSize: "12px",
                      },
                      {
                        onClick: () => addCard(card),
                        text: "accept",
                        fontSize: "12px",
                      },
                    ]}
                  />
                ))}
              </CardPanelSection>
            ) : null}
            {cardInfo ? (
              <ClickAwayListener
                onClickAway={() => {
                  if (cardInfo.clickAwayActive) {
                    setCardInfo(undefined);
                  } else {
                    setCardInfo({ ...cardInfo, clickAwayActive: true });
                  }
                }}
              >
                <CardInfoContainer>
                  <img src={cardInfo.card.front.imageUrl} />
                </CardInfoContainer>
              </ClickAwayListener>
            ) : null}
          </div>
        )}
      </Sticky>
    </StickyContainer>
  );
}
