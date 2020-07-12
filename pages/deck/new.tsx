import { Toolbar, Content, Page } from "../../components/Toolbar";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";

export default function NewDeck() {
  return (
    <Page>
      <Toolbar />
      <Content>
        <h1>Choose a side</h1>
        <div style={{ display: "flex" }}>
          <div>
            <img src="/images/light.png"></img>
            <Radio
              checked={true}
              onChange={() => console.log("changed to light")}
              value="a"
              name="radio-button-demo"
            />
          </div>
          <div>
            <img src="/images/dark.png"></img>
            <Radio
              checked={false}
              onChange={() => console.log("changed to dark")}
              value="a"
              name="radio-button-demo"
            />
          </div>
        </div>
        <Button variant="contained" color="primary">
          Create deck
        </Button>
      </Content>
    </Page>
  );
}
