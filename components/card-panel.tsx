import { useState, useEffect, useRef } from "react";
import { StickyContainer, Sticky } from "react-sticky";
import styled from "styled-components";
import { ClickAwayListener } from "@material-ui/core";
import { darkBlue, goldenColor } from "../utils/colors";
import { CardSnippet } from "./card-snippet";
import { Card, Deck, GetDeckQuery } from "../graphql/types";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

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

type DeckCard = GetDeckQuery["deck"]["deckCards"][0];

function groupCards(cards: DeckCard[]): { count: number; card: DeckCard }[] {
  const cardsByCount = cards.reduce(
    (
      all: {
        [cardId: string]: {
          card: DeckCard;
          count: number;
          index: number;
        };
      },
      card,
      index
    ) => {
      if (!card) {
        return all;
      }
      if (!all[card.id]) {
        all[card.id] = { card, count: 1, index };
      } else {
        all[card.id].count += 1;
      }
      return all;
    },
    {}
  );
  return Object.values(cardsByCount).sort(
    ({ index: a }, { index: b }) => a - b
  ) as { count: number; card: DeckCard }[];
}

function CardPanelRow({
  deckCard,
  count,
  backgroundColor,
  hoverButtons,
  textColor,
}: {
  deckCard: DeckCard;
  count: number;
  backgroundColor?: string;
  textColor?: string;
  hoverButtons?: {
    text: string;
    fontSize?: string;
    tooltip?: string;
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
        title={deckCard?.card.title}
        imageUrl={deckCard?.card.imageUrl}
        hoverButtons={hoverButtons}
        backgroundColor={backgroundColor}
        isHovering={isHovering}
        textColor={textColor}
        style={{ maxWidth: "94%" }}
      />
      <CardSnippetCountContainer>
        {count > 1 ? count : null}
      </CardSnippetCountContainer>
    </CardPanelRowContainer>
  );
}

export interface CardWithDeckInfo extends Card {
  isSideDeck: boolean;
}

function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function CardPanel({
  deck,
  suggestedCards,
  addCard,
  removeCard,
}: {
  deck?: GetDeckQuery["deck"];
  suggestedCards: DeckCard[];
  addCard: (card: DeckCard) => void;
  removeCard: (card: DeckCard) => void;
}) {
  console.log("deck", deck);
  const [startingCardIds, setStartingCardIds]: [
    string[],
    (cards: string[]) => void
  ] = useState([] as string[]);
  const [scrollDiv, setScrollDiv] = useState(undefined);
  // TODO need to setup this scroll
  const prev = usePrevious({
    cardRowLength: groupCards(deck?.deckCards || []).length,
  });
  useEffect(() => {
    if (
      prev &&
      groupCards(deck?.deckCards || []).length > (prev as any).cardRowLength &&
      scrollDiv
    ) {
      (scrollDiv as any).scrollIntoViewIfNeeded({ behavior: "smooth" });
    }
  }, [deck?.deckCards]);
  const [cardInfo, setCardInfo]: [
    { card: DeckCard; clickAwayActive: boolean } | undefined,
    (cardInfo: { card: DeckCard; clickAwayActive: boolean } | undefined) => void
  ] = useState();
  const onCardInfoHandler = (card: DeckCard) => () => {
    if (cardInfo?.card?.id === card?.id) {
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
  const cardsInMainDeck =
    deck?.deckCards.filter((deckCard) => !deckCard?.isInSideDeck) || [];
  const cardsInSideDeck =
    deck?.deckCards.filter((deckCard) => deckCard?.isInSideDeck) || [];
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
                  &nbsp;({cardsInMainDeck.length}/60)
                </span>
              </DeckBuilderTitle>
            </DeckBuilderHeader>
            <textarea
              placeholder="No deck description"
              style={{
                width: "100%",
                backgroundColor: "initial",
                border: "0px",
                resize: "vertical",
                textAlign: "center",
                color: "white",
                borderBottom: "1px solid black",
              }}
            ></textarea>
            <DeckBuilderCardsContainer>
              {deck?.deckCards?.length === 0 ? (
                <EmptyDeckState>
                  Click add in the table to add cards to your deck
                </EmptyDeckState>
              ) : (
                groupCards(cardsInMainDeck).map(({ card, count }, i) => (
                  <CardPanelRow
                    key={i}
                    deckCard={card}
                    textColor={
                      startingCardIds.includes(card?.id.toString() || "")
                        ? goldenColor
                        : undefined
                    }
                    count={count}
                    hoverButtons={[
                      {
                        onClick: () => {
                          if (
                            startingCardIds.includes(card?.id.toString() || "")
                          ) {
                            const index = startingCardIds.indexOf(
                              card?.id.toString() || ""
                            );
                            setStartingCardIds([
                              ...startingCardIds.slice(0, index),
                              ...startingCardIds.slice(index + 1),
                            ]);
                          } else {
                            setStartingCardIds([
                              ...startingCardIds,
                              card?.id.toString() || "",
                            ]);
                          }
                        },
                        text: "s",
                        fontSize: "12px",
                        tooltip: "Mark as starting card",
                      },
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
              <div
                style={{ height: "0px" }}
                ref={(ref) => {
                  (window as any).ref = ref;
                  setScrollDiv(ref as any);
                }}
              ></div>
            </DeckBuilderCardsContainer>
            {cardsInSideDeck.length ? (
              <CardPanelSection>
                <CardPanelSectionTitle>Side Deck</CardPanelSectionTitle>
                {groupCards(cardsInSideDeck).map(({ card, count }, i) => (
                  <CardPanelRow
                    key={i}
                    deckCard={card}
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
                ))}
              </CardPanelSection>
            ) : null}
            {suggestedCards.length ? (
              <CardPanelSection>
                <CardPanelSectionTitle>Suggested Cards</CardPanelSectionTitle>
                {suggestedCards.map((card, i) => (
                  <CardPanelRow
                    key={i}
                    deckCard={card}
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
                  <img src={cardInfo?.card?.card.imageUrl} />
                </CardInfoContainer>
              </ClickAwayListener>
            ) : null}
          </div>
        )}
      </Sticky>
    </StickyContainer>
  );
}
