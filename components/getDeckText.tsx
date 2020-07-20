import { Card, Type } from "./card-search-table/card.interface";
export function getDeckText(deck: Card[]): string {
  const getTitle = (card: Card) => card.front.title;
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
    return deck.filter((card) => card.front.type === type).map(getTitle);
  });
  const jediTestTitles = deck
    .filter((card) => card.front.type.includes("Jedi Test"))
    .map(getTitle);
  const sideDeckTitles = deck
    .filter(
      (card) =>
        card.front.type === "Defensive Shield" || card.front.type === "Game Aid"
    )
    .map(getTitle);

  return `Objectives: (${objectiveTitles.length})\n${objectiveTitles.join(
    "\n"
  )}\n
Locations: (${locationTitles.length})\n${locationTitles.join("\n")}\n
Characters: (${characterTitles.length})\n${characterTitles.join("\n")}\n
Creatures: (${creatureTitles.length})\n${creatureTitles.join("\n")}\n
Weapons: (${weaponTitles.length})\n${weaponTitles.join("\n")}\n
Devices: (${deviceTitles.length})\n${deviceTitles.join("\n")}\n
Starships: (${starshipTitles.length})\n${starshipTitles.join("\n")}\n
Vehicles: (${vehicleTitles.length})\n${vehicleTitles.join("\n")}\n
Effects: (${effectTitles.length})\n${effectTitles.join("\n")}\n
Interrupts: (${interruptTitles.length})\n${interruptTitles.join("\n")}\n
Epic Events: (${epicEventTitles.length})\n${epicEventTitles.join("\n")}\n
Jedi Tests: (${jediTestTitles.length})\n${jediTestTitles.join("\n")}\n
Admiral's orders: (${admiralsOrdersTitles.length})\n${admiralsOrdersTitles.join(
    "\n"
  )}\n
Podracers: (${podracerTitles.length})\n${podracerTitles.join("\n")}\n
Side Deck: (${sideDeckTitles.length})\n${sideDeckTitles.join("\n")}\n`;
}
