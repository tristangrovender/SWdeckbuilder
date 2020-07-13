import { Page, Toolbar, Content } from "../../../components/Toolbar";
import { useRouter } from "next/router";

function CardPanel() {
  return <div>Card Panel</div>;
}

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
      <Content>
        <div contentEditable={true}>Un-named Deck</div>
        <div style={{ display: "flex" }}>
          <div>card search table</div>
          <CardPanel></CardPanel>
        </div>
      </Content>
    </Page>
  );
}
