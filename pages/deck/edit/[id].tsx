import { Page, Toolbar, Content } from "../../../components/Toolbar";
import { useRouter } from "next/router";

export default function EditDeck(params) {
  const router = useRouter();
  const { id: deckId } = router.query;
  if (!deckId) {
    return (
      <Page>
        <Toolbar />
        <Content>Deck not found: {deckId}</Content>
      </Page>
    );
  }

  console.log("deckId", deckId);
  return (
    <Page>
      <Toolbar />
      <Content>Edit Deck</Content>
    </Page>
  );
}
