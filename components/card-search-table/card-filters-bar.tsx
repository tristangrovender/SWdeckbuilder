import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import BlurOnIcon from "@material-ui/icons/BlurOn";
import FlagIcon from "@material-ui/icons/Flag";
import GavelIcon from "@material-ui/icons/Gavel";
import { Card } from "./card.interface";

const FilterIconContainer = styled.div`
  border-radius: 50px;
  border: 1px solid #6f6f6f;
  display: flex;
  align-items: center;
  padding: 2px 0px;
  padding-right: 10px;
  justify-content: center;
  margin-right: 10px;
`;

const SearchContainer = styled.div`
  border-radius: 50px;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 7px;
  margin-right: 10px;
`;

const CardFilterBarContainer = styled.div`
  display: flex;
  flex-grow: 1;
  background-color: #2d2d2f;
  justify-content: center;
  padding: 10px;
  color: white;
  align-items: center;
`;

const Input = styled.input`
  background-color: transparent;
  border: 0px;
  color: white;
  &:focus {
    outline: none;
  }
`;

export function applyFilters(allCards: Card[], filters: CardFilters) {
  // TODO add side filter
  return allCards.filter((card) => {
    if (!filters || !filters.titleFilter) {
      return true;
    }
    return card.front.title
      .toLowerCase()
      .includes(filters.titleFilter.toLowerCase());
  });
}

function FilterIcon({ Icon, text }: { Icon: any; text: string }) {
  return (
    <FilterIconContainer>
      <StyledIcon />
      <Icon
        style={{
          fontSize: "30px",
          marginRight: "5px",
          borderRadius: "100px",
          border: "1px solid white",
          padding: "5px",
        }}
      ></Icon>
      <div style={{ marginLeft: "3px" }}>{text}</div>

      <ExpandMoreIcon style={{ marginLeft: "5px", fontSize: "16px" }} />
    </FilterIconContainer>
  );
}
export interface CardFilters {
  titleFilter: string;
}

export function CardFiltersBar({
  allCards,
  filters,
  onUpdateFilters,
}: {
  allCards: Card[];
  filters?: CardFilters;
  onUpdateFilters: (cardFilters: CardFilters) => void;
}) {
  return (
    <CardFilterBarContainer>
      <SearchContainer>
        <SearchIcon style={{ transform: "rotate(90deg)" }} />
        <Input
          placeholder="Search"
          defaultValue={filters && filters.titleFilter}
          onKeyUp={(e) =>
            onUpdateFilters({ ...filters, titleFilter: e.target.value })
          }
        ></Input>
      </SearchContainer>
      <FilterIcon Icon={MenuBookIcon} text={"Set: All"} />
      <FilterIcon Icon={SupervisorAccountIcon} text={"Type: All"} />
      <FilterIcon Icon={BlurOnIcon} text={"Destiny: All"} />
      <FilterIcon Icon={GavelIcon} text={"Power: All"} />
      <FilterIcon Icon={ArrowUpwardIcon} text={"Deploy: All"} />
      <FilterIcon Icon={FlagIcon} text={"Forfeit: All"} />
    </CardFilterBarContainer>
  );
}
