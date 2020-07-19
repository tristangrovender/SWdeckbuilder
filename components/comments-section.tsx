import { Button } from "@material-ui/core";
import Moment from "react-moment";
import moment from "moment";

function Comment({
  author,
  text,
  profilePhoto,
  createdAt
}: {
  author: string;
  text: string;
  profilePhoto: string;
  createdAt: Date;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={profilePhoto}
        style={{ width: "40px", height: "40px", borderRadius: "5px" }}
      ></img>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10px",
          fontSize: "16px"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: "16px" }}>{author}</div>
          <div
            style={{
              marginLeft: "10px",
              color: "rgba(0,0,0,0.5)",
              fontSize: "12px"
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

export function CommentsSection() {
  const comments = [
    {
      author: "Dan Rasmuson",
      text: "Fantastic!",
      createdAt: new Date(),
      profilePhoto: "/images/Tristan.jpg"
    },
    {
      author: "Tristan Grovender",
      text: "Really effective!",
      createdAt: new Date(),
      profilePhoto: "/images/Hank.jpg"
    }
  ];
  return (
    <div>
      <div
        style={{
          borderBottom: "1px solid lightgrey",
          fontWeight: "bold",
          paddingTop: "20px",
          marginBottom: "10px",
          width: "97%"
        }}
      >
        Comments
      </div>
      {comments.map(({ author, text, createdAt, profilePhoto }) => (
        <Comment
          author={author}
          text={text}
          createdAt={createdAt}
          profilePhoto={profilePhoto}
        ></Comment>
      ))}
      <textarea
        style={{
          borderRadius: "5px",
          height: "100px",
          width: "50%",
          resize: "vertical",
          marginBottom: "5px"
        }}
      ></textarea>
      <Button
        variant="outlined"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "black"
        }}
      >
        <div>Add Reply</div>
      </Button>
    </div>
  );
}
