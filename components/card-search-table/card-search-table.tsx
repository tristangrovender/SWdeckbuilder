import { useState } from "react";
import { CardIcon } from "./card-icon";
import Link from "next/link";
import { Card, Side } from "./card.interface";

function CardRow({
  card,
  rowColor,
  showSideColumn,
  onMouseOver,
  onMouseOut,
  onClick,
}: {
  card: Card;
  rowColor: string;
  showSideColumn: boolean;
  onMouseOver: (event: any) => void;
  onMouseOut: () => void;
  onClick: () => void;
}) {
  return (
    <div
      style={{ cursor: "pointer", display: "flex", backgroundColor: rowColor }}
      onClick={onClick}
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
  onCardSelected,
}: {
  showSide?: Side;
  onCardSelected: (card: Card) => void;
}) {
  const [nameFilter, setNameFilter] = useState(null);
  const [cardHover, setCardHover] = useState({ card: null, location: null });
  const [cards, setCards] = useState(null);
  if (cards === null) {
    getCards().then(setCards);
    return <div>Loading Cards</div>;
  }
  const showSideColumn = !Boolean(showSide);
  return (
    <div style={{ width: "100%" }}>
      <CardHover {...cardHover} />
      <div>
        <input
          onKeyUp={(e) => setNameFilter((e.target as any).value)}
          placeholder="Card Name"
        ></input>
      </div>

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
      </div>
      <div style={{ border: "1px solid grey" }}>
        {cards
          .filter((card) => {
            if (showSide) {
              return card.side === showSide;
            }
            return true;
          })
          .filter((card) => {
            if (!nameFilter) {
              return true;
            }
            return card.front.title
              .toLowerCase()
              .includes(nameFilter.toLowerCase());
          })
          .slice(0, 30)
          .map((card, i) => {
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
                onClick={() => onCardSelected(card)}
              />
            );
          })}
      </div>
    </div>
  );
}
