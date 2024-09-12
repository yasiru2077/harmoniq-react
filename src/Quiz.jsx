import React, { useState } from 'react';
// import quizData from './quizData';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(""); 
  const [isCorrect, setIsCorrect] = useState(null);

  const quizData = [
    {
      question: "What is the musical term for 'very loud'?",
      options: ["Piano", "Forte", "Fortissimo", "Mezzoforte"],
      answer: "Fortissimo"
    },
    {
      question: "Which of these is not a type of musical scale?",
      options: ["Major", "Minor", "Chromatic", "Diagonal"],
      answer: "Diagonal"
    },
    {
      question: "What does 'tempo' refer to in music?",
      options: ["Volume", "Pitch", "Speed", "Rhythm"],
      answer: "Speed"
    },
    {
      question: "Which instrument is known as the 'King of Instruments'?",
      options: ["Piano", "Violin", "Organ", "Guitar"],
      answer: "Organ"
    },
    {
      question: "What is the term for a sudden increase in volume in music?",
      options: ["Crescendo", "Diminuendo", "Sforzando", "Ritardando"],
      answer: "Sforzando"
    }
  ];

  const handleAnswerOptionClick = (option) => {
    const correctAnswer = quizData[currentQuestion].answer;
    setSelectedAnswer(option);
    if (option === correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    // Delay moving to the next question to allow the user to see feedback
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
        setIsCorrect(null); // Reset for the next question
        setSelectedAnswer(""); // Reset selected answer
      } else {
        setShowScore(true);
      }
    }, 1000); // Adjust time as needed
  };

  return (
    <div className='quiz'>
      {showScore ? (
        <div className='score-section'>
          You scored {score} out of {quizData.length}
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{quizData.length}
            </div>
            <div className='question-text'>{quizData[currentQuestion].question}</div>
          </div>
          <div className='answer-section'>
            {quizData[currentQuestion].options.map((option) => (
              <button 
                onClick={() => handleAnswerOptionClick(option)} 
                key={option}
                style={{ backgroundColor: selectedAnswer === option ? (isCorrect ? 'lightgreen' : 'pink') : '' }}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedAnswer && (
            <div style={{ marginTop: '10px' }}>
              {isCorrect ? 'Correct! 🎉' : 'Sorry, that’s not right. 😢'}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz;