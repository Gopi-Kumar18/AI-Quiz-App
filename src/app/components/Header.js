"use client";
import React from 'react';
import Link from 'next/link';
import { useQuiz } from '../context/QuizContext';

const Header = () => {
    const { currentUser, signInWithGoogle, logout } = useQuiz();

    return (
        <header className="bg-white shadow-md p-4 mb-8 w-full max-w-3xl rounded-lg">
            <nav className="flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-purple-700">AI Quiz</Link>
                <div className="flex items-center gap-4">
                    {currentUser && (
                         <Link href="/history" className="text-gray-600 hover:text-purple-700">History</Link>
                    )}
                    {currentUser ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm">Hi, {currentUser.displayName.split(' ')[0]}</span>
                            <button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">Logout</button>
                        </div>
                    ) : (
                        <button onClick={signInWithGoogle} className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">Sign in with Google</button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;