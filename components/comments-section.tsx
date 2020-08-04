import { useState } from "react";
import { Button } from "@material-ui/core";
import moment from "moment";
import CreateComment from "raw-loader!../graphql/create-comment.gql";
import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
} from "../graphql/types";
import { gql, useMutation } from "@apollo/client";

function Comment({
  author,
  text,
  createdAt,
}: {
  author: string;
  text: string;
  createdAt: Date;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10px",
          fontSize: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: "16px" }}>{author}</div>
          <div
            style={{
              marginLeft: "10px",
              color: "rgba(0,0,0,0.5)",
              fontSize: "12px",
            }}
          >
            {moment(new Date()).from(moment(createdAt))}
          </div>
        </div>

        <div>{text}</div>
      </div>
    </div>
  );
}

type CommentI = {
  id: string;
  createdAt: string;
  comment: string;
  author: {
    id: string;
    username: string;
  };
};

export function CommentsSection({
  comments,
  deckId,
  cardId,
}: {
  comments: CommentI[];
  deckId?: string;
  cardId?: string;
}) {
  const [textAreaRef, setTextAreaRef]: [
    HTMLTextAreaElement,
    (ref: HTMLTextAreaElement) => void
  ] = useState(undefined);
  const [createComment] = useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(gql(CreateComment));

  return (
    <div>
      <div
        style={{
          borderBottom: "1px solid lightgrey",
          fontWeight: "bold",
          paddingTop: "20px",
          marginBottom: "10px",
          width: "97%",
        }}
      >
        Comments
      </div>
      {comments.map(({ author, comment, createdAt }, i) => (
        <Comment
          key={i}
          author={author.username}
          text={comment}
          createdAt={new Date(createdAt)}
        ></Comment>
      ))}
      <textarea
        style={{
          borderRadius: "5px",
          height: "100px",
          width: "50%",
          resize: "vertical",
          marginBottom: "5px",
        }}
        ref={(ref) => setTextAreaRef(ref)}
      ></textarea>
      <Button
        variant="outlined"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          marginBottom: "10px",
        }}
        onClick={() => {
          createComment({
            variables: {
              comment: textAreaRef.value,
              ...(deckId ? { deckId } : { cardId }),
            },
          });
          textAreaRef.value = "";
        }}
      >
        <div>Add Reply</div>
      </Button>
    </div>
  );
}
