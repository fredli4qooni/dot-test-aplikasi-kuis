/*
 * ================================================================
 * Copyright (c) 2025 Fredli Fourqoni
 * All Rights Reserved.
 *
 * Project     : Aplikasi Kuis React
 * File Name   : quizService.js
 * Description : Service for fetching quiz questions from OpenTDB API.
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

import { decode } from '../utils/decodeHtml';

/**
 * Shuffles an array in place.
 * @param {Array<any>} array The array to shuffle.
 * @returns {Array<any>} The shuffled array.
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * Fetches quiz questions from the OpenTDB API.
 * @param {number} amount - The number of questions to fetch.
 * @param {string} type - The type of questions (e.g., 'multiple', 'boolean').
 * @returns {Promise<Array<object>>} A promise that resolves to an array of formatted question objects.
 */
export const fetchQuizQuestions = async (amount = 10, type = 'multiple') => {
  const API_URL = `https://opentdb.com/api.php?amount=${amount}&type=${type}`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return data.results.map((question) => {
      const incorrectAnswers = question.incorrect_answers.map(answer => decode(answer));
      const correctAnswer = decode(question.correct_answer);
      
      return {
        question: decode(question.question),
        correctAnswer: correctAnswer,
        shuffledAnswers: shuffleArray([...incorrectAnswers, correctAnswer]),
      };
    });
  } catch (error) {
    console.error("Failed to fetch quiz questions:", error);
    return [];
  }
};