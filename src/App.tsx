import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import AddComment from "./components/AddComment/AddComment";
import { Commentor } from "./App.modal";
import Comment from "./components/Comment/Comment";
import { SyntheticEvent } from "react";
import DeleteComment from "./components/DeleteComment/DeleteComment";

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

  const [replyClicked, setReplyClicked] = useState<boolean>(false);
  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState<{
    index: number;
    replyId?: number;
  } | null>(null);

  const handleReply = (i: number, replyTo: string) => {
    setReplyClicked(true);

    const newReply = {
      id: Date.now(),
      replyingTo: replyTo,
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

    if (i === 3) {
      updatedComments[1].replies.push(newReply);
    } else {
      updatedComments[i].replies.push(newReply);
    }
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
    setDeleteClicked(false);
  };

  const handleCancel = () => {
    setDeleteClicked(false);
  };

  const OnDelete = (index: number, replyId?: number) => {
    setSelectedComment({ index, replyId });
    setDeleteClicked(true);
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
      }
    };

    fetchData();
  }, []);

  return (
    <div className="comments-section">
      {user?.comments.map((comment, index) => (
        <div className={`${comment.user.username}-container`} key={index}>
          <Comment
            userName={comment.user.username}
            picture={comment.user.image.webp}
            created={comment.createdAt}
            content={comment.content}
            score={comment.score}
            onDelete={() => OnDelete(index)}
            onReply={() => handleReply(index, comment.user.username)}
            replyClicked={replyClicked}
            setReplyClicked={setReplyClicked}
          />

          {comment.replies.length > 0 && (
            <div className="replies-section">
              {comment.replies.map((reply) => (
                <div key={reply.id}>
                  <Comment
                    userName={reply.user.username}
                    picture={reply.user.image.webp}
                    created={reply.createdAt}
                    content={reply.content}
                    score={reply.score}
                    onDelete={() => OnDelete(index, reply.id)}
                    onReply={() => handleReply(reply.id, reply.user.username)}
                    replyClicked={replyClicked}
                    setReplyClicked={setReplyClicked}
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
      {deleteClicked && selectedComment && (
        <DeleteComment
          onConfirm={handleDelete}
          selectedComment={selectedComment}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default App;
