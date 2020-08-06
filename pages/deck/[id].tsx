import { useState } from "react";
import { Page, Toolbar } from "../../components/Toolbar";
import { FadedImage } from "../../components/card-snippet";
import styled from "styled-components";
import { StarsComponent } from "../../components/StarsComponent";
import { CommentsSection } from "../../components/comments-section";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Button, ClickAwayListener, LinearProgress } from "@material-ui/core";
import FileSaver from "file-saver";
import { getDeckText } from "../../components/getDeckText";
import { useRouter } from "next/router";
import DeckIdContent from "../../components/DeckIdContent";
import Footer from "../../components/Footer";
import {
  Card,
  MutationCreateDeckRatingArgs,
  CreateDeckRatingMutation,
  DeckCard,
} from "../../graphql/types";
import { gql, useMutation, useQuery } from "@apollo/client";
import CreateDeckRating from "raw-loader!../../graphql/create-deck-rating.gql";
import {
  GetDeckQuery as GetDeckQueryI,
  GetDeckQueryVariables,
} from "../../graphql/types";
import GetDeckQuery from "raw-loader!../../graphql/get-deck.gql";
import { average } from "../../utils/utils";

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

function getGempXML(deck: Card[]): string {
  // TODO add the below for side deck
  // <cardOutsideDeck blueprintId="200_93" title="A Useless Gesture"/>
  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<deck>
${deck
  .map(({ gemp_card_id, title }) => {
    return `<card blueprintId="${gemp_card_id}" title="${title}"/>`;
  })
  .join("\n")}
</deck>`;
}
const TypeImage = styled.img`
  height: 16px;
`;

export function getRandomDeck(allCards: Card[]) {
  // map over current array
  const newArray = allCards.map((cards) => {
    return cards;
  });

  // Shuffle array
  const shuffled = newArray.sort(() => 0.5 - Math.random());

  // Get sub-array of first 60 elements after shuffle
  let randomDeck = shuffled.slice(0, 30);
  randomDeck = [...randomDeck, ...randomDeck];

  // Delete after images are correct
  const specificCard = newArray.find((card) => {
    return card.type === "Location";
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

export function CardTypeSection({ deckCards }: { deckCards: DeckCard[] }) {
  function counter(oldTitle, newTitle, titleCount) {
    if (oldTitle === newTitle) {
      return titleCount + 1;
    }
  }

  if (deckCards.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <TypeContainer>
      <TypeTitle>
        <TypeImage
          src={`/images/type_images/${getIconName(deckCards[0].card.type)}.png`}
        />{" "}
        {deckCards[0].card.type} ({deckCards.length})
      </TypeTitle>
      <div>
        {deckCards.map((deckCard) => (
          <div
            style={{
              fontSize: "12px",
            }}
          >
            {counter(deckCard, deckCard, 0)}x {deckCard.card.title}
          </div>
        ))}
      </div>
    </TypeContainer>
  );
}

export default function Deck() {
  const router = useRouter();
  const [allCards, setCards] = useState([]);
  const {
    data: deckInfo,
    refetch: refreshDeck,
    loading: loadingDeck,
  } = useQuery<GetDeckQueryI, GetDeckQueryVariables>(gql(GetDeckQuery), {
    variables: {
      id: router.query.id as string,
    },
    skip: !Boolean(router.query.id),
  });
  const [createRating] = useMutation<
    CreateDeckRatingMutation,
    MutationCreateDeckRatingArgs
  >(gql(CreateDeckRating));
  const [exportDropDownOpen, toggleExportDropdown] = useState(false);
  const { id: deckId } = router.query;
  if (!deckInfo) {
    return (
      <Page>
        <Toolbar />
        <LinearProgress />
      </Page>
    );
  }

  const destiny = deckInfo.deck.deckCards
    .map((deckCard) => {
      return parseInt(deckCard.card.destiny);
    })
    .filter((destiny) => {
      return typeof destiny === "number";
    });

  const authorUsername = "Jambree";
  const deckTitle = "Planet Destroyer";
  const deckDescription =
    "Deck is designed to take out opponents characters, then bring in big intrigue characters with pillage to limit cards in hand to limit opponents ability to defend against strong intrigue challenges.";
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
                <StarsComponent
                  ratings={deckInfo.deck.ratings}
                  onChange={(rating: number) => {
                    createRating({
                      variables: {
                        deckId: deckId as string,
                        rating,
                      },
                    });
                  }}
                />
                <DeckButtonsDropDown>
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
                              getDeckText(deckInfo.deck.deckCards as DeckCard[])
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
          <DeckIdContent
            deckCards={deckInfo.deck.deckCards as DeckCard[]}
          ></DeckIdContent>
          <CommentsSection
            comments={deckInfo.deck.comments}
            deckId={deckId as string}
          />
        </Content>
      </WideContent>
      <Footer></Footer>
    </Page>
  );
}
