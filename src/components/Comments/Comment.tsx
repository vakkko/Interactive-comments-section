import "./comment.css";

interface CommentProps {
  content: string;
}

export default function Comments({ content }: CommentProps) {
  return (
    <>
      <p className="comment">{content}</p>
    </>
  );
}
