import { Toolbar, Content, Page } from "../components/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "next/link";

export default function MyDecks() {
  return (
    <Page>
      <Toolbar />
      <Content>
        <Link href="/deck/new">
          <Button variant="contained" color="primary">
            Build New Deck
          </Button>
        </Link>
      </Content>
    </Page>
  );
}
