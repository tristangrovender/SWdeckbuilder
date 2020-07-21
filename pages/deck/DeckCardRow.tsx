import { useState } from "react";
import { Card } from "../../components/card-search-table/card.interface";
import { CardSnippet } from "../../components/card-snippet";
import { getCoordinatesInViewPort } from "../../components/card-search-table/card-search-results";
export function DeckCardRow({ card }: { card: Card }) {
  const [hoveringLocation, setHovering] = useState(undefined);
  return (
    <div
      onMouseOver={(e) => {
        setHovering({
          x: e.pageX,
          y: e.pageY,
        });
      }}
      onMouseLeave={() => setHovering(undefined)}
      style={{ cursor: "pointer" }}
    >
      <CardSnippet
        title={card.front.title}
        style={{ marginLeft: "3px" }}
        imageUrl={card.front.imageUrl}
      />
      {hoveringLocation ? (
        <div
          style={{
            position: "absolute",
            height: "500px",
            zIndex: 2,
            ...getCoordinatesInViewPort(hoveringLocation, 500),
          }}
        >
          <img src={card.front.imageUrl} style={{ height: "500px" }}></img>
        </div>
      ) : null}
    </div>
  );
}

export default function deleteme() {
  return <div>test</div>;
}
