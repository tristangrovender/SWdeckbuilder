import { Page, Toolbar, Content } from "../../components/Toolbar";
import { useRouter } from "next/router";

export default function CardPage(params) {
  const router = useRouter();
  const { id: cardId } = router.query;
  console.log("Card ID:", cardId);
  return (
    <Page>
      <Toolbar />
      <Content>card page here</Content>
    </Page>
  );
}
