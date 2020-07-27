import styled from "styled-components";

const MiddleContent = styled.div`
  display: flex;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
`;

const LeftContent = styled.div`
  width: 50%;
`;

const DeckInfoContainer = styled.div`
  display: flex;
  font-size: 14px;
`;

const DeckCardsContainer = styled.div``;

const RightContent = styled.div`
  display: flex;
  width: 50%;
  flex-wrap: wrap;
`;

const PlayerName = styled.div`
  display: flex;
  align-items: baseline;
  font-size: 24px;
`;

const Description = styled.div`
  font-size: 14px;
`;

export default function DeckIdContent() {
  const playerName = "Jambree";
  const avatar = "/images/Tristan.jpg";
  const deckDescription =
    "Deck is designed to take out opponents characters, then bring in big intrigue characters with pillage to limit cards in hand to limit opponents ability to defend against strong intrigue challenges.Deck is designed to take out opponents characters, then bring in big intrigue characters with pillage to limit cards in hand to limit opponents ability to defend against strong intrigue challenges.Deck is designed to take out opponents characters, then bring in big intrigue characters with pillage to limit cards in hand to limit opponents ability to defend against strong intrigue challenges.Deck is designed to take out opponents characters, then bring in big intrigue characters with pillage to limit cards in hand to limit opponents ability to defend against strong intrigue challenges.Deck is designed to take out opponents characters, then bring in big intrigue characters with pillage to limit cards in hand to limit opponents ability to defend against strong intrigue challenges.Deck is designed to take out opponents characters, then bring in big intrigue characters with pillage to limit cards in hand to limit opponents ability to defend against strong intrigue challenges.Deck is designed to take out opponents characters, then bring in big intrigue characters with pillage to limit cards in hand to limit opponents ability to defend against strong intrigue challenges.Deck is designed to take out opponents characters, then bring in big intrigue characters with pillage to limit cards in hand to limit opponents ability to defend against strong intrigue challenges.Deck is designed to take out opponents characters, then bring in big intrigue characters with pillage to limit cards in hand to limit opponents ability to defend against strong intrigue challenges.Deck is designed to take out opponents characters, then bring in big intrigue characters with pillage to limit cards in hand to limit opponents ability to defend against strong intrigue challenges.Deck is designed to take out opponents characters, then bring in big intrigue characters with pillage to limit cards in hand to limit opponents ability to defend against strong intrigue challenges.Deck is designed to take out opponents characters, then bring in big intrigue characters with pillage to limit cards in hand to limit opponents ability to defend against strong intrigue challenges.Deck is designed to take out opponents characters, then bring in big intrigue characters with pillage to limit cards in hand to limit opponents ability to defend against strong intrigue challenges.";
  return (
    <div>
      <MiddleContent>
        <LeftContent>
          <DeckInfoContainer>
            Dark side<br></br>Reserve deck: 60<br></br>6 sets required
          </DeckInfoContainer>
          <DeckCardsContainer>cards go here</DeckCardsContainer>
        </LeftContent>
        <RightContent>
          <PlayerName>
            <img
              src={avatar}
              style={{
                width: "25px",
                height: "25px",
                borderRadius: "5px",
                marginRight: "5px"
              }}
            ></img>
            <a href="/">{playerName}</a>
          </PlayerName>
          <Description>{deckDescription}</Description>
        </RightContent>
      </MiddleContent>
    </div>
  );
}
