"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { genQuizFrmGemini } from '../services/apiService';
import { app,auth, db } from '../lib/firebase';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore"; 

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

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });
        return () => unsubscribe(); 
    }, []);


    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in with Google: ", error);
        }
    };

    const logout = async () => {
        await signOut(auth);
        router.push('/');
    };

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

    const handleSubmitQuiz = async() => {
        let correctCount = 0;
        quiz.forEach((q, index) => {
            if (userAnswers[index] === q.correctAnswer) {
                correctCount++;
            }
        });
        setScore(correctCount);
        setShowResults(true);
        // router.push('/results');
        
        if (currentUser) {
            const quizResult = {
                topic: topic,
                difficulty: difficulty,
                score: correctCount,
                totalQuestions: quiz.length,
                userAnswers: userAnswers,
                quizData: quiz, 
                completedAt: serverTimestamp()
            };
            try {
                
                const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'; 
                const historyRef = doc(collection(db, "artifacts", appId, "users", currentUser.uid, "quizHistory")); 
                await setDoc(historyRef, quizResult);
                console.log("Quiz result saved!");
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
        router.push('/results');
    };

    const handleStartNewQuiz = () => {
        resetQuizState();
        setTopic('');
        setTextContent('');
        router.push('/'); 
    };

    
    const value = {
        currentUser,
        signInWithGoogle,
        logout,
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
