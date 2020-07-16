import { Card } from "./card-search-table/card.interface";
import styled from "styled-components";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { darkBlue } from "../utils/colors";

const CardControlButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fcd144;
  border-left: 1px solid #2f2f2f;
  height: 100%;
  min-width: 25px;
  padding: 0px 5px;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

export function CardSnippet({
  title,
  imageUrl,
  style,
  isHovering,
  backgroundColor = darkBlue,
  hoverButtons,
  onMouseDown,
}: {
  title: string;
  imageUrl: string;
  backgroundColor?: string;
  style?: CSSProperties;
  isHovering?: boolean;
  hoverButtons?: {
    text: string;
    fontSize?: string;
    onClick: () => void;
  }[];
  onMouseDown?: () => void;
}) {
  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        ...style,
        display: "flex",
        justifyContent: "space-between",
        flexGrow: 1,
      }}
    >
      <div
        style={{
          width: "50%",
          whiteSpace: "nowrap",
          color: "white",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title}
      </div>
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: "-24px -130px",
          backgroundSize: "240px",
          width: "50%",
          position: "relative",
        }}
      >
        <div
          style={{
            background: `linear-gradient(to left, rgba(255,255,255,0) 0%, ${backgroundColor} 100%)`,
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
          {hoverButtons
            ? hoverButtons.map(({ text, fontSize, onClick }) => (
                <CardControlButton
                  onClick={onClick}
                  style={{ fontSize: fontSize || "initial" }}
                >
                  {text}
                </CardControlButton>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
