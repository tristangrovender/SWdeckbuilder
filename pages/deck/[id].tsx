import { useState } from "react";
import { Page, Toolbar, Content } from "../../components/Toolbar";
import { Card } from "../../components/card-search-table/card.interface";
import { getCards } from "../../components/card-search-table/getCards";
import { FadedImage } from "../../components/card-snippet";
import styled from "styled-components";
import { darkBlue } from "../../utils/colors";
import { groupBy } from "../../utils/utils";
import { StarsComponent } from "../../components/StarsComponent";
import { DeckCardRow } from "./DeckCardRow";
import { CommentsSection } from "../../components/comments-section";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Button, ClickAwayListener } from "@material-ui/core";
import FileSaver from "file-saver";
import { getDeckText } from "../../components/getDeckText";
import { useRouter } from "next/router";

function saveToFile(fileName: string, body: string) {
  var blob = new Blob([body], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, fileName);
}

const ExportContainer = styled.div`
  position: absolute;
  z-index: 1;
  background-color: white;
  border: 1px solid black;
  width: 200px;
  height: 125px;
  right: -6px;
  bottom: -125px;
`;

const DeckPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const DeckButtons = styled.div`
  display: flex;
  align-items: center;
`;

const DeckInfoStatistics = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  font-size: 14px;
`;

const DeckInfoContainer = styled.div`
  background-color: white;
  border: 1px solid grey;
  padding: 5px;
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
  @media print {
    display: none;
  }
`;

const GrowComponent = styled.div`
  display: flex;
  flex-grow: 1;
`;

const PageTitle = styled.div`
  display: flex;
  align-items: center;
  @media print {
    display: none;
  }
`;

const PageTitlePrint = styled.div`
  display: none;
  @media print {
    display: initial;
    color: black;
    -webkit-print-color-adjust: exact;
  }
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

  @media print {
    background-color: black;
    color: white;
    -webkit-print-color-adjust: exact;
  }
`;

const DeckTitleContainer = styled.div`
  width: 100%;
  display: flex;
  background-color: black;
  color: white;
  padding: 0px 20px;
  height: 50px;
  font-size: 20px;
  border-radius: 5px 5px 0px 0px;
  margin-top: 20px;
`;

export function getRandomDeck(allCards: Card[]) {
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
          <DeckCardRow card={card} />
        ))}
      </div>
    </TypeContainer>
  );
}

export default function Deck() {
  const router = useRouter();
  const [allCards, setCards] = useState([]);
  const [exportDropDownOpen, toggleExportDropdown] = useState(false);
  const [deck, setDeck] = useState([]);
  const { id: deckId } = router.query;
  if (allCards.length === 0) {
    getCards().then(setCards);
  }
  if (allCards.length && deck.length === 0) {
    setDeck(getRandomDeck(allCards));
  }
  const authorUsername = "Jambree";
  const deckTitle = "Planet Destroyer";
  return (
    <Page>
      <Toolbar />
      <Content>
        <DeckPageContainer>
          <DeckTitleContainer>
            <PageTitle>{deckTitle}</PageTitle>
            <PageTitlePrint>
              {deckTitle} by {authorUsername}
            </PageTitlePrint>
            <GrowComponent />
            <FadedImage imageUrl={"/images/dark.png"} backgroundColor="black" />
          </DeckTitleContainer>
          <DeckInfoContainer>
            <DeckInfoStatistics>
              PLAYER: {authorUsername} - PUBLISHED: July 15, 2020 - UPDATED: 2
              days ago
            </DeckInfoStatistics>

            <DeckButtons>
              <StarsComponent rating={3.5} />
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GetAppIcon
                  style={{
                    marginLeft: "10px",
                    color: "#7f7f7f",
                    cursor: "pointer",
                  }}
                  onClick={() => toggleExportDropdown(!exportDropDownOpen)}
                />
                {exportDropDownOpen ? (
                  <ClickAwayListener
                    onClickAway={() => toggleExportDropdown(false)}
                  >
                    <ExportContainer>
                      <Button
                        style={{ width: "100%" }}
                        onClick={() => {
                          router.push(`/deck/print/${deckId}`);
                        }}
                      >
                        PDF Export
                      </Button>
                      <Button
                        style={{ width: "100%" }}
                        onClick={() => {
                          saveToFile(
                            `${(deckTitle + " by " + authorUsername).replace(
                              / /g,
                              "_"
                            )}.txt`,
                            getDeckText(deck)
                          );
                        }}
                      >
                        Text Export
                      </Button>
                      <Button
                        style={{ width: "100%" }}
                        onClick={() => {
                          console.log("gemp export");
                        }}
                      >
                        Gemp XML Export
                      </Button>
                    </ExportContainer>
                  </ClickAwayListener>
                ) : null}
              </div>
            </DeckButtons>
          </DeckInfoContainer>
        </DeckPageContainer>
        <TypeSectionsContainer>
          {groupBy(deck, ["front", "type"])
            .sort((groupA, groupB) => groupA.length - groupB.length)
            .map((cardsInType, i) => (
              <CardTypeSection key={i} cards={cardsInType} />
            ))}
        </TypeSectionsContainer>
        <CommentsSection />
      </Content>
    </Page>
  );
}
