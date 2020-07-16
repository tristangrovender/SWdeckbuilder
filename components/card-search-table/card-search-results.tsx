import { useState } from "react";
import Link from "next/link";
import { Card, Side } from "./card.interface";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import AddIcon from "@material-ui/icons/Add";
import { CardFilters } from "./card-filters-bar";

function CardRow({
  card,
  rowColor,
  showSideColumn,
  onMouseOver,
  onMouseOut,
  onAdd
}: {
  card: Card;
  rowColor: string;
  showSideColumn: boolean;
  onMouseOver: (event: any) => void;
  onMouseOut: () => void;
  onAdd?: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: rowColor
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
          alignItems: "center"
        }}
      >
        {card.front.type}
      </div>
      <div
        style={{
          flex: 10,
          marginRight: "5px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
        title={card.set}
      >
        {card.set}
      </div>
      {onAdd ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "2px"
          }}
        >
          <AddIcon onClick={onAdd} style={{ cursor: "pointer" }} />
        </div>
      ) : null}
    </div>
  );
}

// Card hover effect
// Have a fixed position that the card shows up?
// simply prevent the card hover from showing off-screen?
// card hover projects right and up from the point of the mouse?

function CardHover({
  card,
  location
}: {
  card: Card;
  location: { x: number; y: number };
}) {
  if (!location) {
    return null;
  }
  const { top } = document.body.getClientRects()[0];
  const screenHeight = window.innerHeight;

  const topOfScreenY = Math.abs(top);
  const bottomOfScreenY = screenHeight - top;
  console.log(
    "Make sure the Y coordinate is between",
    topOfScreenY,
    "and",
    bottomOfScreenY,
    ". The card topY is ",
    location.y,
    "bottom y is",
    location.y + 400 // 300 is my guess at the card height
  );
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        top: location.y < bottomOfScreenY ? location.y - 400 : location.y + 400,
        left: location.x + 200
      }}
    >
      <img src={card.front.imageUrl} style={{ height: "400px" }}></img>
    </div>
  );
}

export function CardSearchResults({
  cards,
  showSide,
  onCardSelected,
  style = {}
}: {
  cards: Card[];
  showSide?: Side;
  style?: CSSProperties;
  onCardSelected?: (card: Card) => void;
}) {
  const [cardHover, setCardHover] = useState({ card: null, location: null });
  const showSideColumn = !Boolean(showSide);
  const filteredCards = cards.slice(0, 100);
  return (
    <div style={{ ...style }}>
      <CardHover {...cardHover} />

      <div style={{ display: "flex" }}>
        <div
          style={{
            fontWeight: "bold",
            flex: 40,
            display: "flex",
            alignItems: "center"
          }}
        >
          Name
        </div>
        {showSideColumn ? (
          <div style={{ fontWeight: "bold", flex: 10 }}>Side</div>
        ) : null}
        <div style={{ fontWeight: "bold", flex: 10 }}>Type</div>
        <div style={{ fontWeight: "bold", flex: 10 }}>Set</div>
        {onCardSelected ? <div style={{ width: "40px" }}></div> : null}
      </div>
      <div style={{ border: "1px solid grey" }}>
        {filteredCards.map((card, i) => {
          return (
            <CardRow
              key={card.id}
              rowColor={i % 2 ? "#f5f5f5" : "white"}
              card={card}
              showSideColumn={showSideColumn}
              onMouseOver={e =>
                setCardHover({
                  card: card,
                  location: { x: e.pageX, y: e.pageY }
                })
              }
              onMouseOut={() => setCardHover({ card: null, location: null })}
              onAdd={onCardSelected ? () => onCardSelected(card) : null}
            />
          );
        })}
      </div>

      {filteredCards.length === 100 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "grey",
            fontSize: "12px",
            margin: "10px 0px"
          }}
        >
          Please apply filters to see more cards
        </div>
      ) : null}
    </div>
  );
}
