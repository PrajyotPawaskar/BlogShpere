import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email address is invalid";
    if (!password) errors.password = "Password is required";

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
      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password
      });
      console.log(response.data);
      console.log(response.data.token);
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
      setEmail("");
      setPassword("");
      setErrors({});
    } catch (error) {
      console.error(error);
      setErrors({ server: "Login failed. Please check your credentials and try again." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-200 via-blue-300 to-purple-300 p-6 font-sans">
      <div className="bg-gradient-to-br from-white via-gray-100 to-gray-200 p-8 rounded-sm shadow-2xl max-w-lg w-full border border-gray-300">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-2 block w-full border rounded-sm shadow-md px-4 py-2 transition-transform transform hover:scale-105 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-teal-600 focus:ring focus:ring-teal-600 focus:ring-opacity-50`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-900">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-2 block w-full border rounded-sm shadow-md px-4 py-2 transition-transform transform hover:scale-105 ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-teal-600 focus:ring focus:ring-teal-600 focus:ring-opacity-50`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          {errors.server && <p className="text-red-500 text-sm text-center">{errors.server}</p>}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-2 px-4 rounded-sm shadow-md hover:from-teal-600 hover:to-blue-700 transition ease-in-out duration-300 transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
