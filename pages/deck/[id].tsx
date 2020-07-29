import { useState } from "react";
import { Page, Toolbar } from "../../components/Toolbar";
import { Card, Type } from "../../components/card-search-table/card.interface";
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
import DeckIdContent from "../../components/DeckIdContent";
import Footer from "../../components/Footer";

const WideContent = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
`;

const AverageDestiny = styled.div`
  opacity: 0.5;
  font-size: 12px;
  margin-right: 8px;
  margin-top: 3px;
`;

const DeckButtonsDropDown = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeckDescription = styled.div`
  padding: 5px;
  color: grey;
  font-style: italic;
  font-size: 14px;
`;

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
`;

const GrowComponent = styled.div`
  display: flex;
  flex-grow: 1;
`;

const PageTitle = styled.div`
  display: flex;
  align-items: center;
`;

const TypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: wrap;
  color: black;
  width: 50%;
`;

const TypeTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  padding-bottom: 10px;
  padding-top: 10px;
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
  position: relative;
`;

const TypeImage = styled.img`
  height: 16px;
`;

export function getRandomDeck(allCards: Card[]) {
  // map over current array
  const newArray = allCards.map(cards => {
    return cards;
  });

  // Shuffle array
  const shuffled = newArray.sort(() => 0.5 - Math.random());

  // Get sub-array of first 60 elements after shuffle
  let randomDeck = shuffled.slice(0, 60);

  // Delete after images are correct
  const specificCard = newArray.find(card => {
    return card.front.type === "Admiral's Order";
  });
  randomDeck.push(specificCard);
  return randomDeck;
}

function getIconName(type: string) {
  if (type.includes("Jedi")) {
    return "JediTest";
  }
  if (type.includes("Admiral")) {
    return "AdmiralsOrder";
  }
  if (type.includes("Epic")) {
    return "EpicEvent";
  }
  if (type.includes("Defensive")) {
    return "DefensiveShield";
  }
  return type;
}

export function CardTypeSection({ cards }: { cards: Card[] }) {
  if (cards.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <TypeContainer>
      <TypeTitle>
        <TypeImage
          src={`/images/type_images/${getIconName(cards[0].front.type)}.png`}
        />{" "}
        {cards[0].front.type} ({cards.length})
      </TypeTitle>
      <div>
        {cards.map(card => (
          <div
            style={{
              fontSize: "12px"
            }}
          >
            1x {card.front.title}
          </div>
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

  const average = function(numArray) {
    const sum = numArray.reduce((total, nextNum) => {
      return total + nextNum;
    }, 0);
    return sum / numArray.length;
  };
  const destiny = deck
    .map(card => {
      return card.front.destiny;
    })
    .filter(destiny => {
      return destiny !== undefined;
    });

  const authorUsername = "Jambree";
  const deckTitle = "Planet Destroyer";
  return (
    <Page>
      <Toolbar />
      <WideContent>
        <Content>
          <DeckPageContainer>
            <DeckTitleContainer>
              <PageTitle>{deckTitle}</PageTitle>
              <GrowComponent />
              <FadedImage
                imageUrl={"/images/dark.png"}
                backgroundColor="black"
              />
            </DeckTitleContainer>
            <DeckInfoContainer>
              <DeckInfoStatistics>
                PLAYER: {authorUsername} - PUBLISHED: July 15, 2020 - UPDATED: 2
                days ago
              </DeckInfoStatistics>

              <DeckButtons>
                <AverageDestiny>
                  {Math.round(average(destiny))} Avg Destiny
                </AverageDestiny>
                <StarsComponent rating={3.5} />
                <DeckButtonsDropDown>
                  <GetAppIcon
                    style={{
                      marginLeft: "10px",
                      color: "#7f7f7f",
                      cursor: "pointer"
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
                </DeckButtonsDropDown>
              </DeckButtons>
            </DeckInfoContainer>
          </DeckPageContainer>
          <DeckIdContent deck={deck}></DeckIdContent>
          <CommentsSection />
        </Content>
      </WideContent>
      <Footer></Footer>
    </Page>
  );
}
