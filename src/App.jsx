import { useState } from 'react'
import './index.css'
import QuizHeader from './components/QuizHeader'
import MainQuiz from './components/MainQuiz'

function App() {

  // Create state that manages the current page that the user is on
  const [currentPage, setCurrentPage] = useState(() => 'home')

  function handleBackToHome() {
    setCurrentPage('home')
  }

  function handleStartQuiz() {
    setCurrentPage('questions')
  }

  return (
    <>
      {currentPage === 'home' && <QuizHeader toggle={handleStartQuiz} />}
      {currentPage === 'questions' && <MainQuiz toggle={handleBackToHome} />}
    </>
  )
}

export default App
