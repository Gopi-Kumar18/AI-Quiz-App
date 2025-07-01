
"use client";
import React from 'react';
import { useQuiz } from '../context/QuizContext';


const QuizForm = () => {
    
    const {
        topic, setTopic,
        difficulty, setDifficulty,
        numQuestions, setNumQuestions,
        textContent, setTextContent,
        generateQuiz,
        loading,
        error
    } = useQuiz();

    return (
        <div className="mb-8 p-6 bg-purple-50 rounded-xl shadow-inner">
            
            <div className="mb-4">
                <label htmlFor="topic" className="block text-purple-800 text-lg font-semibold mb-2">Quiz Topic:</label>
                <input
                    type="text"
                    id="topic"
                    className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                    placeholder="e.g., Photosynthesis, World War II, JavaScript"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="difficulty" className="block text-purple-800 text-lg font-semibold mb-2">Difficulty:</label>
                <select
                    id="difficulty"
                    className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 bg-white"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="numQuestions" className="block text-purple-800 text-lg font-semibold mb-2">Number of Questions:</label>
                <input
                    type="number"
                    id="numQuestions"
                    className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                    min="1"
                    max="10"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="textContent" className="block text-purple-800 text-lg font-semibold mb-2">
                    Paste Text Content (Optional):
                </label>
                <textarea
                    id="textContent"
                    rows="5"
                    className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 resize-y"
                    placeholder="Paste text here to generate questions from specific content."
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                ></textarea>
            </div>

            <button
                onClick={generateQuiz}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-bold text-xl shadow-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || !topic.trim()}
            >
                {loading ? 'Generating Quiz...' : 'Generate Quiz'}
            </button>
            {error && <p className="text-red-600 mt-4 text-center text-lg font-medium">{error}</p>}
        </div>
    );
};

export default QuizForm;