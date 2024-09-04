import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const DetailBlogRead = () => {
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const { id } = useParams();
    const { speak } = useSpeechSynthesis(); 

    const getDetailedData = async () => {
        try {
            const response = await axios.get(`https://blog-shpere-three.vercel.app/read/${id}`);
            setData(response.data);
        } catch (err) {
            setError('An error occurred while fetching the data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDetailedData();
    }, [id]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (!data) {
        return <div className="text-center">No data found.</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-100 to-purple-100 p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-6xl font-extrabold text-gray-900 mb-4">{data.title}</h1>
                    <p className="text-lg text-gray-600">By {data.username}</p>
                </header>
                <main className="prose lg:prose-xl mx-auto text-gray-800 leading-relaxed">
                    <div className="mb-8">
                        <img
                            src={data.imageUrl}
                            alt={data.imageAlt || "Descriptive text here"}
                            className="w-full h-auto max-w-full rounded-lg border border-gray-300 shadow-md"
                        />
                    </div>
                    <button
                        onClick={playContent}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                    >
                        Read Aloud
                    </button>
                    <div className="mt-8">
                        {data.content}
                    </div>
                </main>
            </div>
        </div>
    );
};
