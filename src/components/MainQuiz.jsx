import { useState, useEffect } from "react"
import Blobs from "./Blobs"
import Question from "./Question"
import { decode } from "html-entities"

export default function MainQuiz({toggle}) {
  
  const [questions, setQuestions] = useState([])
  const [isQuizDone, setIsQuizDone] = useState(false)
  
  function toggleQuizDone() {
    setIsQuizDone(prevState => !prevState)
  }

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(response => response.json())
      .then(data => {

        const decodedQuestions = data.results.map(question => ({
          question: decode(question.question),
          correct_answer: decode(question.correct_answer),
          answers: [
            decode(question.correct_answer),
            ...question.incorrect_answers.map(answer => decode(answer))
          ].sort(() => Math.random() - 0.5), // Shuffle answers
        }))

        setQuestions(decodedQuestions)
      })
      .catch(error => console.error('Error fetching quiz data:', error))
  }, []);
  
  const questionElements = questions.map((q, index) => (
    <Question 
      key={index}
      question={q.question}
      answers={q.answers}
      correct_answer={q.correct_answer}
      isQuizDone={isQuizDone}
      name={`quiz-${index}`}
    />
  ));

  function quizFooter() {
    if (isQuizDone) {

      const correctAnswersCount = questions.reduce((count, q, index) => {
        const selectedAnswer = document.querySelector(`input[name="quiz-${index}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === q.correct_answer) {
          return count + 1;
        }
        return count;
      }, 0)

      return (
        <div className="quiz-footer">
          <p className="quiz-footer-text">
            You scored {correctAnswersCount}/{questions.length}
          </p>
          <button className="quiz-btn lg" onClick={toggle}>Play again</button> 
        </div>
      );

    } 

    return (
      <div className="quiz-footer">
        <button className="quiz-btn lg" onClick={toggleQuizDone}>Check answers</button>
      </div>
    )
    
  }

  return (
    <main>
      <Blobs />
      <div className="quiz-container">
        {questionElements}
      </div>
      {quizFooter()}
    </main>
  )
}