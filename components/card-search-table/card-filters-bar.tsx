import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

const Input = styled.input`
  background-color: transparent;
  border: 0px;
  color: white;
  &:focus {
    outline: none;
  }
`;

function FilterIcon({ Icon, text }: { Icon: any; text: string }) {
  return (
    <div
      style={{
        borderRadius: "50px",
        border: "1px solid #6f6f6f",
        display: "flex",
        alignItems: "center",
        padding: "2px 0px",
        paddingRight: "10px",
        justifyContent: "center",
        marginRight: "10px",
      }}
    >
      <Icon
        style={{
          fontSize: "30px",
          marginRight: "5px",
          borderRadius: "100px",
          border: "1px solid white",
          padding: "5px",
        }}
      />
      <div style={{ marginLeft: "3px" }}>{text}</div>

      <ExpandMoreIcon style={{ marginLeft: "5px", fontSize: "16px" }} />
    </div>
  );
}

export function CardFiltersBar() {
  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        backgroundColor: "#2d2d2f",
        padding: "10px",
        color: "white",
        alignItems: "center",
      }}
    >
      <div
        style={{
          borderRadius: "50px",
          border: "1px solid white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2px 7px",
          marginRight: "10px",
        }}
      >
        <SearchIcon style={{ transform: "rotate(90deg)" }} />
        <Input placeholder="Search"></Input>
      </div>
      <FilterIcon Icon={MenuBookIcon} text={"Set: All"} />
      <FilterIcon Icon={SupervisorAccountIcon} text={"Type: All"} />
      <FilterIcon Icon={SupervisorAccountIcon} text={"Destiny: All"} />
      <FilterIcon Icon={SupervisorAccountIcon} text={"Power: All"} />
      <FilterIcon Icon={SupervisorAccountIcon} text={"Deploy: All"} />
      <FilterIcon Icon={SupervisorAccountIcon} text={"Forfeit: All"} />
    </div>
  );
}
