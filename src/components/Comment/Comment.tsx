import Score from "./Score/Score";
import Author from "./Author/Author";
import CommentContent from "./CommentContent/CommentContent";

import "./comment.css";
import { CommentProps } from "../../App.modal";
import { useRef, useState } from "react";

export default function CommentSection({
  userName,
  picture,
  created,
  content,
  score,
  onDelete,
  onReply,
  replyClicked,
  setReplyClicked,
}: CommentProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>(content);
  const [editClicked, setEditClicked] = useState<boolean>(false);

  const handleEditClick = () => {
    if (inputRef.current) {
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
    <div className={`${userName}-comment`}>
      <div>
        <Score score={score} replyClicked={replyClicked} />
      </div>
      <div className="author-comment">
        <Author
          handleEditClick={handleEditClick}
          handleSaveClick={handleSaveClick}
          created={created}
          picture={picture}
          userName={userName}
          onDelete={onDelete}
          editClicked={editClicked}
          onReply={onReply}
          setReplyClicked={setReplyClicked}
        />
        <CommentContent
          ref={inputRef}
          onChange={handleContentChange}
          content={text}
        />
      </div>
    </div>
  );
}
