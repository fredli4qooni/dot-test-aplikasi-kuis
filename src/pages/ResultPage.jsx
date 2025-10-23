/*
 * ================================================================
 * Copyright (c) 2025 Fredli Fourqoni
 * All Rights Reserved.
 *
 * Project     : Aplikasi Kuis React
 * File Name   : ResultPage.jsx
 * Description : Component to display the quiz results.
 * Author      : Fredli Fourqoni
 * Created On  : 24 October 2025
 *
 * Changelog:
 * ---------------------------------------------------------------
 * Version | Date       | Author           | Description
 * ---------------------------------------------------------------
 * 1.0.0   | 24-10-2025 | Fredli Fourqoni  | Initial creation
 * ================================================================
 */

import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * ResultPage Component
 * Displays the final score and summary of the completed quiz.
 * @returns {JSX.Element} The rendered result page component.
 */
const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');

  const quizData = location.state;

  useEffect(() => {
    if (!quizData) {
      navigate('/');
    }
    const storedUsername = localStorage.getItem('quizUser');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [quizData, navigate]);

  /**
   * Menghitung skor kuis.
   * `useMemo` digunakan untuk optimasi, agar kalkulasi hanya berjalan
   * sekali saat `quizData` berubah, bukan di setiap render.
   */
  const score = useMemo(() => {
    if (!quizData) {
      return { correct: 0, incorrect: 0, answered: 0 };
    }

    const { questions, userAnswers } = quizData;
    let correctAnswersCount = 0;

    userAnswers.forEach((userAnswer) => {
      const question = questions.find(q => q.question === userAnswer.question);
      if (question && userAnswer.selectedAnswer === question.correctAnswer) {
        correctAnswersCount++;
      }
    });

    const answeredCount = userAnswers.length;
    const incorrectAnswersCount = answeredCount - correctAnswersCount;

    return {
      correct: correctAnswersCount,
      incorrect: incorrectAnswersCount,
      answered: answeredCount,
      total: questions.length
    };
  }, [quizData]);

  /**
   * Menangani klik tombol "Coba Lagi", mengarahkan pengguna kembali ke halaman utama.
   */
  const handleRetry = () => {
    navigate('/');
  };

  if (!quizData) {
    return null; 
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 p-4 text-white">
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-blue-400 mb-2">Kuis Selesai!</h1>
        <p className="text-xl text-gray-300 mb-6">
          Bagus sekali, <span className="font-bold text-yellow-400">{username}</span>!
        </p>
        
        <div className="bg-slate-700 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Ringkasan Hasil Anda</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-lg">
            <div className="bg-green-600 p-4 rounded-lg">
              <p className="font-bold text-3xl">{score.correct}</p>
              <p>Benar</p>
            </div>
            <div className="bg-red-600 p-4 rounded-lg">
              <p className="font-bold text-3xl">{score.incorrect}</p>
              <p>Salah</p>
            </div>
            <div className="bg-gray-500 p-4 rounded-lg">
              <p className="font-bold text-3xl">{score.answered} / {score.total}</p>
              <p>Dijawab</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleRetry}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
};

export default ResultPage;