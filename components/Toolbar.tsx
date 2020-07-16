import styled from "styled-components";
import Link from "next/link";
import { SearchBar } from "../components/SearchBar";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { grey, blueGrey } from "@material-ui/core/colors";
import { goldenColor } from "../utils/colors";

const contentWidth = 960;

const PageContainer = styled.div`
  background-color: #ecf0f1;
  min-height: 100vh;
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[500],
    },
    secondary: {
      main: blueGrey[500],
    },
  },
});

export const Page = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <PageContainer>{children}</PageContainer>
    </ThemeProvider>
  );
};

const ToolbarContainer = styled.div`
  background-color: #222;
  height: 80px;
  color: #ccc;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const ToolbarContent = styled.div`
  display: flex;
  width: ${contentWidth}px;
  align-items: center;
`;

const ToolbarLink = styled.div`
  margin-right: 25px;
  text-decoration: none;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 80px);
`;

export function Content({ children }) {
  return (
    <ContentContainer>
      <div style={{ width: contentWidth + "px" }}>{children}</div>
    </ContentContainer>
  );
}

export function Toolbar() {
  return (
    <ToolbarContainer>
      <ToolbarContent>
        <Link href="/">
          <ToolbarLink>SW:CCG DB</ToolbarLink>
        </Link>
        <Link href="/my-decks">
          <ToolbarLink style={{ fontSize: "14px" }}>My decks</ToolbarLink>
        </Link>
        <Link href="/decklists">
          <ToolbarLink style={{ fontSize: "14px" }}>Decklists</ToolbarLink>
        </Link>
        <Link href="/cards">
          <ToolbarLink style={{ fontSize: "14px" }}>Cards</ToolbarLink>
        </Link>
        <div style={{ flexGrow: 1 }}></div>
        <SearchBar></SearchBar>
      </ToolbarContent>
    </ToolbarContainer>
  );
}
