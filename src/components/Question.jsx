import clsx from 'clsx'

export default function Question({ question, answers, name, correct_answer, isQuizDone }) {
    const answersElements = answers.map((answer, index) => {

        let selectedAnswer = null;

        if(isQuizDone) {
            selectedAnswer = document.querySelector(`input[name="${name}"]:checked`).value

        }
        
        const className = clsx('answer-label', {
            correct: isQuizDone && answer === correct_answer,
            wrong: isQuizDone && selectedAnswer===answer && selectedAnswer!== correct_answer
        })
        
        
        return (
            <label key={index} className={className}>
                <input 
                    type="radio" 
                    name={name}
                    value={answer}
                    className="answer-input"
                    required
                />
                {answer}
            </label>
        )
    });

    return(
        <div className="question-container">
            <h2 className="question-text">{question}</h2>
            <form>
                {answersElements}
            </form>
        </div>
    )
}