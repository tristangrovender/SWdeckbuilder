import styled from "styled-components";
import PersonIcon from "@material-ui/icons/Person";
import { groupBy } from "../utils/utils";
import { Card } from "./card-search-table/card.interface";
import { CardTypeSection } from "../pages/deck/[id]";
import { DeckCard } from "../graphql/types";

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
  padding-top: 10px;
  padding-bottom: 10px;
`;

const DeckCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const PlayerName = styled.div`
  display: flex;
  font-size: 24px;
`;

const Description = styled.div`
  font-size: 14px;
`;

export default function DeckIdContent({
  deckCards,
}: {
  deckCards: DeckCard[];
}) {
  const playerName = "Jambree";
  const p1 =
    "This deck was a lot of fun to make. It's a strategical deck that actually works well enough that it could win a tournament.";
  const p2 =
    "With this deck, the idea is to get Dark Deal down as soon as possible, without allowing your opponent to take back any of Bespin: Cloud City. This might sound pretty tricky, especially considering all of the Light Side powerful characters like Luke, Obi-Wan, Han Solo, and Chewbacca. So, you basically have to play everything in one turn. There's a lot of prep work in there too; mainly drawing and trying to reduce your opponent's force drains.";
  const p3 =
    "Force draining is the thing that does best against this deck, which is why tried to reduce the threat. The ideal starting location is Dagobah, which lets you get a lot of force generation without worrying about your opponent force draining . Battle Order makes it harder for them to force drain at their locations, while Projective Telepathy eats away at their Force Pile. I wish I had more of those.";
  const p4 =
    "Basically, you just draw the whole time, not playing any locations. Wait until you have at least 9 troopers, 1-2 Trooper Assaults, three Cloud City sites, Abyssin Ornament, Bespin: Cloud City, 3-5 TIEs, some offensive space Interrupts (All Power To Weapons, Tallon Roll...), and of course, Dark Deal. Then the fun begins. Save up enough force over a few turns until you have enough to play all your troopers and TIEs. When you're finally ready, deploy 3 Cloud City sites and Bespin: Cloud City. Then, play all your troopers evenly between sites. Once you deploy the troopers, you can play Abyssin Ornament to retrieve all the force you've lost so far. Finally, get 3-4 TIEs down at Cloud City and play Dark Deal!";
  const p5 =
    "Now, the strategy is to keep drawing and cycling through your offensive Interrupts, while force draining the whole time. Generally I force drain around 10 per turn, with more depending on how many sites I control. More sites can be helpful to increase their Life Force losses. That also goes for Limited Resources. Scanning Crew is nice because it helps you see what's coming (do they have a Sense or a What're You Tryin' To Push On Us??). It also can help get rid of their characters by cycling them back into the deck where they probably will unknowingly lose it for force drains.";
  const p6 =
    "It's best just to let your opponent control the whole board without opposition, except for Cloud City (duh). Even a really powerful deck will struggle to take down a site full of troopers when you play a Trooper Assault";
  const p7 =
    "But some players are sneakier than others. Several times, I've had Dark Deal cancelled because of someone playing a character at every site, and a starship at Bespin: Cloud City. Then, the deck design makes it easy to attack each of those lone cards with your site full of troopers. Usually the battle damage alone lets you win. Basically, once you get out Dark Deal, you've backed them into a corner that not many decks can fight their way out of.";
  const p8 =
    "This has probably been one of my best decks yet, and I hope I can make another funky deck like this for the Light Side as well. I'm open to comments or suggestions; let me know if you have any ideas.";

  return (
    <div>
      <MiddleContent>
        <LeftContent>
          <DeckInfoContainer>
            Dark side<br></br>Reserve deck: 60<br></br>6 sets required
          </DeckInfoContainer>
          <DeckCardsContainer>
            {groupBy(deckCards, ["card", "type"])
              .sort((groupA, groupB) => groupA.length - groupB.length)
              .map((cardsInType, i) => (
                <CardTypeSection key={i} deckCards={cardsInType} />
              ))}
          </DeckCardsContainer>
        </LeftContent>
        <RightContent>
          <PlayerName>
            <PersonIcon style={{ fontSize: "31px" }} />
            <div>{playerName}</div>
          </PlayerName>
          <Description>
            {p1}
            <br /> <br />
            {p2}
            <br /> <br />
            {p3}
            <br /> <br />
            {p4}
            <br /> <br />
            {p5}
          </Description>
        </RightContent>
      </MiddleContent>
    </div>
  );
}
