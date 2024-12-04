import "./author.css";
interface AuthorProps {
  picture: string;
  userName: string;
  created: string;
}

export default function Author({ picture, userName, created }: AuthorProps) {
  return (
    <div className="author-container">
      <div className="commenter-info">
        <img src={picture} alt={`${userName}-Profile`} />
        <p className="username">{userName}</p>
        <p className="created">{created}</p>
      </div>
      <div>
        <button className="btn-reply">
          <img src="./images/icon-reply.svg" alt="reply icon" />
          <span className="txt-reply">Reply</span>
        </button>
      </div>
    </div>
  );
}
