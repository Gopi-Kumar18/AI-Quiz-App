"use client";

import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { genQuizFrmGemini } from '../services/apiService';


const QuizContext = createContext();

export const useQuiz = () => {
    return useContext(QuizContext);
};

export const QuizProvider = ({ children }) => {
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('medium');
    const [numQuestions, setNumQuestions] = useState(5);
    const [textContent, setTextContent] = useState('');
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const router = useRouter();

    const resetQuizState = () => {
        setQuiz(null);
        setUserAnswers({});
        setShowResults(false);
        setScore(0);
        setError('');
    };

    const generateQuiz = async () => {
        setLoading(true);
        resetQuizState();

        try {
            const generatedQuiz = await genQuizFrmGemini({ topic, difficulty, numQuestions, textContent });
            setQuiz(generatedQuiz);
            router.push('/generate-quiz'); 
        } catch (err) {
            console.error("Error generating quiz:", err);
            setError(`Failed to generate quiz: ${err.message}.`);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerChange = (questionIndex, selectedOption) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionIndex]: selectedOption
        }));
    };

    const handleSubmitQuiz = () => {
        let correctCount = 0;
        quiz.forEach((q, index) => {
            if (userAnswers[index] === q.correctAnswer) {
                correctCount++;
            }
        });
        setScore(correctCount);
        setShowResults(true);
        router.push('/results'); 
    };

    const handleStartNewQuiz = () => {
        resetQuizState();
        setTopic('');
        setTextContent('');
        router.push('/'); 
    };

    
    const value = {
        topic, setTopic,
        difficulty, setDifficulty,
        numQuestions, setNumQuestions,
        textContent, setTextContent,
        quiz,
        loading,
        error,
        userAnswers,
        showResults,
        score,
        generateQuiz,
        handleAnswerChange,
        handleSubmitQuiz,
        handleStartNewQuiz,
    };

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};