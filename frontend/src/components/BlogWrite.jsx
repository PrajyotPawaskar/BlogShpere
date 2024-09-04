import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const BlogWrite = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [category, setCategory] = useState("");
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        if (!title.trim()) errors.title = "Title is required";
        if (!content.trim()) errors.content = "Content is required";
        if (!imageUrl.trim()) errors.imageUrl = "Image URL is required";
        if (!category.trim()) errors.category = "Category is required";
        if (!username.trim()) errors.username = "Author name is required";

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        try {
            const data = { title, content, imageUrl, category, username };
            await axios.post("https://blog-shpere-three.vercel.app/blogs/write", data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            navigate('/blogs/read');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-200 via-blue-300 to-purple-300 p-6 font-sans">
            <div className="w-full max-w-3xl bg-white p-8 rounded-sm shadow-lg border border-gray-300 space-y-6">
                <h2 className="text-3xl font-bold text-gray-800">Create a New Blog</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-lg font-semibold text-gray-700">Title</label>
                        <input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            className={`mt-2 block w-full border rounded-sm shadow-sm px-4 py-2 ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-lg font-semibold text-gray-700">Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className={`mt-2 block w-full border rounded-sm shadow-sm px-4 py-2 ${errors.content ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                            rows="8"
                        />
                        {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block text-lg font-semibold text-gray-700">Image URL</label>
                        <input
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            type="text"
                            className={`mt-2 block w-full border rounded-sm shadow-sm px-4 py-2 ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                        />
                        {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl}</p>}
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-lg font-semibold text-gray-700">Category</label>
                        <input
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            type="text"
                            className={`mt-2 block w-full border rounded-sm shadow-sm px-4 py-2 ${errors.category ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                        />
                        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-lg font-semibold text-gray-700">Author Name</label>
                        <input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            className={`mt-2 block w-full border rounded-sm shadow-sm px-4 py-2 ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-sm shadow-md hover:from-indigo-600 hover:to-purple-700 transition ease-in-out duration-300"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
