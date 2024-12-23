import { forwardRef } from "react";
import "./commentContent.css";

interface CommentProps {
  content: string;
  onChange: (newContent: string) => void;
  editClicked: boolean;
  handleSaveClick: () => void;
}

const CommentContent = forwardRef<HTMLTextAreaElement, CommentProps>(
  ({ content, onChange, editClicked, handleSaveClick }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    };
    return (
      <div className="comment-wrapper">
        <textarea
          ref={ref}
          className="comment"
          rows={5}
          cols={80}
          value={content}
          onChange={handleChange}
          disabled={!editClicked}
        />
        {editClicked && (
          <button onClick={handleSaveClick} className="btn-update">
            UPDATE
          </button>
        )}
      </div>
    );
  }
);

export default CommentContent;
