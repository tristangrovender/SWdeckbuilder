import { useState } from "react";
import styled from "styled-components";
import { getRandomDeck } from "../[id]";
import { getCards } from "../../../components/card-search-table/getCards";
import { Card } from "../../../components/card-search-table/card.interface";

const TableContainer = styled.table`
  margin-top: 5px;
  margin-left: 5px;
  border-width: 2px;
  border-color: black;
  border-style: solid;
`;

const CardCell = styled.td`
  font: 9pt tahoma, arial, helvetica, sans-serif;
  text-decoration: none;
  font-style: normal;
  font-weight: normal;
  color: #000000;
  line-height: 14pt;
`;

function orderCardsByType(cards: Card[]) {
  return cards;
}

export default function PrintDeck() {
  const [allCards, setCards] = useState([]);
  const [deck, setDeck] = useState([]);
  if (allCards.length === 0) {
    getCards().then(setCards);
  }
  if (allCards.length && deck.length === 0) {
    setDeck(orderCardsByType(getRandomDeck(allCards)));
  }
  if (deck.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer>
      <table style={{ border: "0px" }} width="100%" cellPadding="3">
        <tr>
          <CardCell width="160">
            Star Wars&trade;
            <br />
            Customizable Card Game&trade;
          </CardCell>
          <CardCell width="130">
            [&nbsp;]&nbsp;LIGHT&nbsp;SIDE&nbsp;&nbsp;&nbsp;&nbsp;[&nbsp;]&nbsp;DARK&nbsp;SIDE
          </CardCell>
          <CardCell>EVENT&nbsp;_______________</CardCell>
          <CardCell>DATE&nbsp;_____</CardCell>
        </tr>
        <tr>
          <CardCell rowSpan={2}>
            <b style={{ fontSize: "24px" }}>DECK LIST</b>
          </CardCell>
          <CardCell width="250" colSpan={4}>
            PLAYER&nbsp;NAME&nbsp;________________________________
          </CardCell>
        </tr>
        <tr>
          <CardCell width="250" colSpan={4}>
            DECK&nbsp;TITLE&nbsp;__________________________________
          </CardCell>
        </tr>
      </table>
      <table cellPadding="3">
        <tr />
        <td>
          <table>
            <tr>
              <CardCell valign="top" width="300">
                <br />
                <b>CARD TITLE</b>
                <br />
                {deck.slice(0, 37).map((card, i) => (
                  <>
                    {i + 1}. {card.front.title} -- {card.front.type}
                    <br />
                  </>
                ))}
              </CardCell>
            </tr>
          </table>
        </td>
        <td valign="top">
          <table>
            <tr>
              <CardCell width="300">
                <br />
                <b>CARD TITLE</b>
                <br />
                {deck.slice(37).map((card, i) => (
                  <>
                    {i + 38}. {card.front.title} -- {card.front.type}
                    <br />
                  </>
                ))}
              </CardCell>
            </tr>
            <tr>
              <CardCell>
                <br />
                <b>DEFENSIVE SHIELDS</b>
                <br />
              </CardCell>
            </tr>
          </table>
        </td>
      </table>
    </TableContainer>
  );
}
