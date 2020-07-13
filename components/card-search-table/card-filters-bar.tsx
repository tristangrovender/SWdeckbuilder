import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";

const Input = styled.input`
  background-color: transparent;
  border: 0px;
  color: white;
  &:focus {
    outline: none;
  }
`;

export function CardFiltersBar() {
  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        backgroundColor: "#2d2d2f",
        padding: "10px",
        color: "white",
      }}
    >
      <div
        style={{
          borderRadius: "50px",
          border: "1px solid white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3px 7px",
        }}
      >
        <SearchIcon style={{ transform: "rotate(90deg)" }} />
        <Input placeholder="Search"></Input>
      </div>
    </div>
  );
}
