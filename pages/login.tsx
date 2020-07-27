import { Page, Toolbar, Content } from "../components/Toolbar";
import Footer from "../components/Footer";
import { Input, Button } from "@material-ui/core";
export default function Login() {
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
        >
          <div style={{ marginTop: "-200px", width: "400px" }}>
            <div>Login</div>
            <br></br>
            <div>
              <div style={{ color: "rgba(0,0,0,0.4)" }}>Username:</div>
              <Input
                placeholder="username"
                value="exampleuser_justclicklogin"
                style={{ width: "100%" }}
              ></Input>
            </div>
            <br />
            <div>
              <div style={{ color: "rgba(0,0,0,0.4)" }}>Password:</div>
              <Input
                placeholder="password"
                value="password"
                type="password"
                style={{ width: "100%" }}
              ></Input>
            </div>
            <Button
              color="primary"
              variant="contained"
              style={{ width: "100%", marginTop: "20px" }}
            >
              Login
            </Button>
          </div>
        </div>
      </Content>
      <Footer></Footer>
    </Page>
  );
}
