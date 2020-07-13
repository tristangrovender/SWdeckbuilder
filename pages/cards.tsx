import { Toolbar, Content, Page } from "../components/Toolbar";
import { CardSearchTable } from "../components/card-search-table/card-search-table";

export default function Cards() {
  return (
    <Page>
      <Toolbar />
      <Content>
        <CardSearchTable />
      </Content>
    </Page>
  );
}
