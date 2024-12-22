import "../../AddComment/addComment.css";
import { ReplyCommentProps } from "../../../App.modal";

export default function ReplyComment({
  setToDoReply,
  replyContent,
  setReplyContent,
  handleUpdateReply,
}: ReplyCommentProps) {
  const handleReplyContent = (event: React.FormEvent<HTMLDivElement>) => {
    const textContent = event.currentTarget.textContent || "";

    setReplyContent(textContent);
  };

  return (
    <div className="create-comment">
      <img src="./images/avatars/image-juliusomo.webp" alt="juliusomo" />
      <div
        className="comment-content"
        onInput={handleReplyContent}
        contentEditable
        suppressContentEditableWarning={true}
      ></div>
      <div className="reply-buttons">
        <button onClick={handleUpdateReply} className="btn-send">
          UPDATE
        </button>
        <button onClick={() => setToDoReply(false)} className="btn-deny">
          CANCEL
        </button>
      </div>
    </div>
  );
}
