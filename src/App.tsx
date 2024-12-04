import "./App.css";
import Author from "./components/Author/Author";
import Comment from "./components/Comments/Comment";
import Score from "./components/Score/Score";
import axios from "axios";
import { useEffect, useState } from "react";

interface Commentor {
  currentUser: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  comments: {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: {
      image: {
        png: string;
        webp: string;
      };
      username: string;
    };
    replies: {
      id: number;
      content: string;
      createdAt: string;
      score: number;
      replyingTo: string;
      user: {
        image: {
          png: string;
          webp: string;
        };
        username: string;
      };
    }[];
  }[];
}

function App() {
  const [commentSection, setCommentSection] = useState<Commentor>();

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
    <div className="comment-section">
      {commentSection?.comments.map((comment) => (
        <div key={comment.id}>
          <div className={`${comment.user.username}-container`}>
            <div>
              <Score score={comment.score} />
            </div>
            <div className="author-comment">
              <Author
                userName={comment.user.username}
                picture={comment.user.image.webp}
                created={comment.createdAt}
              />
              <Comment content={comment.content} />
            </div>
          </div>
          {comment.replies.length > 0 && (
            <div className="replies-section">
              {comment.replies.map((reply) => (
                <div key={reply.id}>
                  <div>
                    <Score score={reply.score} />
                  </div>
                  <div className="author-comment">
                    <Author
                      userName={reply.user.username}
                      picture={reply.user.image.webp}
                      created={reply.createdAt}
                    />
                    <Comment content={reply.content} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
