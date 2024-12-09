import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import AddComment from "./components/CreateComment/AddComment";
import { Commentor } from "./App.modal";
import CommentSection from "./components/CommentSection/CommentSection";

function App() {
  const [commentSection, setCommentSection] = useState<Commentor>();

  const onDelete = (index: number) => {
    if (!commentSection) return;

    const updatedComments = [...commentSection.comments];
    updatedComments.splice(index, 1);

    setCommentSection({
      ...commentSection,
      comments: updatedComments,
    });
  };

  useEffect(() => {
    axios("./data.json")
      .then((response) => {
        setCommentSection(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="comments-section">
      {commentSection?.comments.map((comment, index) => (
        <div className={`${comment.user.username}-container`} key={index}>
          <CommentSection
            userName={comment.user.username}
            picture={comment.user.image.webp}
            created={comment.createdAt}
            content={comment.content}
            score={comment.score}
            onDelete={() => onDelete(index)}
          />
          {comment.replies.length > 0 && (
            <div className="replies-section">
              {comment.replies.map((reply) => (
                <div key={reply.id}>
                  <CommentSection
                    userName={reply.user.username}
                    picture={reply.user.image.webp}
                    created={reply.createdAt}
                    content={reply.content}
                    score={reply.score}
                    onDelete={() => onDelete(index)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <AddComment
        commentor={commentSection?.currentUser.username}
        commentorPic={commentSection?.currentUser.image.webp}
      />
    </div>
  );
}

export default App;
