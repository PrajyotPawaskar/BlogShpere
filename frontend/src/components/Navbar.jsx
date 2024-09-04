import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const logout = () => {
    setCookies('access_token', '', { path: '/' }); // Ensure cookie is cleared
    window.localStorage.removeItem('userID');
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 top-0 left-0 w-full p-4 shadow-md z-50 font-sans">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Blog Sphere</Link>
        </div>
        <ul className="flex space-x-6">
          {!cookies.access_token ? (
            <>
              <li>
                <Link
                  to={'/signup'}
                  className="text-white text-lg font-semibold transition ease-in-out duration-300 hover:text-gray-200"
                >
                  SignUp
                </Link>
              </li>
              <li>
                <Link
                  to={'/signin'}
                  className="text-white text-lg font-semibold transition ease-in-out duration-300 hover:text-gray-200"
                >
                  SignIn
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to={'/blogs/read'}
                  className="text-white text-lg font-semibold transition ease-in-out duration-300 hover:text-gray-200"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  to={'/blogs/write'}
                  className="text-white text-lg font-semibold transition ease-in-out duration-300 hover:text-gray-200"
                >
                  Create
                </Link>
              </li>
              <li
                className="text-white text-lg font-semibold transition ease-in-out duration-300 cursor-pointer hover:text-gray-200"
                onClick={logout}
              >
                Logout
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
