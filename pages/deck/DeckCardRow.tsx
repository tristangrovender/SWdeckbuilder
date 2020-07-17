import { useState } from "react";
import { Card } from "../../components/card-search-table/card.interface";
import { CardSnippet } from "../../components/card-snippet";
import { ClickAwayListener } from "@material-ui/core";
export function DeckCardRow({ card }: { card: Card }) {
  const [isHovering, setHovering] = useState(false);
  const [viewCard, setViewCard] = useState(false);
  return (
    <div
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ cursor: "pointer" }}
    >
      <CardSnippet
        title={card.front.title}
        style={{ marginLeft: "3px" }}
        imageUrl={card.front.imageUrl}
        isHovering={isHovering}
        hoverButtons={[
          {
            text: "i",
            onClick: () => setViewCard(true),
          },
        ]}
      />
      {viewCard ? (
        <ClickAwayListener onClickAway={() => setViewCard(false)}>
          <div style={{ position: "absolute", height: "400px", zIndex: 1 }}>
            <img src={card.front.imageUrl}></img>
          </div>
        </ClickAwayListener>
      ) : null}
    </div>
  );
}
