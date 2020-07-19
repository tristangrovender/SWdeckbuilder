import { Card } from "./card.interface";
import { memoize } from "../../utils/utils";

function sortCardsByName(a: Card, b: Card) {
  if (a.front.title < b.front.title) {
    return -1;
  }
  if (a.front.title > b.front.title) {
    return 1;
  }
  return 0;
}

function removeLegacyCards({ legacy }: Card) {
  return legacy === false;
}

async function loadCards() {
  const cards = (await import("../../cards/cards.json")).default as Card[];
  return cards.sort(sortCardsByName).filter(removeLegacyCards);
}

let gempData;

async function loadGempCardMapping() {
  const gempMapping = (await import("../../cards/GempCardMapping.json"))
    .default;
  const fileNameToGempIdMapping = Object.entries(gempMapping).reduce(
    (all, [key, value]) => {
      const pathParts = value.split("/");
      const fileName = pathParts[pathParts.length - 1];
      all[fileName] = {
        gempId: key,
        gempFilePath: value,
      };
      return all;
    },
    {}
  );
  gempData = fileNameToGempIdMapping;
  return (imageUrl: string, set: string) => {
    const pathParts = imageUrl.split("/");
    const fileName = pathParts[pathParts.length - 1].split("?")[0];
    if (fileName === "aaylasecurah.gif") {
      return {
        gempId: "200_1",
        gempFilePath: "/gemp-swccg/images/cards/Virtual0-Light/aaylasecura.gif",
      };
    }
    if (fileName === "coruscantprivateplatformdockingbay.gif") {
      return {
        gempId: "211_18",
        gempFilePath:
          "/gemp-swccg/images/cards/Virtual11-Dark/coruscantprivateplatform.gif",
      };
    }
    if (fileName === "dontdothatagaintatooine.gif") {
      return {
        gempId: 11_17,
        gempFilePath:
          "/gemp-swccg/images/cards/Tatooine-Light/dontdothatagain.gif",
      };
    }
    if (fileName === "emperorpalpatineforeseer.gif") {
      return {
        gempId: "205_12",
        gempFilePath:
          "/gemp-swccg/images/cards/Virtual5-Dark/emperorpalpatineforseer.gif",
      };
    }
    if (fileName === "endorrcommandoteam.gif") {
      return {
        gempId: "203_5",
        gempFilePath:
          "/gemp-swccg/images/cards/Virtual3-Light/endorcommandoteam.gif",
      };
    }
    if (fileName === "fanfaretatooine.gif") {
      return {
        gempId: "11_69",
        gempFilePath: "/gemp-swccg/images/cards/Tatooine-Dark/fanfare.gif",
      };
    }
    if (fileName === "generalgrievoush.gif") {
      return {
        gempId: "203_27",
        gempFilePath:
          "/gemp-swccg/images/cards/Virtual3-Dark/generalgrievous.gif",
      };
    }
    if (fileName === "r3pOarthreepio.gif" && set === "Hoth") {
      return {
        gempId: "3_14",
        gempFilePath: "/gemp-swccg/images/cards/Hoth-Light/r3poarthreepio.gif",
      };
    }
    if (fileName === "slavei.gif") {
      return {
        gempId: "5_177",
        gempFilePath: "/gemp-swccg/images/cards/CloudCity-Dark/slaveI.gif",
      };
    }
    if (fileName === "xizorsbounty.gif") {
      return {
        gempId: "206_12",
        gempFilePath: "/gemp-swccg/images/cards/Virtual6-Dark/xixorsbounty.gif",
      };
    }
    if (fileName === "youcannothideforeverv.gif") {
      return {
        gempId: "200_100",
        gempFilePath:
          "/gemp-swccg/images/cards/Virtual0-Dark/youcannothideforever.gif",
      };
    }
    if (fileName === "yourinsightservesyouwellv.gif") {
      return {
        gempId: "200_32",
        gempFilePath:
          "/gemp-swccg/images/cards/Virtual0-Light/yourinsightservesyouwell.gif",
      };
    }
    if (fileName === "") {
      return {
        gempId: "",
        gempFilePath: "",
      };
    }
    return fileNameToGempIdMapping[fileName];
  };
}

const loadCardsOnce = memoize(loadCards);

export async function getCards() {
  return loadCardsOnce();
}

export function testGempCardMapping(allCards: Card[]) {
  loadGempCardMapping().then((getGempIdFromImageUrl) => {
    let count = 0;
    const results = allCards.map((card) => {
      const matchingResult = getGempIdFromImageUrl(
        card.front.imageUrl,
        card.set
      );
      if (!matchingResult) {
        count += 1;
        const pathParts = card.front.imageUrl.split("/");
        console.log(pathParts[pathParts.length - 1].split("?")[0], card.set);
      }
      return { gemp: matchingResult, card };
    });
    if (count > 0) {
      console.log("missed ", count, "files");
    } else {
      console.log("no logs above here then output to file");
    }

    const ids = results
      .map((data) => data && data.gemp && data.gemp.gempId)
      .filter(Boolean);

    console.log(ids.length, results.length);
    console.log(
      "not unqiue, unqiue",
      ids.length,
      Array.from(new Set(ids)).length
    );
  });
}
