import Score from "./Score/Score";
import Author from "./Author/Author";
import CommentContent from "./CommentContent/CommentContent";
import "./comment.css";
import { CommentProps } from "../../App.modal";
import { useRef, useState } from "react";
import ReplyComment from "./ReplyComment/ReplyComment";

export default function Comment({
  userName,
  picture,
  created,
  content,
  score,
  onDelete,
  replyContent,
  setReplyContent,
  handleUpdateReply,
}: CommentProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>(content);
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

  return (
    <>
      <div className={"user-comment"}>
        <div>
          <Score score={score} />
        </div>
        <div className="author-comment">
          <Author
            handleEditClick={handleEditClick}
            created={created}
            picture={picture}
            userName={userName}
            onDelete={onDelete}
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
          replyContent={replyContent}
          setReplyContent={setReplyContent}
          setToDoReply={setToDoReply}
          handleUpdateReply={handleUpdateReply}
        />
      )}
    </>
  );
}
