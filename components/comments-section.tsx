import { Button } from "@material-ui/core";

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
    <div>
      {text}
      {author}
      {createdAt.toString()}
    </div>
  );
}

export function CommentsSection() {
  const comments = [
    { author: "Dan Rasmuson", text: "Fantastic!", createdAt: new Date() },
    {
      author: "Tristan Grovender",
      text: "Really effective!",
      createdAt: new Date(),
    },
  ];
  return (
    <div>
      <div style={{ borderBottom: "1px solid lightgrey" }}>Comments</div>
      {comments.map(({ author, text, createdAt }) => (
        <Comment author={author} text={text} createdAt={createdAt}></Comment>
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
