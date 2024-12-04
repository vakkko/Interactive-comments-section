import "./score.css";
interface ScoreProps {
  score: number;
}

export default function Score({ score }: ScoreProps) {
  return (
    <div className="score-container">
      <button>
        <img src="./images/icon-plus.svg" alt="plus icon" />
      </button>
      <p className="score">{score}</p>
      <button>
        {" "}
        <img src="./images/icon-minus.svg" alt="minus icon" />{" "}
      </button>
    </div>
  );
}
