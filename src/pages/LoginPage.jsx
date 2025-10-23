/*
 * ================================================================
 * Copyright (c) 2025 Fredli Fourqoni
 * All Rights Reserved.
 *
 * Project     : Aplikasi Kuis React
 * File Name   : LoginPage.jsx
 * Description : Component for the user login page.
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

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * LoginPage Component
 * Renders the login page where users can enter their name to start the quiz.
 * @returns {JSX.Element} The rendered login page component.
 */
const LoginPage = () => {
  /**
   * State to store the username input by the user.
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   */
  const [username, setUsername] = useState('');

  /**
   * Hook from react-router-dom to programmatically navigate between routes.
   */
  const navigate = useNavigate();

  /**
   * Handles the form submission event.
   * It prevents the default form action, validates the username,
   * saves the username to localStorage, and navigates to the quiz page.
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username.trim()) {
      alert('Nama tidak boleh kosong!');
      return;
    }

    localStorage.setItem('quizUser', username);

    navigate('/quiz');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang!</h1>
        <p className="text-gray-600 mb-6">Masukkan nama Anda untuk memulai kuis.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="sr-only">
              Nama Pengguna
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Contoh: Budi"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Mulai Kuis
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;