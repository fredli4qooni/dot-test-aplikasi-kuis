/*
 * ================================================================
 * Copyright (c) 2025 Fredli Fourqoni
 * All Rights Reserved.
 *
 * Project     : Aplikasi Kuis React
 * File Name   : decodeHtml.js
 * Description : Utility function to decode HTML entities.
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

/**
 * Decodes a string containing HTML entities.
 * @param {string} html - The string to decode.
 * @returns {string} The decoded string.
 */
export const decode = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};