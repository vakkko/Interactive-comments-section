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
            userData={userData}
            setUserData={setUserData}
            index={comment.id}
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
                setUserData={setUserData}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}

// რეკურსიულ კომპონენტს ვაწვდით userData, მას ასევე უნდა მოვაწოდოთ setUserData, რომ შემდეგ ორივე პროპსი ჩავაწოდოთ კომენტ
//  კომპონენტს, რომ კომენტ კომპონენტშივე დავწეროთ handleUpdatereply ფუნქცია რათა მოვუთითოთ რომ კომენტარის შემდეგ განქრეს ReplyComponent setToClick ფუნქციის გამოძახებით.
