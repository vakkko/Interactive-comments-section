import { forwardRef } from "react";
import "./commentContent.css";

interface CommentProps {
  content: string;
  onChange: (newContent: string) => void;
}

const Comments = forwardRef<HTMLTextAreaElement, CommentProps>(
  ({ content, onChange }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    };

    return (
      <textarea
        ref={ref}
        className="comment"
        rows={5}
        cols={80}
        defaultValue={content}
        onChange={handleChange}
      />
    );
  }
);

export default Comments;
