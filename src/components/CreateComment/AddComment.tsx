import "./addComment.css";

interface CreateCommentProps {
  commentor: string | undefined;
  commentorPic: string | undefined;
}

export default function CreateComment({
  commentor,
  commentorPic,
}: CreateCommentProps) {
  return (
    <div className="create-comment">
      <img src={commentorPic} alt={`${commentor}`} />
      <input type="text" placeholder="Add a comment" />
      <button className="btn-send">SEND</button>
    </div>
  );
}
