import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import AddComment from "./components/AddComment/AddComment";
import { Commentor } from "./App.modal";
import { SyntheticEvent } from "react";
import DeleteComment from "./components/Comment/DeleteComment/DeleteComment";
import RecursiveComment from "./components/Comment/RecursiveComment/RecursiveComment";

function App() {
  const [userData, setUserData] = useState<Commentor>({
    currentUser: {
      username: "",
      image: {
        webp: "",
        png: "",
      },
    },
    comments: [],
  });

  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState<{
    index: number;
  } | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");

  const handleNewComment = (e: SyntheticEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const commentContent = formJson.comment as string;

    if (!commentContent.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    const NewComment = {
      content: commentContent,
      createdAt: "",
      id: Date.now(),
      replies: [],
      score: 0,
      user: {
        image: {
          webp: userData.currentUser.image.webp,
          png: userData.currentUser.image.png,
        },
        username: "juliusomo",
      },
    };
    const updatedComments = [...userData.comments, NewComment];

    setUserData({
      ...userData,
      comments: updatedComments,
    });
    form.reset();
  };

  const handleDelete = (index: number) => {
    const comments = [...userData.comments];

    const updatedComments = comments
      .map((comment) => ({
        ...comment,
        replies: [...comment.replies],
      }))
      .filter((comment) => {
        if (comment.id === index) {
          return false;
        }

        if (comment.replies.length > 0) {
          comment.replies = comment.replies.filter(
            (reply) => reply.id !== index
          );
        }

        return true;
      });

    setUserData({
      ...userData,
      comments: updatedComments,
    });
    setDeleteClicked(false);
  };

  const handleUpdateReply = (i: number) => {
    if (!replyContent.trim()) {
      alert("Reply cannot be empty!");
      return;
    }

    const newReply = {
      content: replyContent,
      createdAt: "",
      id: Date.now(),
      replyingTo: "",
      score: 0,
      user: {
        image: {
          webp: userData.currentUser.image.webp,
          png: userData.currentUser.image.png,
        },
        username: "juliusomo",
      },
      replies: [],
    };

    const updatedComments = [...userData.comments];
    if (updatedComments[i - 1].replies === undefined) {
      updatedComments.map((comment) => {
        comment.replies.filter((_, index) => {
          if (index === i) {
            return comment.replies.push(newReply);
          }
        });
      });
    } else {
      updatedComments[i - 1].replies.push(newReply);
    }

    setUserData({
      ...userData,
      comments: updatedComments,
    });

    setReplyContent("");
  };

  const handleCancel = () => {
    setDeleteClicked(false);
  };

  const OnDelete = (index: number) => {
    setSelectedComment({ index });
    setDeleteClicked(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios("./data.json");

        if (res.statusText !== "OK") {
          throw new Error("Failed to fetch");
        }

        setUserData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="comments-section">
      <RecursiveComment
        OnDelete={OnDelete}
        userData={userData}
        replyContent={replyContent}
        setReplyContent={setReplyContent}
        handleUpdateReply={handleUpdateReply}
      />
      <AddComment
        userName={userData?.currentUser.username}
        picture={userData?.currentUser.image.webp}
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
