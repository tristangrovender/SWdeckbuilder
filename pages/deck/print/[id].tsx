import { useState } from "react";
import styled from "styled-components";
import { getRandomDeck } from "../[id]";
import { getCards } from "../../../components/card-search-table/getCards";

const TableContainer = styled.table`
  margin-top: 5px;
  margin-left: 5px;
  border-width: 2px;
  border-color: black;
  border-style: solid;
`;

const Card = styled.td`
  font: 9pt tahoma, arial, helvetica, sans-serif;
  text-decoration: none;
  font-style: normal;
  font-weight: normal;
  color: #000000;
  line-height: 14pt;
`;

export default function PrintDeck() {
  const [allCards, setCards] = useState([]);
  const [deck, setDeck] = useState([]);
  if (allCards.length === 0) {
    getCards().then(setCards);
  }
  if (allCards.length && deck.length === 0) {
    setDeck(getRandomDeck(allCards));
  }
  if (deck.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer>
      <table style={{ border: "0px" }} width="100%" cellPadding="3">
        <tr>
          <Card width="160">
            Star Wars&trade;
            <br />
            Customizable Card Game&trade;
          </Card>
          <Card width="130">
            [&nbsp;]&nbsp;LIGHT&nbsp;SIDE&nbsp;&nbsp;&nbsp;&nbsp;[&nbsp;]&nbsp;DARK&nbsp;SIDE
          </Card>
          <Card>EVENT&nbsp;_______________</Card>
          <Card>DATE&nbsp;_____</Card>
        </tr>
        <tr>
          <Card rowSpan={2}>
            <b style={{ fontSize: "24px" }}>DECK LIST</b>
          </Card>
          <Card width="250" colSpan={4}>
            PLAYER&nbsp;NAME&nbsp;________________________________
          </Card>
        </tr>
        <tr>
          <Card width="250" colSpan={4}>
            DECK&nbsp;TITLE&nbsp;__________________________________
          </Card>
        </tr>
      </table>
      <table cellPadding="3">
        <tr />
        <td>
          <table>
            <tr>
              <Card valign="top" width="300">
                <br />
                <b>CARD TITLE</b>
                <br />
                {deck.slice(0, 37).map((card, i) => (
                  <>
                    {i + 1}. {card.front.title}
                    <br />
                  </>
                ))}
              </Card>
            </tr>
          </table>
        </td>
        <td valign="top">
          <table>
            <tr>
              <Card width="300">
                <br />
                <b>CARD TITLE</b>
                <br />
                {deck.slice(37).map((card, i) => (
                  <>
                    {i + 38}. {card.front.title}
                    <br />
                  </>
                ))}
              </Card>
            </tr>
            <tr>
              <Card>
                <br />
                <b>DEFENSIVE SHIELDS</b>
                <br />
              </Card>
            </tr>
          </table>
        </td>
      </table>
    </TableContainer>
  );
}
