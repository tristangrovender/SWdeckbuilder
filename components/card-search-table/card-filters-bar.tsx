import SearchIcon from "@material-ui/icons/Search";
import ClickAwayListener from "react-click-away-listener";
import styled from "styled-components";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import BlurOnIcon from "@material-ui/icons/BlurOn";
import FlagIcon from "@material-ui/icons/Flag";
import GavelIcon from "@material-ui/icons/Gavel";
import { Card, Side } from "./card.interface";
import { unique, sortAlphabetically } from "../../utils/utils";
import { useState } from "react";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { darkBlue, goldenColor } from "../../utils/colors";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import FilterListIcon from "@material-ui/icons/FilterList";

const FilterOptionsContainer = styled.div`
  position: absolute;
  background-color: ${darkBlue};
  color: white;
  max-height: 400px;
  overflow-y: scroll;
  top: 37px;
  left: 0px;
  padding: 10px;
  font-size: 14px;
  width: 200px;
  border: 1px solid black;
`;

const ClickableFilterIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
`;

const FilterIconContainer = styled.div`
  z-index: 10;
  position: relative;
  border-radius: 50px;
  border: 1px solid ${(props) => (props.isFiltered ? goldenColor : "#6f6f6f")};
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
  color: white;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 20px;
  @media (min-width: 1000px) {
    padding: 10px 100px;
  }
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
  return allCards
    .filter((card) => {
      if (!filters || !filters.side || filters.side === DEFAULT_OPTION) {
        return true;
      }

      return card.side === filters.side;
    })
    .filter((card) => {
      if (!filters || !filters.type || filters.type === DEFAULT_OPTION) {
        return true;
      }

      return card.front.type === filters.type;
    })
    .filter((card) => {
      if (!filters || !filters.sets) {
        return true;
      }

      return filters.sets.includes(card.set);
    })
    .filter((card) => {
      if (!filters || !filters.destiny || filters.destiny === DEFAULT_OPTION) {
        return true;
      }

      return (
        card.front.destiny && card.front.destiny.toString() === filters.destiny
      );
    })
    .filter((card) => {
      if (!filters || !filters.forfeit || filters.forfeit === DEFAULT_OPTION) {
        return true;
      }

      return (
        card.front.forfeit && card.front.forfeit.toString() === filters.forfeit
      );
    })
    .filter((card) => {
      if (!filters || !filters.deploy || filters.deploy === DEFAULT_OPTION) {
        return true;
      }

      return (
        card.front.deploy && card.front.deploy.toString() === filters.deploy
      );
    })
    .filter((card) => {
      if (!filters || !filters.power || filters.power === DEFAULT_OPTION) {
        return true;
      }

      return card.front.power && card.front.power.toString() === filters.power;
    })
    .filter((card) => {
      if (!filters || !filters.titleFilter) {
        return true;
      }
      return card.front.title
        .toLowerCase()
        .includes(filters.titleFilter.toLowerCase());
    });
}

enum DropDownFilters {
  side = "side",
  set = "set",
  type = "type",
  destiny = "destiny",
  power = "power",
  deploy = "deploy",
  forfeit = "forfeit",
}

const DEFAULT_OPTION = "All";

function FilterIcon({
  open,
  Icon,
  name,
  options,
  active,
  onOptionChosen,
  onOpen,
  onClose,
}: {
  open: boolean;
  name: string;
  active?: string | string[];
  Icon: any;
  options?: string[];
  onOpen: () => void;
  onClose: () => void;
  onOptionChosen: (option: string) => void;
}) {
  const isChecked = (option) => {
    if (option === DEFAULT_OPTION && active === undefined) {
      return true;
    }
    return Array.isArray(active) ? active.includes(option) : active === option;
  };
  const isFiltered = !Boolean(
    active === DEFAULT_OPTION || active === undefined
  );
  return (
    <FilterIconContainer isFiltered={isFiltered}>
      <ClickableFilterIcon onClick={() => (!open ? onOpen() : onClose())}>
        <Icon
          style={{
            fontSize: "30px",
            marginRight: "5px",
            borderRadius: "100px",
            border: "1px solid white",
            padding: "5px",
          }}
        ></Icon>
        <div
          style={{
            marginLeft: "3px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
          {isFiltered ? "Filtered" : DEFAULT_OPTION}
        </div>

        <ExpandMoreIcon
          style={{
            marginLeft: "5px",
            fontSize: "16px",
          }}
        />
      </ClickableFilterIcon>
      {open ? (
        <ClickAwayListener onClickAway={() => onClose()}>
          <FilterOptionsContainer>
            {[DEFAULT_OPTION, ...(options || [])].map((option, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                }}
                onClick={() => onOptionChosen(option)}
              >
                <Checkbox
                  style={{ color: "white" }}
                  checked={isChecked(option)}
                />
                <div>{option}</div>
              </div>
            ))}
          </FilterOptionsContainer>
        </ClickAwayListener>
      ) : null}
    </FilterIconContainer>
  );
}
export interface CardFilters {
  titleFilter: string;
  side?: Side | string;
  sets?: string[];
  type?: string;
  destiny?: string;
  power?: string;
  deploy?: string;
  forfeit?: string;
}

export function CardFiltersBar({
  allCards,
  filters,
  showSideFilter = true,
  onUpdateFilters,
}: {
  allCards: Card[];
  showSideFilter?: boolean;
  filters?: CardFilters;
  onUpdateFilters: (cardFilters: CardFilters) => void;
}) {
  const [openDropDown, setOpenDropDown] = useState(undefined);
  const [filterBarOpen, setFilterBarOpen] = useState(false);
  const sets = sortAlphabetically(unique(allCards.map(({ set }) => set)));
  const types = sortAlphabetically(
    unique(allCards.map(({ front: { type } }) => type))
  );
  const destiny = sortAlphabetically(
    unique(
      allCards
        .map(({ front: { destiny } }) => destiny)
        .filter(Boolean)
        .map((destiny) => destiny.toString())
    )
  );
  const powerOptions = sortAlphabetically(
    unique(
      allCards
        .map(({ front: { power } }) => power)
        .filter(Boolean)
        .map((power) => power.toString())
    )
  );
  const deployOptions = sortAlphabetically(
    unique(
      allCards
        .map(({ front: { deploy } }) => deploy)
        .filter(Boolean)
        .map((deploy) => deploy.toString())
    )
  );
  const forfeitOptions = sortAlphabetically(
    unique(
      allCards
        .map(({ front: { forfeit } }) => forfeit)
        .filter(Boolean)
        .map((forfeit) => forfeit.toString())
    )
  );
  const optionChosen = (newOption: string) => {
    console.log("Clicked Option", newOption);
    if (newOption === DEFAULT_OPTION) {
      onUpdateFilters({
        ...filters,
        sets: undefined,
      });
      return;
    }
    const sets = filters.sets || [];
    let newSets;
    if (sets.includes(newOption)) {
      // remove the option
      const indexOfOption = sets.indexOf(newOption);
      newSets = [
        ...sets.slice(0, indexOfOption),
        undefined,
        ...sets.slice(indexOfOption + 1),
      ];
    } else {
      newSets = [...sets, newOption];
    }

    onUpdateFilters({
      ...filters,
      sets: newSets.length === 0 ? undefined : newSets,
    });
  };
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

      <div style={{ display: "flex", flexGrow: 1 }}></div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          cursor: "pointer",
          color: "white",
          width: "50%",
        }}
        onClick={() => setFilterBarOpen(!filterBarOpen)}
      >
        <FilterListIcon></FilterListIcon>
        <div>Filters</div>
      </div>

      {filterBarOpen ? (
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            justifyContent: "space-between",
          }}
        >
          {showSideFilter ? (
            <FilterIcon
              Icon={RecentActorsIcon}
              name={"Side:"}
              options={[Side.dark, Side.light]}
              active={(filters && filters.side) || DEFAULT_OPTION}
              open={openDropDown === DropDownFilters.side}
              onOpen={() => setOpenDropDown(DropDownFilters.side)}
              onClose={() => setOpenDropDown(undefined)}
              onOptionChosen={(option) =>
                onUpdateFilters({ ...filters, side: option })
              }
            />
          ) : null}

          <FilterIcon
            Icon={MenuBookIcon}
            name={"Set:"}
            options={sets}
            active={filters && filters.sets}
            open={openDropDown === DropDownFilters.set}
            onOpen={() => setOpenDropDown(DropDownFilters.set)}
            onClose={() => setOpenDropDown(undefined)}
            onOptionChosen={optionChosen}
          />
          <FilterIcon
            Icon={SupervisorAccountIcon}
            name={"Type:"}
            options={types}
            active={(filters && filters.type) || DEFAULT_OPTION}
            open={openDropDown === DropDownFilters.type}
            onOpen={() => setOpenDropDown(DropDownFilters.type)}
            onClose={() => setOpenDropDown(undefined)}
            onOptionChosen={(option) => {
              onUpdateFilters({ ...filters, type: option });
            }}
          />
          <FilterIcon
            Icon={BlurOnIcon}
            name={"Destiny:"}
            active={(filters && filters.destiny) || DEFAULT_OPTION}
            options={destiny}
            open={openDropDown === DropDownFilters.destiny}
            onOpen={() => setOpenDropDown(DropDownFilters.destiny)}
            onClose={() => setOpenDropDown(undefined)}
            onOptionChosen={(option) => {
              onUpdateFilters({ ...filters, destiny: option });
            }}
          />
          <FilterIcon
            Icon={GavelIcon}
            name={"Power:"}
            active={(filters && filters.power) || DEFAULT_OPTION}
            options={powerOptions}
            open={openDropDown === DropDownFilters.power}
            onOpen={() => setOpenDropDown(DropDownFilters.power)}
            onClose={() => setOpenDropDown(undefined)}
            onOptionChosen={(option) => {
              onUpdateFilters({ ...filters, power: option });
            }}
          />
          <FilterIcon
            Icon={ArrowUpwardIcon}
            name={"Deploy:"}
            active={(filters && filters.deploy) || DEFAULT_OPTION}
            options={deployOptions}
            open={openDropDown === DropDownFilters.deploy}
            onOpen={() => setOpenDropDown(DropDownFilters.deploy)}
            onClose={() => setOpenDropDown(undefined)}
            onOptionChosen={(option) => {
              onUpdateFilters({ ...filters, deploy: option });
            }}
          />
          <FilterIcon
            Icon={FlagIcon}
            name={"Forfeit:"}
            active={(filters && filters.forfeit) || DEFAULT_OPTION}
            options={forfeitOptions}
            open={openDropDown === DropDownFilters.forfeit}
            onOpen={() => setOpenDropDown(DropDownFilters.forfeit)}
            onClose={() => setOpenDropDown(undefined)}
            onOptionChosen={(option) => {
              onUpdateFilters({ ...filters, forfeit: option });
            }}
          />
        </div>
      ) : null}
    </CardFilterBarContainer>
  );
}
