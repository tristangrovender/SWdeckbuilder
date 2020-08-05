import { Page, Toolbar, Content } from "../components/Toolbar";
import Footer from "../components/Footer";

export default function Login() {
  window.location.href =
    "https://swccgdb.auth.us-east-2.amazoncognito.com/login?client_id=4ab8m6p1nglpa4110o2jhpk17&response_type=token&scope=email+openid+profile&redirect_uri=http://localhost:3000/callback";
  return (
    <Page>
      <Toolbar />
      <Content>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        ></div>
      </Content>
      <Footer></Footer>
    </Page>
  );
}
