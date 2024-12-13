import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import AddComment from "./components/AddComment/AddComment";
import { Commentor } from "./App.modal";
import CommentSection from "./components/Comment/Comment";
import { SyntheticEvent } from "react";

function App() {
  const [user, setUser] = useState<Commentor>({
    currentUser: {
      username: "",
      image: {
        webp: "",
        png: "",
      },
    },
    comments: [],
  });

  const handleReply = (i: number) => {
    const replyTo = user.comments[i].user.username;
    const newReply = {
      id: Date.now(),
      replyingTo: user.comments[i].user.username,
      content: `@${replyTo}`,
      createdAt: "",
      replies: [],
      score: 0,
      user: {
        image: {
          webp: user.currentUser.image.webp,
          png: user.currentUser.image.png,
        },
        username: "juliusomo",
      },
    };

    const updatedComments = [...user.comments];

    updatedComments[i].replies.push(newReply);
    setUser({
      ...user,
      comments: updatedComments,
    });
  };

  const handleNewComment = (e: SyntheticEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const commentContent = formJson.comment as string;
    const newId: number = user.comments.length + 1;

    if (!commentContent.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    const NewComment = {
      content: commentContent,
      createdAt: "",
      id: newId,
      replies: [],
      score: 0,
      user: {
        image: {
          webp: user.currentUser.image.webp,
          png: user.currentUser.image.png,
        },
        username: "juliusomo",
      },
    };
    const updatedComments = [...user.comments, NewComment];

    setUser({
      ...user,
      comments: updatedComments,
    });
    form.reset();
  };

  const handleDelete = (index: number, replyId?: number) => {
    const updatedComments = [...user.comments];

    if (replyId !== undefined) {
      const comment = updatedComments[index];
      comment.replies = comment.replies.filter((reply) => reply.id !== replyId);
    } else {
      updatedComments.splice(index, 1);
    }

    setUser({
      ...user,
      comments: updatedComments,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios("./data.json");

        if (res.statusText !== "OK") {
          throw new Error("Failed to fetch");
        }

        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="comments-section">
      {user?.comments.map((comment, index) => (
        <div className={`${comment.user.username}-container`} key={index}>
          <CommentSection
            userName={comment.user.username}
            picture={comment.user.image.webp}
            created={comment.createdAt}
            content={comment.content}
            score={comment.score}
            onDelete={() => handleDelete(index)}
            onReply={() => handleReply(index)}
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
                    onDelete={() => handleDelete(index, reply.id)}
                    onReply={() => handleReply(reply.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <AddComment
        userName={user?.currentUser.username}
        picture={user?.currentUser.image.webp}
        onNewComment={handleNewComment}
      />
    </div>
  );
}

export default App;
