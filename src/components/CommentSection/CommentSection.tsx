import Score from "../Score/Score";
import Author from "../Author/Author";
import Comment from "../Comment/Comment";
import "./commentSection.css";
import { CommentSectionProps } from "../../App.modal";
import { useRef, useState } from "react";

export default function CommentSection({
  userName,
  picture,
  created,
  content,
  score,
  onDelete,
}: CommentSectionProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>(content);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleEditClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
      setIsClicked(true);
    }
  };

  const handleSaveClick = () => {
    if (inputRef.current) {
      inputRef.current.blur();

      setIsClicked(false);
    }
  };

  const handleContentChange = (newContent: string) => {
    setText(newContent);
  };

  return (
    <div className={`${userName}-comment`}>
      <div>
        <Score score={score} />
      </div>
      <div className="author-comment">
        <Author
          handleEditClick={handleEditClick}
          handleSaveClick={handleSaveClick}
          created={created}
          picture={picture}
          userName={userName}
          onDelete={onDelete}
          isClicked={isClicked}
        />
        <Comment ref={inputRef} onChange={handleContentChange} content={text} />
      </div>
    </div>
  );
}
