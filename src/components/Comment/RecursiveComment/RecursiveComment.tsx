import { Commentor } from "../../../App.modal";
import Comment from "../Comment";
import "./recursiveComment.css";

interface RecursiveCommentProps {
  data: Commentor;
  OnDelete: (index: number) => void;
  handleReply: (index: number, userName: string) => void;
}

export default function RecursiveComment({
  data,
  OnDelete,
  handleReply,
}: RecursiveCommentProps) {
  return (
    <>
      {data?.comments.map((comment) => (
        <div className={"comment-card"} key={comment.id}>
          <Comment
            userName={comment.user.username}
            picture={comment.user.image.webp}
            created={comment.createdAt}
            content={comment.content}
            score={comment.score}
            onDelete={() => OnDelete(comment.id)}
            onReply={() => handleReply(comment.id, comment.user.username)}
          />
          <div className="replies-section">
            {comment.replies && (
              <RecursiveComment
                data={{
                  currentUser: data.currentUser,
                  comments: comment.replies,
                }}
                OnDelete={OnDelete}
                handleReply={handleReply}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}
