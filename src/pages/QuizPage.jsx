/*
 * ================================================================
 * Copyright (c) 2025 Fredli Fourqoni
 * All Rights Reserved.
 *
 * Project     : Aplikasi Kuis React
 * File Name   : QuizPage.jsx
 * Description : Component for the main quiz gameplay screen.
 * Author      : Fredli Fourqoni
 * Created On  : 24 October 2025
 *
 * Changelog:
 * ---------------------------------------------------------------
 * Version | Date       | Author           | Description
 * ---------------------------------------------------------------
 * 1.0.0   | 24-10-2025 | Fredli Fourqoni  | Initial creation
 * 1.1.0   | 24-10-2025 | Fredli Fourqoni  | Refactor logic to fix linting and improve state handling
 * ================================================================
 */

import { useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuizQuestions } from '../api/quizService';

const QUIZ_TIME_LIMIT = 300;

const QuizPage = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(QUIZ_TIME_LIMIT);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === true || !import.meta.env.DEV) {
      const loadQuiz = async () => {
        setIsLoading(true);
        try {
          const savedSession = localStorage.getItem('quizSession');
          if (savedSession) {
            const { questions, currentIndex, answers, timeLeft } = JSON.parse(savedSession);
            setQuestions(questions);
            setCurrentQuestionIndex(currentIndex);
            setUserAnswers(answers);
            setTimer(timeLeft);
          } else {
            const fetchedQuestions = await fetchQuizQuestions(10, 'multiple');
            if (fetchedQuestions.length === 0) {
              throw new Error("Gagal memuat soal. Silakan coba lagi.");
            }
            setQuestions(fetchedQuestions);
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      loadQuiz();
    }

    return () => {
      effectRan.current = true;
    };
  }, []);


  useEffect(() => {
    if (isLoading || isQuizFinished) return;

    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setIsQuizFinished(true);
    }
  }, [isLoading, isQuizFinished, timer]);

  useEffect(() => {
    if (isQuizFinished) {
      localStorage.removeItem('quizSession');
      navigate('/results', { state: { questions, userAnswers } });
    }
  }, [isQuizFinished, navigate, questions, userAnswers]);

  useEffect(() => {
    if (questions.length > 0 && !isLoading && !isQuizFinished) {
      const sessionData = {
        questions,
        currentIndex: currentQuestionIndex,
        answers: userAnswers,
        timeLeft: timer,
      };
      localStorage.setItem('quizSession', JSON.stringify(sessionData));
    }
  }, [questions, currentQuestionIndex, userAnswers, timer, isLoading, isQuizFinished]);

  const handleAnswerSelect = (selectedAnswer) => {
    const newAnswers = [...userAnswers, { question: questions[currentQuestionIndex].question, selectedAnswer }];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex === questions.length - 1) {
      setIsQuizFinished(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white text-2xl">Memuat Soal...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen bg-slate-900 text-red-500 text-2xl">Error: {error}</div>;
  }

  if (questions.length === 0) {
    return <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white text-2xl">Tidak ada soal yang ditemukan.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold">Soal {currentQuestionIndex + 1} dari {questions.length}</span>
          <span className="text-2xl font-mono bg-red-600 px-4 py-1 rounded-lg">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
        <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl mb-6 text-center">{currentQuestion.question}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.shuffledAnswers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(answer)}
                className="bg-blue-600 p-4 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-200"
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;