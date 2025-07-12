
"use client";
import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { db } from '../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';

const HistoryPage = () => {
    const { currentUser } = useQuiz();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        
        if (!currentUser) {
            router.push('/');
            return;
        }

        const fetchHistory = async () => {
            try {
                
                const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'; 

                const q = query(
                    collection(db, "artifacts", appId, "users", currentUser.uid, "quizHistory"),
                    orderBy("completedAt", "desc") 
                );
                const querySnapshot = await getDocs(q);
                const historyData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setHistory(historyData);
            } catch (error) {
                console.error("Error fetching history: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [currentUser, router]); 
    if (loading) {
        return <div className="text-center p-10">Loading history...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-8 font-inter flex flex-col items-center">
            <Header />
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl border-4 border-purple-300">
                <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Your Quiz History</h1>
                {history.length === 0 ? (
                    <p className="text-center text-gray-500">You have not completed any quizzes yet.</p>
                ) : (
                    <div className="space-y-4">
                        {history.map(item => (
                            <div key={item.id} className="p-4 border rounded-lg shadow-sm bg-indigo-50">
                                <h2 className="text-xl font-semibold text-indigo-800">{item.topic}</h2>
                                <p className="text-gray-600">Difficulty: {item.difficulty}</p>
                                <p className="font-bold text-lg">Score: {item.score} / {item.totalQuestions}</p>
                                <p className="text-sm text-gray-500">
                                    Completed on: {item.completedAt?.toDate ? new Date(item.completedAt.toDate()).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;