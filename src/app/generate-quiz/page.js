"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '../context/QuizContext';
import QuizDisplay from '../components/QuizDisplay';

const GenerateQuizPage = () => {
    const { quiz, loading } = useQuiz();
    const router = useRouter();

   
    useEffect(() => {
        if (!loading && !quiz) {
            router.push('/');
        }
    }, [quiz, loading, router]);

   
    if (!quiz) {
        return (
             <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200">
                <p className="text-xl text-purple-700">Loading your quiz...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-8 font-inter flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl border-4 border-purple-300">
                <QuizDisplay />
            </div>
        </div>
    );
};

export default GenerateQuizPage;