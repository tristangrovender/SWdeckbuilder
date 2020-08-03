import { useState } from "react";
import { Page, Toolbar, Content } from "../../components/Toolbar";
import { useRouter } from "next/router";
import { getCards } from "../../components/card-search-table/getCards";
import { CommentsSection } from "../../components/comments-section";
import Footer from "../../components/Footer";
import { Card, GetCardQuery, GetCardQueryVariables } from "../../graphql/types";
import { useQuery, gql } from "@apollo/client";
import GetCard from "raw-loader!../../graphql/get-card.gql";
import { LinearProgress } from "@material-ui/core";

export default function CardPage(params) {
  const router = useRouter();
  const { data, loading } = useQuery<GetCardQuery, GetCardQueryVariables>(
    gql(GetCard),
    {
      variables: {
        id: router.query.id as string,
      },
    }
  );
  if (loading) {
    return (
      <Page>
        <Toolbar />
        <LinearProgress />
      </Page>
    );
  }
  const card = data.card;
  return (
    <Page>
      <Toolbar />
      <Content>
        <h2>{card.title}</h2>
        <div style={{ display: "flex" }}>
          <div>
            <div style={{ marginBottom: "30px" }}>
              {card.side}: {card.type} - {card.subType}
            </div>
            <div style={{ fontStyle: "italic" }}>{card.gametext}</div>
            <CommentsSection
              comments={card.comments}
              cardId={router.query.id as string}
            ></CommentsSection>
          </div>
          <img src={card.imageUrl} style={{ height: "500px" }}></img>
        </div>
      </Content>
      <Footer></Footer>
    </Page>
  );
}
