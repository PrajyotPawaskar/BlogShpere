import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const BlogRead = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const getData = async () => {
        try {
            const response = await axios.get("https://blog-shpere-three.vercel.app/blogs/read");
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const selectPageHandler = (selectedPage) => {
        if (selectedPage > 0 && selectedPage <= Math.ceil(filteredData.length / 6) && selectedPage !== page) {
            setPage(selectedPage);
        }
    };

    const filteredData = data.filter((d) => d.category.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-200 via-blue-300 to-purple-300 p-6 font-sans">
            <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-6 p-2 rounded-sm border border-gray-300"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredData.slice(page * 6 - 6, page * 6).map((d) => (
                    <div key={d._id} className="bg-white shadow-lg rounded-sm overflow-hidden flex flex-col h-[400px]">
                        <div className="p-6 flex-1 flex flex-col">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800 truncate">{d.title}</h2>
                            <p className="text-gray-700 mb-2">By {d.username}</p>
                            <img
                                src={d.imageUrl}
                                alt={d.title}
                                className="w-full h-40 object-cover mb-4" 
                            />
                            <p className="text-gray-700 mb-2 truncate">{d.category}</p>
                        </div>
                        <div className="p-6 flex-shrink-0 pt-0">
                            <Link to={`/blogs/${d._id}`}>
                                <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-sm shadow-md hover:from-indigo-600 hover:to-purple-700 transition ease-in-out duration-300 w-full">
                                    Read More
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {filteredData.length > 0 && (
                <div className='text-center mt-4'>
                    <span onClick={() => selectPageHandler(page - 1)} className='p-4 pt-4 pb-4 border-solid cursor-pointer'>&#9664;</span>
                    {
                        [...Array(Math.ceil(filteredData.length / 6))].map((_, i) => (
                            <span
                                onClick={() => selectPageHandler(i + 1)}
                                className={`p-4 pt-4 pb-4 cursor-pointer ${i + 1 === page ? 'font-bold' : ''}`}
                                key={i}
                            >
                                {i + 1}
                            </span>
                        ))
                    }
                    <span onClick={() => selectPageHandler(page + 1)} className='p-4 pt-4 pb-4 border-solid cursor-pointer'>&#9654;</span>
                </div>
            )}
        </div>
    );
};
