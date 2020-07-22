import styled from "styled-components";
import { useRouter } from "next/router";
import { StarsComponent } from "./StarsComponent";
import moment from "moment";

const Tile = styled.div`
  cursor: pointer;
  background-color: white;
  color: white;
  width: 450px;
  height: 175px;
  margin-bottom: 40px;
`;

const TileBannerImage = styled.img`
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #1d7a99;
`;

const TileBannerContainer = styled.div`
  display: flex;
`;

const TileBanner = styled.div`
  height: 50px;
  background-color: #1d7a99;
  font-size: 16px;
  padding: 5px;
  width: 100%;
`;

const TileAuthor = styled.div`
  font-size: 10px;
`;

const TileDescription = styled.div`
  color: black;
  font-size: 14px;
  padding-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
`;

const TileRatingContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

export const RatingText = styled.div`
  font-size: 10px;
  margin-left: 10px;
  color: black;
`;

const TileDeckCardTypes = styled.div`
  color: black;
  font-size: 12px;
  padding-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
  width: 90%;
`;

export function DeckTile({
  img,
  title,
  author,
  createdAt,
  description,
  cardBreakdown,
  rating,
}: {
  img: string;
  title: string;
  author: string;
  createdAt: string;
  description: string;
  rating: number;
  cardBreakdown: {
    objectives: number;
    locations: number;
    characters: number;
    creatures: number;
    weapons: number;
    devices: number;
    starships: number;
    vehicles: number;
    effects: number;
    interrupts: number;
    epicEvents: number;
    jediTests: number;
    admiralsOrders: number;
    podracers: number;
  };
}) {
  const router = useRouter();
  return (
    <Tile onClick={() => router.push("/deck/111")}>
      <TileBannerContainer>
        <TileBannerImage src={img} />
        <TileBanner>
          {title}
          <TileAuthor>
            by {author} · updated {moment(createdAt).from(moment(new Date()))}
          </TileAuthor>
        </TileBanner>
      </TileBannerContainer>
      <TileDescription>Description: {description}</TileDescription>
      <TileDeckCardTypes>
        {cardBreakdown.objectives} Objectives • {cardBreakdown.locations}{" "}
        Locations • {cardBreakdown.characters} Characters •{" "}
        {cardBreakdown.creatures} Creatures • {cardBreakdown.weapons} Weapons •{" "}
        {cardBreakdown.devices} Devices • {cardBreakdown.starships} Starhips •{" "}
        {cardBreakdown.vehicles} Vehicles • {cardBreakdown.effects} Effects •{" "}
        {cardBreakdown.interrupts} Interrupts • {cardBreakdown.epicEvents}{" "}
        EpicEvents • {cardBreakdown.jediTests} Jedi Tests •{" "}
        {cardBreakdown.admiralsOrders} Admiral's Orders •{" "}
        {cardBreakdown.podracers} Podracers
      </TileDeckCardTypes>
      <TileRatingContainer>
        <StarsComponent rating={rating}></StarsComponent>
      </TileRatingContainer>
    </Tile>
  );
}
