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

  const RecursiveComponent = ({ data }: { data: Commentor }) => {
    return (
      <>
        {data?.comments.map((comment, index) => (
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
            <div className="replies-section">
              {comment.replies && (
                <RecursiveComponent
                  data={{
                    currentUser: data.currentUser,
                    comments: comment.replies,
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="comments-section">
      <RecursiveComponent data={user} />
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
