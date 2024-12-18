import React from "react";
import "./deleteComment.css";

interface DeleteCommentProps {
  onConfirm: (index: number, replyId?: number) => void;
  selectedComment: {
    index: number;
    replyId?: number;
  };
  onCancel: () => void;
}

export default function DeleteComment({
  onConfirm,
  selectedComment,
  onCancel,
}: DeleteCommentProps) {
  return (
    <div className="overlay">
      <div className="delete-container">
        <h2>Delete comment</h2>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone.
        </p>
        <div className="delete-options">
          <button onClick={onCancel} className="btn-cancel">
            NO, CANCEL
          </button>
          <button
            onClick={() =>
              onConfirm(selectedComment.index, selectedComment.replyId)
            }
            className="btn-confirm"
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
