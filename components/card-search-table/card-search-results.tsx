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
  onAdd,
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
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
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
            marginRight: "2px",
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

export function getCoordinatesInViewPort(
  location: { x: number; y: number },
  componentHeight: number
): { top: number; left: number } {
  const { top } = document.body.getClientRects()[0];
  const screenHeight = window.innerHeight;
  const topOfScreenY = Math.abs(top);
  const bottomOfScreenY = screenHeight - top;
  const desiredTop = location.y - componentHeight / 2;

  const left = location.x + componentHeight / 2;
  if (desiredTop + componentHeight > bottomOfScreenY) {
    const top = desiredTop - (desiredTop + componentHeight - bottomOfScreenY);
    return {
      top,
      left,
    };
  }
  if (desiredTop < topOfScreenY) {
    const top = topOfScreenY;
    return {
      top,
      left,
    };
  }

  return {
    top: desiredTop,
    left,
  };
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
        zIndex: 11,
        ...getCoordinatesInViewPort(location, 400),
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
  style = {},
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
              onMouseOver={(e) =>
                setCardHover({
                  card: card,
                  location: { x: e.pageX, y: e.pageY },
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
            margin: "10px 0px",
          }}
        >
          Please apply filters to see more cards
        </div>
      ) : null}
    </div>
  );
}
