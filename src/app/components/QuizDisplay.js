"use client";
import React from 'react';
import { useQuiz } from '../context/QuizContext';

const QuizDisplay = () => {
    const { quiz, userAnswers, handleAnswerChange, handleSubmitQuiz } = useQuiz();

    return (
        <div className="mt-8 p-6 bg-white rounded-xl shadow-2xl border-2 border-purple-200">
            <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">Your Quiz</h2>
            {quiz.map((q, qIndex) => (
                <div key={qIndex} className="mb-6 p-4 border border-indigo-200 rounded-xl bg-indigo-50 shadow-sm">
                    <p className="text-lg font-semibold text-purple-800 mb-3">{qIndex + 1}. {q.question}</p>
                    <div className="space-y-2">
                        {q.options.map((option, oIndex) => (
                            <label key={oIndex} className="flex items-center text-gray-700 cursor-pointer">
                                <input
                                    type="radio"
                                    name={`question-${qIndex}`}
                                    value={option}
                                    checked={userAnswers[qIndex] === option}
                                    onChange={() => handleAnswerChange(qIndex, option)}
                                    className="form-radio h-5 w-5 text-purple-600 focus:ring-purple-500 transition duration-150 ease-in-out"
                                />
                                <span className="ml-3 text-base">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            <button
                onClick={handleSubmitQuiz}
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-6 rounded-lg font-bold text-xl shadow-lg hover:from-green-600 hover:to-teal-700 transition duration-300 ease-in-out transform hover:scale-105 mt-6"
            >
                Submit Quiz
            </button>
        </div>
    );
};
export default QuizDisplay;

