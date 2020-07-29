import { useState } from "react";
import styled from "styled-components";
import { Card } from "../graphql/types";
import { CardSnippet } from "./card-snippet";
import { goldenColor } from "../utils/colors";

const CardPanelRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  padding-left: 3px;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid #fcd144;
  }
`;

const CardSnippetCountContainer = styled.div`
  color: ${goldenColor};
  font-size: 12px;
  display: flex;
  width: 15px;
  justify-content: center;
  align-items: center;
`;

export function CardPanelRow({
  card,
  count,
  backgroundColor,
  hoverButtons,
  textColor,
}: {
  card?: Card;
  count: number;
  backgroundColor?: string;
  textColor?: string;
  hoverButtons?: {
    text: string;
    fontSize?: string;
    tooltip?: string;
    onClick: () => void;
  }[];
}) {
  const [isHovering, setHovering] = useState(false);
  return (
    <CardPanelRowContainer
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <CardSnippet
        title={card?.title}
        imageUrl={card?.imageUrl}
        hoverButtons={hoverButtons}
        backgroundColor={backgroundColor}
        isHovering={isHovering}
        textColor={textColor}
        style={{ maxWidth: "94%" }}
      />
      <CardSnippetCountContainer>
        {count > 1 ? count : null}
      </CardSnippetCountContainer>
    </CardPanelRowContainer>
  );
}
