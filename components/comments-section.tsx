import { Button } from "@material-ui/core";

function Comment({
  author,
  text,
  profilePhoto,
  createdAt,
}: {
  author: string;
  text: string;
  profilePhoto: string;
  createdAt: Date;
}) {
  return (
    <div style={{ display: "flex" }}>
      <img src={profilePhoto} style={{ width: "30px" }}></img>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          <div style={{ textDecoration: "bold" }}> {author}</div>
          <div style={{ color: "grey" }}>{createdAt.toString()}</div>
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
      profilePhoto: "/images/dark.png",
    },
    {
      author: "Tristan Grovender",
      text: "Really effective!",
      createdAt: new Date(),
      profilePhoto: "/images/dark.png",
    },
  ];
  return (
    <div>
      <div style={{ borderBottom: "1px solid lightgrey" }}>Comments</div>
      {comments.map(({ author, text, createdAt, profilePhoto }) => (
        <Comment
          author={author}
          text={text}
          createdAt={createdAt}
          profilePhoto={profilePhoto}
        ></Comment>
      ))}
      <textarea></textarea>
      <Button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>Add Reply</div>
      </Button>
    </div>
  );
}
