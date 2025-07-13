import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy, Award, Target } from 'lucide-react';
import quizData from '../data/quiz.json';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [quizStarted, setQuizStarted] = useState(false);

  // Select 10 random questions
  const [questions] = useState(() => {
    const shuffled = [...quizData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  });

  useEffect(() => {
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && !quizCompleted) {
      handleQuizEnd();
    }
  }, [timeLeft, quizStarted, quizCompleted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswer = {
      questionId: questions[currentQuestion].id,
      selected: selectedAnswer,
      correct: questions[currentQuestion].correct
    };

    setUserAnswers([...userAnswers, newAnswer]);
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        handleQuizEnd();
      }
    }, 2000);
  };

  const handleQuizEnd = () => {
    setQuizCompleted(true);
    setShowResult(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResult(false);
    setQuizCompleted(false);
    setTimeLeft(600);
    setQuizStarted(false);
  };

  const calculateScore = () => {
    return userAnswers.filter(answer => answer.selected === answer.correct).length;
  };

  const getScoreMessage = (score) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return { message: "Excellent! You're a textile expert!", icon: Trophy, color: "text-yellow-500" };
    if (percentage >= 80) return { message: "Great job! You have strong knowledge!", icon: Award, color: "text-blue-500" };
    if (percentage >= 70) return { message: "Good work! Keep learning!", icon: Target, color: "text-green-500" };
    if (percentage >= 60) return { message: "Not bad! More practice needed.", icon: Target, color: "text-orange-500" };
    return { message: "Keep studying and try again!", icon: Target, color: "text-red-500" };
  };

  if (!quizStarted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen py-8 flex items-center justify-center"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            <Trophy className="h-16 w-16 text-accent mx-auto mb-6" />
            <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Textile Engineering Quiz
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Test your knowledge with 10 multiple-choice questions
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Quiz Instructions:</h3>
              <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 text-left">
                <li>• 10 questions randomly selected from our question bank</li>
                <li>• 10 minutes time limit (600 seconds)</li>
                <li>• Choose the best answer for each question</li>
                <li>• You'll see correct answers and explanations at the end</li>
              </ul>
            </div>
            <button
              onClick={() => setQuizStarted(true)}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (quizCompleted) {
    const score = calculateScore();
    const { message, icon: Icon, color } = getScoreMessage(score);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen py-8"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="text-center mb-8">
            <Icon className={`h-20 w-20 ${color} mx-auto mb-4`} />
            <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">
              Quiz Complete!
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-300 mb-4">
              You scored {score} out of {questions.length}
            </p>
            <p className={`text-lg font-medium ${color}`}>
              {message}
            </p>
          </div>

          {/* Score Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-green-500">{score}</div>
                <div className="text-gray-600 dark:text-gray-400">Correct</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-500">{questions.length - score}</div>
                <div className="text-gray-600 dark:text-gray-400">Incorrect</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-500">{Math.round((score / questions.length) * 100)}%</div>
                <div className="text-gray-600 dark:text-gray-400">Score</div>
              </div>
            </div>
          </div>

          {/* Answer Review */}
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
              Review Your Answers
            </h2>
            {questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer?.selected === question.correct;
              
              return (
                <div
                  key={question.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-start gap-3 mb-4">
                    {isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                        {index + 1}. {question.question}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optionIndex) => {
                          const isUserChoice = userAnswer?.selected === optionIndex;
                          const isCorrectAnswer = question.correct === optionIndex;
                          
                          let className = "p-3 rounded-lg border ";
                          if (isCorrectAnswer) {
                            className += "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200";
                          } else if (isUserChoice && !isCorrectAnswer) {
                            className += "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200";
                          } else {
                            className += "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300";
                          }
                          
                          return (
                            <div key={optionIndex} className={className}>
                              <div className="flex items-center">
                                <span className="font-medium mr-2">
                                  {String.fromCharCode(65 + optionIndex)}.
                                </span>
                                {option}
                                {isCorrectAnswer && (
                                  <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                                )}
                                {isUserChoice && !isCorrectAnswer && (
                                  <XCircle className="h-4 w-4 text-red-500 ml-auto" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                        <p className="text-blue-800 dark:text-blue-200 text-sm">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="text-center">
            <button
              onClick={resetQuiz}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              <RotateCcw size={20} />
              Take Quiz Again
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quiz Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
              Question {currentQuestion + 1} of {questions.length}
            </h1>
            <div className="text-lg font-medium text-gray-600 dark:text-gray-300">
              Time: {formatTime(timeLeft)}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6 leading-relaxed">
                  {question.question}
                </h2>
                
                <div className="space-y-3 mb-8">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedAnswer === index
                          ? 'border-primary bg-primary/5 dark:bg-primary/10'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="font-medium text-primary mr-3 text-lg">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <span className="text-gray-900 dark:text-white">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                    selectedAnswer === null
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-primary hover:bg-primary/90 text-white'
                  }`}
                >
                  {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                {selectedAnswer === question.correct ? (
                  <div>
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-600 mb-2">Correct!</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {question.explanation}
                    </p>
                  </div>
                ) : (
                  <div>
                    <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-red-600 mb-2">Incorrect</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      The correct answer was: <strong>{question.options[question.correct]}</strong>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {question.explanation}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Quiz;