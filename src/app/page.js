"use client";
import React from 'react';
import QuizForm from './components/QuizForm';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-8 font-inter flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl border-4 border-purple-300">
                <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-8">AI Quiz Generator</h1>
                <QuizForm />
            </div>
        </div>
    );
};

export default HomePage;