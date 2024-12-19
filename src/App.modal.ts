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
  onReply: () => void;
}

export interface AuthorProps {
  picture: string;
  userName: string;
  created: string;
  handleEditClick: () => void;
  onDelete: () => void;
  editClicked: boolean;
  onReply: () => void;
}
