import { Toolbar, Content, Page } from "../components/Toolbar";
import Button from "@material-ui/core/Button";

export default function MyDecks() {
  return (
    <Page>
      <Toolbar />
      <Content>
        <Button variant="contained" color="primary">
          Build New Deck
        </Button>
      </Content>
    </Page>
  );
}
