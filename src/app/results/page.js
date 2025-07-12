"use client";
import React from 'react';
import { useQuiz } from '../context/QuizContext';

const QuizResults = () => {
    const { quiz, userAnswers, score, handleStartNewQuiz } = useQuiz();

    if (!quiz) {
        return null;
    }
   
    return (
        <div className="mt-8 p-6 bg-white rounded-xl shadow-2xl border-2 border-teal-200">
            <h2 className="text-3xl font-bold text-teal-700 mb-6 text-center">Quiz Results</h2>
            <p className="text-2xl font-semibold text-center mb-6">
                
                Your Score: <span className="text-teal-600">{score}</span> / <span className="text-purple-600">{quiz.length}</span>
            </p>

            
            {quiz.map((q, qIndex) => (
                <div key={qIndex} className={`mb-6 p-4 rounded-xl shadow-sm ${userAnswers[qIndex] === q.correctAnswer ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
                    <p className="text-lg font-semibold text-gray-800 mb-3">{qIndex + 1}. {q.question}</p>
                    <ul className="list-disc list-inside space-y-1">
                        {q.options.map((option, oIndex) => (
                            <li key={oIndex} className={`text-base ${option === q.correctAnswer ? 'font-bold text-green-700' : 'text-gray-700'}`}>
                                {option}
                                {option === q.correctAnswer && <span className="ml-2 text-green-700">(Correct Answer)</span>}
                                {userAnswers[qIndex] === option && userAnswers[qIndex] !== q.correctAnswer && <span className="ml-2 text-red-700">(Your Answer)</span>}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3 text-sm italic">
                        Your selection: <span className={`${userAnswers[qIndex] === q.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>{userAnswers[qIndex] || 'Not answered'}</span>
                    </p>
                </div>
            ))}
            <button
                onClick={handleStartNewQuiz}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-bold text-xl shadow-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 mt-6"
            >
                Generate New Quiz
            </button>
        </div>
    );
};

export default QuizResults;