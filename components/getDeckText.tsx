import { Type } from "./card-search-table/card.interface";
import { DeckCard } from "../graphql/types";
export function getDeckText(deck: DeckCard[]): string {
  const getTitle = (deckCard: DeckCard) => deckCard.card.title;
  const [
    characterTitles,
    objectiveTitles,
    locationTitles,
    creatureTitles,
    weaponTitles,
    deviceTitles,
    starshipTitles,
    vehicleTitles,
    effectTitles,
    interruptTitles,
    epicEventTitles,
    podracerTitles,
    admiralsOrdersTitles,
  ] = [
    Type.Character,
    Type.Objective,
    Type.Location,
    Type.Creature,
    Type.Weapon,
    Type.Device,
    Type.Starship,
    Type.Vehicle,
    Type.Effect,
    Type.Interrupt,
    Type.EpicEvent,
    Type.Podracer,
    Type.AdmiralsOrder,
  ].map((type) => {
    return deck.filter((deckCard) => deckCard.card.type === type).map(getTitle);
  });
  const jediTestTitles = deck
    .filter((deckCard) => deckCard.card.type.includes("Jedi Test"))
    .map(getTitle);
  const sideDeckTitles = deck
    .filter(
      (deckCard) =>
        deckCard.card.type === "Defensive Shield" ||
        deckCard.card.type === "Game Aid"
    )
    .map(getTitle);

  return [
    { name: `Objectives`, items: objectiveTitles },
    { name: `Locations`, items: locationTitles },
    { name: `Characters`, items: characterTitles },
    { name: `Creatures`, items: creatureTitles },
    { name: `Weapons`, items: weaponTitles },
    { name: `Devices`, items: deviceTitles },
    { name: `Starships`, items: starshipTitles },
    { name: `Vehicles`, items: vehicleTitles },
    { name: `Effects`, items: effectTitles },
    { name: `Interrupts`, items: interruptTitles },
    { name: `Epic Events`, items: epicEventTitles },
    { name: `Jedi Tests`, items: jediTestTitles },
    { name: `Admiral's Orders`, items: admiralsOrdersTitles },
    { name: `Podracers`, items: podracerTitles },
    { name: `Side Deck`, items: sideDeckTitles },
  ]
    .filter(({ items }) => items.length > 0)
    .map(({ name, items }) => `${name}: (${items.length})\n${items.join("\n")}`)
    .join("\n\n");
}
