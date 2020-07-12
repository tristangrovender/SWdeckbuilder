import { Page, Toolbar, Content } from "../../components/Toolbar";
import { useRouter } from "next/router";
import { cards } from "../../cards/cards";
import { Card } from "../cards";

export default function CardPage(params) {
  const router = useRouter();
  const { id: cardId } = router.query;
  const card: Card = cards.find(({ id }) => id.toString() === cardId);
  console.log("card:", card);
  if (!card) {
    return <div>Card not found: {cardId}</div>;
  }
  return (
    <Page>
      <Toolbar />
      <Content>
        <h2>{card.front.title}</h2>
        <div style={{ display: "flex" }}>
          <div>{card.front.gametext}</div>
          <img src={card.front.imageUrl} style={{ height: "500px" }}></img>
        </div>
      </Content>
    </Page>
  );
}
