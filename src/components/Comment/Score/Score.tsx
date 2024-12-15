import { useState } from "react";
import "./score.css";
interface ScoreProps {
  score: number;
  replyClicked: boolean;
}

export default function Score({ score, replyClicked }: ScoreProps) {
  const [commentScore, setCommentScore] = useState<number>(score);

  return (
    <>
      {!replyClicked && (
        <div className="score-container">
          <button onClick={() => setCommentScore(commentScore + 1)}>
            <img src="./images/icon-plus.svg" alt="plus icon" />
          </button>
          <p className="score">{commentScore}</p>
          <button onClick={() => setCommentScore(commentScore - 1)}>
            {" "}
            <img src="./images/icon-minus.svg" alt="minus icon" />{" "}
          </button>
        </div>
      )}
    </>
  );
}
