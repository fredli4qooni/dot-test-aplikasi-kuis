import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/quiz" element={<QuizPage />} />

        <Route path="/results" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;