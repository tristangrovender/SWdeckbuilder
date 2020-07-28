import { Card } from "./card.interface";
import { memoize } from "../../utils/utils";
import { client } from "../apollo-client";
import { gql } from "@apollo/client";
import GetCardsQuery from "../../graphql/get-cards.gql";
import {
  GetCardsQuery as GetCardsQueryI,
  Card as CardFromServer,
} from "../../graphql/types";

function fetchCardsFromServer(): Promise<CardFromServer[]> {
  return client
    .query<GetCardsQueryI>({
      query: gql(GetCardsQuery + " "),
    })
    .then(({ data }) => {
      return data.cards;
    });
}

export const getCards = memoize(() => fetchCardsFromServer());
