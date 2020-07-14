import { Card } from "./card-search-table/card.interface";
import styled from "styled-components";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

const CardControlButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fcd144;
  border-left: 1px solid #2f2f2f;
  height: 100%;
  width: 30px;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

export function CardSnippet({
  card,
  style,
  isHovering,
  removeCard,
  addCard,
}: {
  card: Card;
  style: CSSProperties;
  isHovering?: boolean;
  removeCard?: () => void;
  addCard?: () => void;
}) {
  return (
    <div
      style={{
        ...style,
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#292e3c",
        flexGrow: 1,
      }}
    >
      <div
        style={{
          width: "50%",
          whiteSpace: "nowrap",
          backgroundColor: "#292e3c",
          color: "white",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {card.front.title}
      </div>
      <div
        style={{
          backgroundImage: `url(${card.front.imageUrl})`,
          backgroundPosition: "-24px -130px",
          backgroundSize: "240px",
          width: "50%",
          position: "relative",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(to left, rgba(255,255,255,0) 0%,rgb(41, 46, 60) 100%)",
            height: "100%",
          }}
        ></div>
        <div
          style={{
            display: isHovering ? "flex" : "none",
            zIndex: 10,
            position: "absolute",
            top: "0px",
            right: "0px",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            userSelect: "none",
          }}
        >
          <CardControlButton onClick={removeCard}>-</CardControlButton>
          <CardControlButton onClick={addCard}>+</CardControlButton>
        </div>
      </div>
    </div>
  );
}
