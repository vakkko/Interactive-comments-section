import Comment from "../Comment";
import "./recursiveComment.css";
import { RecursiveCommentProps } from "../../../App.modal";
export default function RecursiveComment({
  userData,
  OnDelete,
  replyContent,
  setReplyContent,
  setUserData,
}: RecursiveCommentProps) {
  return (
    <>
      {userData?.comments.map((comment) => {
        const commentProps = {
          userName: comment.user.username,
          picture: comment.user.image.webp,
          created: comment.createdAt,
          content: comment.content,
          score: comment.score,
          onDelete: () => OnDelete(comment.id),
          replyContent: replyContent,
          setReplyContent: setReplyContent,
          userData: userData,
          setUserData: setUserData,
          index: comment.id,
        };

        return (
          <div className={"comment-card"} key={comment.id}>
            <Comment commentProps={commentProps} />
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
                  setUserData={setUserData}
                />
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
