import Blobs from "./Blobs"

export default function QuizHeader({toggle}) {
  return (
    <main className="quiz-header-container">
      <Blobs />      

      <div className="quiz-header">
        <h1>Quizzical</h1>
        <p>Test Your Knowledge. Challenge Your Mind</p>
        <button className="quiz-btn" onClick={toggle}>Start Quiz</button>
      </div>
    </main>
  );
}

