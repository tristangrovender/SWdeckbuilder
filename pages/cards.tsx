import { useState } from "react";
import { Toolbar, Content, Page } from "../components/Toolbar";
import { LightCards } from "../cards/Light";
import { DarkCards } from "../cards/Dark";
import { CardIcon } from "../components/card-icon";

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
  rowColor,
  onMouseOver,
  onMouseOut,
}: {
  card: Card;
  rowColor: string;
  onMouseOver: () => void;
  onMouseOut: () => void;
}) {
  return (
    <div
      style={{ cursor: "pointer", display: "flex", backgroundColor: rowColor }}
    >
      <div
        onMouseEnter={onMouseOver}
        onMouseOut={onMouseOut}
        style={{
          width: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardIcon style={{ pointerEvents: "none", width: "20px" }} />
      </div>
      <div style={{ flex: 40 }}>{card.front && card.front.title}</div>
      <div style={{ flex: 10 }}>{card.side}</div>
      <div style={{ flex: 10 }}>{card.front.type}</div>
      <div style={{ flex: 10 }}>{card.set}</div>
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

export default function Cards() {
  const [nameFilter, setNameFilter] = useState(null);
  const [cardHover, setCardHover] = useState({ card: null, location: null });
  return (
    <Page>
      <Toolbar />
      <Content>
        <CardHover {...cardHover} />
        <div>
          <input
            onKeyUp={(e) => setNameFilter(e.target.value)}
            placeholder="Card Name"
          ></input>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ fontWeight: "bold", width: "50px" }}>Card</div>
          <div style={{ fontWeight: "bold", flex: 40 }}>Name</div>
          <div style={{ fontWeight: "bold", flex: 10 }}>Side</div>
          <div style={{ fontWeight: "bold", flex: 10 }}>Type</div>
          <div style={{ fontWeight: "bold", flex: 10 }}>Set</div>
        </div>
        <div style={{ border: "1px solid grey" }}>
          {LightCards.filter((card) => {
            if (!nameFilter) {
              return true;
            }
            return card.front.title.includes(nameFilter);
          })
            .slice(0, 30)
            .map((card, i) => {
              return (
                <CardRow
                  key={card.id}
                  rowColor={i % 2 ? "#f5f5f5" : "white"}
                  card={card}
                  onMouseOver={(e) =>
                    setCardHover({
                      card: card,
                      location: { x: e.pageX, y: e.pageY },
                    })
                  }
                  onMouseOut={() =>
                    setCardHover({ card: null, location: null })
                  }
                />
              );
            })}
        </div>
      </Content>
    </Page>
  );
}
