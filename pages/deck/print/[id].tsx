import styled from "styled-components";
import { Type } from "../../../components/card-search-table/card.interface";
import {
  Card,
  GetDeckQuery as GetDeckQueryI,
  GetDeckQueryVariables,
} from "../../../graphql/types";
import { useQuery, gql } from "@apollo/client";
import GetDeckQuery from "raw-loader!../../../graphql/get-deck.gql";
import { useRouter } from "next/router";
import { LinearProgress } from "@material-ui/core";

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

type DeckCard = GetDeckQueryI["deck"]["deckCards"][0];

function orderCardsByType(cards: DeckCard[]) {
  const typeOrder = [
    Type.Objective,
    Type.Location,
    Type.Character,
    Type.Creature,
    Type.Weapon,
    Type.Device,
    Type.Starship,
    Type.Vehicle,
    Type.Effect,
    Type.Interrupt,
    Type.EpicEvent,
    Type.JediTest1,
    Type.JediTest2,
    Type.JediTest3,
    Type.JediTest5,
    Type.JediTest4,
    Type.JediTest6,
    Type.AdmiralsOrder,
    Type.Podracer,
    Type.GameAid,
    Type.DefensiveShield,
  ];
  return cards
    .map((deckCard) => deckCard)
    .sort((a, b) => {
      // TODO any hack
      return (
        typeOrder.indexOf(a.card.type as any) -
        typeOrder.indexOf(b.card.type as any)
      );
    });
}

export default function PrintDeck() {
  const router = useRouter();
  const { data: deckInfo, loading: loadingDeck } = useQuery<
    GetDeckQueryI,
    GetDeckQueryVariables
  >(gql(GetDeckQuery), {
    variables: {
      id: router.query.id as string,
    },
    skip: !Boolean(router.query.id),
  });
  if (loadingDeck || !deckInfo) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

  const deckCards = orderCardsByType(deckInfo.deck.deckCards);

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
                {deckCards.slice(0, 37).map((deckCard, i) => (
                  <>
                    {i + 1}. {deckCard.card.title}
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
                {deckCards.slice(37).map((deckCard, i) => (
                  <>
                    {i + 38}. {deckCard.card.title}
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
