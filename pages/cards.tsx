import { useState } from "react";
import { Toolbar, Content } from "../components/Toolbar";
import { LightCards } from "../cards/Light";
import { DarkCards } from "../cards/Dark";

interface Card {
  id: number;
  side: string;
  rarity: string;
  set: string;
  front: {
    title: string;
    imageUrl: string;
    type: string;
    subType: string;
    uniqueness: string;
    destiny: number;
    power: number;
    deploy: number;
    forfeit: number;
    gametext: string;
    lore: string;
    extraText: string[];
  };
  pulledBy: string[];
  legacy: boolean;
}

function CardRow({
  card,
  onMouseOver,
  onMouseOut,
}: {
  card: Card;
  onMouseOver: () => void;
  onMouseOut: () => void;
}) {
  return (
    <div
      style={{ cursor: "pointer" }}
      onMouseEnter={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {card.front && card.front.title}
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
        left: location.x,
        top: location.y,
      }}
    >
      <img src={card.front.imageUrl} style={{ height: "400px" }}></img>
    </div>
  );
}

export default function Cards() {
  const [nameFilter, setNameFilter] = useState(null);
  const [cardHover, setCardHover] = useState({ card: null, location: null });
  return (
    <div>
      <Toolbar />
      <Content>
        <CardHover {...cardHover} />
        <div>
          <input
            onKeyUp={(e) => setNameFilter(e.target.value)}
            placeholder="Card Name"
          ></input>
        </div>

        <div>
          <div style={{ fontWeight: "bold" }}>Name</div>
        </div>
        {LightCards.filter((card) => {
          if (!nameFilter) {
            return true;
          }
          return card.front.title.includes(nameFilter);
        })
          .slice(0, 30)
          .map((card) => {
            return (
              <CardRow
                card={card}
                onMouseOver={(e) =>
                  setCardHover({
                    card: card,
                    location: { x: e.pageX, y: e.pageY },
                  })
                }
                onMouseOut={() => setCardHover({ card: null, location: null })}
              />
            );
          })}
      </Content>
    </div>
  );
}
