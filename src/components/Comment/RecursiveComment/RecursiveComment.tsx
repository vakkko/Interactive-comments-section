import { Commentor } from "../../../App.modal";
import Comment from "../Comment";
import "./recursiveComment.css";
import { Dispatch, SetStateAction } from "react";

interface RecursiveCommentProps {
  userData: Commentor;
  OnDelete: (index: number) => void;
  replyContent: string;
  setReplyContent: Dispatch<SetStateAction<string>>;
  handleUpdateReply: (i: number) => void;
}

export default function RecursiveComment({
  userData,
  OnDelete,
  replyContent,
  setReplyContent,
  handleUpdateReply,
}: RecursiveCommentProps) {
  return (
    <>
      {userData?.comments.map((comment) => (
        <div className={"comment-card"} key={comment.id}>
          <Comment
            userName={comment.user.username}
            picture={comment.user.image.webp}
            created={comment.createdAt}
            content={comment.content}
            score={comment.score}
            onDelete={() => OnDelete(comment.id)}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
            handleUpdateReply={() => handleUpdateReply(comment.id)}
          />
          <div className="replies-section">
            {comment.replies && (
              <RecursiveComment
                userData={{
                  currentUser: userData.currentUser,
                  comments: comment.replies,
                }}
                OnDelete={OnDelete}
                replyContent={replyContent}
                setReplyContent={setReplyContent}
                handleUpdateReply={() => handleUpdateReply(comment.id)}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}
