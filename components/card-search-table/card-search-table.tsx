import { useState } from "react";
import Link from "next/link";
import { Card, Side } from "./card.interface";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import AddIcon from "@material-ui/icons/Add";

function CardRow({
  card,
  rowColor,
  showSideColumn,
  onMouseOver,
  onMouseOut,
  onAdd,
}: {
  card: Card;
  rowColor: string;
  showSideColumn: boolean;
  onMouseOver: (event: any) => void;
  onMouseOut: () => void;
  onAdd: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: rowColor,
      }}
    >
      <div style={{ flex: 40, alignItems: "center", display: "flex" }}>
        <a
          href={`/card/${card.id}`}
          onMouseEnter={onMouseOver}
          onMouseOut={onMouseOut}
          style={{ marginLeft: "10px" }}
        >
          {card.front && card.front.title}
        </a>
      </div>
      {showSideColumn ? <div style={{ flex: 10 }}>{card.side}</div> : null}
      <div
        style={{
          flex: 10,
          marginRight: "5px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {card.front.type}
      </div>
      <div
        style={{
          flex: 10,
          marginRight: "5px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {card.set}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "2px",
        }}
      >
        <AddIcon onClick={onAdd} style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
}

function CardHover({
  card,
  location,
}: {
  card: Card;
  location: { x: number; y: number };
}) {
  if (!location) {
    return null;
  }
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        top: location.y,
        left: location.x,
      }}
    >
      <img src={card.front.imageUrl} style={{ height: "400px" }}></img>
    </div>
  );
}

export async function getCards() {
  return (await import("../../cards/cards.json")).default;
}

export function CardSearchTable({
  showSide,
  onCardSelected = () => {},
  style = {},
}: {
  showSide?: Side;
  style?: CSSProperties;
  onCardSelected?: (card: Card) => void;
}) {
  const [cardHover, setCardHover] = useState({ card: null, location: null });
  const [cards, setCards] = useState(null);
  if (cards === null) {
    getCards().then(setCards);
    return <div>Loading Cards</div>;
  }
  const showSideColumn = !Boolean(showSide);
  const filteredCards = cards
    .filter((card) => {
      if (showSide) {
        return card.side === showSide;
      }
      return true;
    })
    .slice(0, 100);
  return (
    <div style={{ ...style }}>
      <CardHover {...cardHover} />

      <div style={{ display: "flex" }}>
        <div
          style={{
            fontWeight: "bold",
            flex: 40,
            display: "flex",
            alignItems: "center",
          }}
        >
          Name
        </div>
        {showSideColumn ? (
          <div style={{ fontWeight: "bold", flex: 10 }}>Side</div>
        ) : null}
        <div style={{ fontWeight: "bold", flex: 10 }}>Type</div>
        <div style={{ fontWeight: "bold", flex: 10 }}>Set</div>
        <div style={{ width: "40px" }}></div>
      </div>
      <div style={{ border: "1px solid grey" }}>
        {
          // .filter((card) => {
          //   if (!nameFilter) {
          //     return true;
          //   }
          //   return card.front.title
          //     .toLowerCase()
          //     .includes(nameFilter.toLowerCase());
          // })
          filteredCards.map((card, i) => {
            return (
              <CardRow
                key={card.id}
                rowColor={i % 2 ? "#f5f5f5" : "white"}
                card={card}
                showSideColumn={showSideColumn}
                onMouseOver={(e) =>
                  setCardHover({
                    card: card,
                    location: { x: e.pageX, y: e.pageY },
                  })
                }
                onMouseOut={() => setCardHover({ card: null, location: null })}
                onAdd={() => onCardSelected(card)}
              />
            );
          })
        }
      </div>

      {filteredCards.length === 100 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "grey",
            fontSize: "12px",
            margin: "10px 0px",
          }}
        >
          Please apply filters to see more cards
        </div>
      ) : null}
    </div>
  );
}
