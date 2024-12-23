import { Dispatch, SetStateAction } from "react";

interface Image {
  png: string;
  webp: string;
}

interface User {
  image: Image;
  username: string;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[];
}

interface Reply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: User;
  replies: Reply[];
}

export interface Commentor {
  currentUser: User;
  comments: Comment[];
}

export interface CommentProps {
  userName: string;
  picture: string;
  created: string;
  content: string;
  score: number;
  onDelete: () => void;
  replyContent: string;
  setReplyContent: Dispatch<SetStateAction<string>>;
  userData: Commentor;
  setUserData: Dispatch<SetStateAction<Commentor>>;
  index: number;
}

export interface AuthorProps {
  picture: string;
  userName: string;
  created: string;
  handleEditClick: () => void;
  onDelete: () => void;
  editClicked: boolean;
  setToDoReply: Dispatch<SetStateAction<boolean>>;
}

export interface ReplyCommentProps {
  setToDoReply: Dispatch<SetStateAction<boolean>>;
  replyContent: string;
  setReplyContent: Dispatch<SetStateAction<string>>;
  handleUpdateReply: () => void;
}

export interface RecursiveCommentProps {
  userData: Commentor;
  OnDelete: (index: number) => void;
  replyContent: string;
  setReplyContent: Dispatch<SetStateAction<string>>;
  setUserData: Dispatch<SetStateAction<Commentor>>;
}
