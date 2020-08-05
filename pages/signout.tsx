import { Page, Toolbar, Content } from "../components/Toolbar";
import { removeToken } from "../utils/frontend-auth";
export default function Signout() {
  removeToken();
  return (
    <Page>
      <Toolbar />
      <Content>
        <div>Signed out</div>
      </Content>
    </Page>
  );
}
