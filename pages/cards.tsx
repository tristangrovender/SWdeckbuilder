import { useState } from "react";
import { Toolbar, Content } from "../components/Toolbar";
import { LightCards } from "../cards/Light";
import { DarkCards } from "../cards/Dark";

export default function Cards() {
  const [nameFilter, setNameFilter] = useState(null);
  console.log("woohoo hooks are working!");
  return (
    <div>
      <Toolbar />
      <Content>
        <input onKeyUp={(e) => setNameFilter(e.target.value)}></input>
        {LightCards.filter((card) => {
          if (!nameFilter) {
            return true;
          }
          return card.front.title.includes(nameFilter);
        })
          .slice(0, 30)
          .map((card) => {
            return (
              <img
                src={card.front.imageUrl}
                key={card.id}
                style={{ height: "330px", display: "inline", margin: "10px" }}
              ></img>
            );
          })}
      </Content>
    </div>
  );
}
