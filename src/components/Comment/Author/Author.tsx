import "./author.css";
import { AuthorProps } from "../../../App.modal";

export default function Author({
  picture,
  userName,
  created,
  handleEditClick,
  onDelete,
  editClicked,
  setToDoReply,
}: AuthorProps) {
  const isNotAuthor = userName !== "juliusomo";

  return (
    <div className="author-container">
      <div className="commentor-info">
        <img src={picture} alt={`${userName}-Profile`} />
        <p className="username">{userName}</p>
        {!isNotAuthor && <span>you</span>}
        <p className="created">{created}</p>
      </div>
      <div className="buttons">
        {isNotAuthor && (
          <button onClick={() => setToDoReply(true)} className="btn-reply">
            <img src="./images/icon-reply.svg" alt="reply icon" />
            Reply
          </button>
        )}
        {!editClicked && (
          <button onClick={handleEditClick} className="btn-edit">
            <img src="./images/icon-edit.svg" alt="delete icon" />
            Edit
          </button>
        )}

        <button onClick={onDelete} className="btn-delete">
          <img src="./images/icon-delete.svg" alt="delete icon" />
        </button>
      </div>
    </div>
  );
}
