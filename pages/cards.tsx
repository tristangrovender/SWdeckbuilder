import { Toolbar, Content, Page } from "../components/Toolbar";
import { CardSearchTable } from "../components/card-search-table/card-search-table";
import { useRouter } from "next/router";

export default function Cards() {
  const router = useRouter();
  console.log(router.query);
  return (
    <Page>
      <Toolbar />
      <Content>
        <CardSearchTable />
      </Content>
    </Page>
  );
}
