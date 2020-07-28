import styled from "styled-components";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { darkBlue } from "../utils/colors";
import Tooltip from "@material-ui/core/Tooltip";

const CardSnippetTitleContainer = styled.div`
  width: 100%;
  white-space: nowrap;
  color: ${(props) => (props.textColor ? props.textColor : "white")};
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;
  pointer-events: none;
`;

const CardControlButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: "#fcd144";
  border-left: 1px solid #2f2f2f;
  height: 100%;
  min-width: 25px;
  padding: 0px 5px;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

export function FadedImage({
  imageUrl,
  backgroundColor,
  children,
}: {
  imageUrl?: string;
  backgroundColor: string;
  children?: any;
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: "0px -130px",
        backgroundSize: "240px",
        backgroundRepeat: "no-repeat",
        width: "50%",
        maxWidth: "230px",
        position: "absolute",
        bottom: "0px",
        right: "0px",
        height: "100%",
        zIndex: 0,
      }}
    >
      <div
        style={{
          background: `linear-gradient(to left, rgba(255,255,255,0) 0%, ${backgroundColor} 100%)`,
          height: "100%",
        }}
      ></div>
      {children}
    </div>
  );
}

export function CardSnippet({
  title,
  imageUrl,
  style,
  isHovering,
  backgroundColor = darkBlue,
  hoverButtons,
  textColor,
  onMouseDown,
}: {
  title?: string;
  imageUrl?: string;
  backgroundColor?: string;
  style?: CSSProperties;
  textColor?: string;
  isHovering?: boolean;
  hoverButtons?: {
    text: string;
    fontSize?: string;
    tooltip?: string;
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
        position: "relative",
      }}
    >
      <CardSnippetTitleContainer textColor={textColor}>
        {title}
      </CardSnippetTitleContainer>
      <FadedImage
        imageUrl={imageUrl}
        backgroundColor={backgroundColor}
      ></FadedImage>
      <div
        style={{
          display: isHovering ? "flex" : "none",
          zIndex: 30,
          position: "absolute",
          top: "0px",
          right: "0px",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.9)",
          userSelect: "none",
        }}
      >
        {hoverButtons
          ? hoverButtons.map(({ text, fontSize, onClick, tooltip }, i) => {
              const icon = (
                <CardControlButton
                  key={i}
                  onClick={onClick}
                  style={{ fontSize: fontSize || "initial" }}
                >
                  {text}
                </CardControlButton>
              );

              return tooltip ? (
                <Tooltip title={tooltip} key={i}>
                  {icon}
                </Tooltip>
              ) : (
                icon
              );
            })
          : null}
      </div>
    </div>
  );
}
