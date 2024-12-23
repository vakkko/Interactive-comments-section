import Score from "./Score/Score";
import Author from "./Author/Author";
import CommentContent from "./CommentContent/CommentContent";
import "./comment.css";
import { CommentProps } from "../../App.modal";
import { useRef, useState } from "react";
import ReplyComment from "./ReplyComment/ReplyComment";

export default function Comment({ commentProps }: CommentProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>(commentProps.content);
  const [editClicked, setEditClicked] = useState<boolean>(false);
  const [toDoReply, setToDoReply] = useState<boolean>(false);
  const handleEditClick = () => {
    if (inputRef.current && !editClicked) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
      setEditClicked(true);
    }
  };

  const handleSaveClick = () => {
    if (inputRef.current) {
      inputRef.current.blur();
      setEditClicked(false);
    }
  };

  const handleContentChange = (newContent: string) => {
    setText(newContent);
  };

  const handleUpdateReply = (index: number) => {
    if (!commentProps.replyContent.trim()) {
      alert("Reply cannot be empty!");
      return;
    }

    const newReply = {
      content: commentProps.replyContent,
      createdAt: "",
      id: Date.now(),
      replyingTo: "",
      score: 0,
      user: {
        image: {
          webp: commentProps.userData.currentUser.image.webp,
          png: commentProps.userData.currentUser.image.png,
        },
        username: "juliusomo",
      },
      replies: [],
    };

    const updatedComments = [...commentProps.userData.comments];

    if (updatedComments[index - 1].replies === undefined) {
      updatedComments.map((comment) => {
        comment.replies.map((replyComment) => {
          if (replyComment.id === index) {
            return comment.replies.push(newReply);
          }
        });
      });
    } else {
      updatedComments[index - 1].replies.push(newReply);
    }

    commentProps.setUserData({
      ...commentProps.userData,
      comments: updatedComments,
    });
    commentProps.setReplyContent("");
    setToDoReply(false);
  };

  return (
    <>
      <div className={"user-comment"}>
        <div>
          <Score score={commentProps.score} />
        </div>
        <div className="author-comment">
          <Author
            handleEditClick={handleEditClick}
            created={commentProps.created}
            picture={commentProps.picture}
            userName={commentProps.userName}
            onDelete={commentProps.onDelete}
            editClicked={editClicked}
            setToDoReply={setToDoReply}
          />
          <CommentContent
            ref={inputRef}
            onChange={handleContentChange}
            content={text}
            editClicked={editClicked}
            handleSaveClick={handleSaveClick}
          />
        </div>
      </div>
      {toDoReply && (
        <ReplyComment
          replyContent={commentProps.replyContent}
          setReplyContent={commentProps.setReplyContent}
          setToDoReply={setToDoReply}
          handleUpdateReply={() => handleUpdateReply(commentProps.index)}
        />
      )}
    </>
  );
}
