import { Toolbar, Content, Page } from "../components/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "next/link";

export default function MyDecks() {
  return (
    <Page>
      <Toolbar />
      <Content>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            marginTop: "-100px",
          }}
        >
          <div>Build your first deck:&nbsp;</div>
          <Link href="/deck/new">
            <Button variant="contained" color="primary">
              New Deck
            </Button>
          </Link>
        </div>
      </Content>
    </Page>
  );
}
