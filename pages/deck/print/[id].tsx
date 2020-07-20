import styled from "styled-components";

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

{
  /* <style type="text/css">
<!--
.tabl {
}
.card{
.title{
font: 10pt tahoma, arial, helvetica, sans-serif;
text-decoration: none;
font-style: normal;

font-weight: bold;
color: #FFFFFF;
background-color: black;
border-width: 1px;
border-color: black;
border-style: solid;}
-->
</style> */
}

export default function PrintDeck() {
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
            <b style={{ fontSize: "16px" }}>DECK LIST</b>
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
                1. Coruscant: Chancellor's Office (V5)
                <br />
                2. Rise Of The Dark Lord (V7)
                <br />
                3. Combat Response (V7)
                <br />
                4. Vader's Mask (V7)
                <br />
                5. Vader's Helmet (V7)
                <br />
                6. Vader's Cape (V7)
                <br />
                7. Gift Of The Master (V4)
                <br />
                8. Coruscant: Galactic Senate
                <br />
                9. Knowledge And Defense (V4)
                <br />
                10. My Lord, Is That Legal?/I Will Make It Legal
                <br />
                11. Coruscant Guard (V5)
                <br />
                12. Coruscant Guard (V5)
                <br />
                13. Coruscant Guard (V5)
                <br />
                14. Coruscant Guard (V5)
                <br />
                15. Coruscant Guard (V5)
                <br />
                16. Restraining Bolt
                <br />
                17. Restraining Bolt
                <br />
                18. Restraining Bolt
                <br />
                19. Weapon Levitation & The Empire's Back (V6)
                <br />
                20. Weapon Levitation & The Empire's Back (V6)
                <br />
                21. Weapon Levitation & The Empire's Back (V6)
                <br />
                22. Dark Maneuvers
                <br />
                23. Dark Maneuvers
                <br />
                24. Short Range Fighters & Watch Your Back!
                <br />
                25. Short Range Fighters & Watch Your Back!
                <br />
                26. Galen, Secret Apprentice (V4)
                <br />
                27. Galen, Secret Apprentice (V4)
                <br />
                28. Darth Vader, More Machine Than Man (V7)
                <br />
                29. Darth Vader, More Machine Than Man (V7)
                <br />
                30. Squabbling Delegates
                <br />
                31. Squabbling Delegates
                <br />
                32. Lord Sidious (V5)
                <br />
                33. Lord Sidious (V5)
                <br />
                34. Coruscant (EP1)
                <br />
                35. Ability, Ability, Ability (V2)
                <br />
                36. Fighters Coming In
                <br />
                37. Imbalance & Kintan Strider (V6)
                <br />
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
                38. Coruscant Guard
                <br />
                39. Elis Helrot
                <br />
                40. One Bright Spot (V6)
                <br />
                41. One Beautiful Thing (V6)
                <br />
                42. Black Leader (V4)
                <br />
                43. Galen's Fighter (V4)
                <br />
                44. The Emperor's Reach (V6)
                <br />
                45. Saber 1<br />
                46. Baron Soontir Fel
                <br />
                47. Masterful Move & Endor Occupation
                <br />
                48. Vader's Lightsaber
                <br />
                49. Galen's Lightsaber, Vader's Gift (V6)
                <br />
                50. Senate Hovercam
                <br />
                51. Blaster Rack (V1)
                <br />
                52. Force Push (V5)
                <br />
                53. Sith Fury (V5)
                <br />
                54. Strategic Reserves (V5)
                <br />
                55. With Thunderous Applause (V5)
                <br />
                56. Expand The Empire (V5)
                <br />
                57. Order 66 (V5)
                <br />
                58. An Enemy Of The Republic (V5)
                <br />
                59. Keder The Black (V5)
                <br />
                60. Coruscant: Chancellor's Office (V5)
                <br />
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
