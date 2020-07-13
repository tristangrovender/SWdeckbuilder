import { Page, Toolbar, Content } from "../../../components/Toolbar";
import { useRouter } from "next/router";
import { CardSearchTable } from "../../../components/card-search-table/card-search-table";

function CardPanel() {
  return (
    <div style={{ width: "300px", height: "400px", border: "1px solid red" }}>
      Card Panel
    </div>
  );
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
          <CardSearchTable showSide={false} />
          <CardPanel></CardPanel>
        </div>
      </Content>
    </Page>
  );
}
