import { Page, Toolbar, Content } from "../../../components/Toolbar";
import { useRouter } from "next/router";
import { CardSearchTable } from "../../../components/card-search-table/card-search-table";
import { Side } from "../../../components/card-search-table/card.interface";

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
          {/* TODO showSide will need to come from /deck/new choice */}
          <CardSearchTable showSide={Side.dark} />
          <CardPanel></CardPanel>
        </div>
      </Content>
    </Page>
  );
}
