import { Page, Toolbar, Content } from "../../components/Toolbar";
import { useRouter } from "next/router";
import { cards } from "../../cards/cards";

export default function CardPage(params) {
  const router = useRouter();
  const { id: cardId } = router.query;
  const card = cards.find(({ id }) => id.toString() === cardId);
  console.log("card:", card);
  return (
    <Page>
      <Toolbar />
      <Content>card page here</Content>
    </Page>
  );
}
