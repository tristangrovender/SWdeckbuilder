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

function CardRow({ card }: { card: Card }) {
  return <div>{card.front && card.front.title}</div>;
}

export default function Cards() {
  const [nameFilter, setNameFilter] = useState(null);
  console.log("woohoo hooks are working!");
  return (
    <div>
      <Toolbar />
      <Content>
        <div>
          <input
            onKeyUp={(e) => setNameFilter(e.target.value)}
            placeholder="Card Name"
          ></input>
        </div>

        {LightCards.filter((card) => {
          if (!nameFilter) {
            return true;
          }
          return card.front.title.includes(nameFilter);
        })
          .slice(0, 30)
          .map((card) => {
            return <CardRow card={card} />;
          })}
      </Content>
    </div>
  );
}
