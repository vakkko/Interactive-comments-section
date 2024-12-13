import { SyntheticEvent } from "react";
import "./addComment.css";

interface CreateCommentProps {
  userName: string | undefined;
  picture: string | undefined;
  onNewComment: (e: SyntheticEvent) => void;
}

export default function AddComment({
  userName,
  picture,
  onNewComment,
}: CreateCommentProps) {
  return (
    <form method="post" className="create-comment" onSubmit={onNewComment}>
      <img src={picture} alt={userName} />
      <textarea rows={1} cols={60} placeholder="Add a comment" name="comment" />
      <button type="submit" className="btn-send">
        SEND
      </button>
    </form>
  );
}
