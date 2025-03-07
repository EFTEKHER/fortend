import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              Diabetes Diet Recommendation AI System
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 font-bold hover:text-indigo-600">Home</Link>
            <Link to="/predict" className="text-gray-700 font-bold hover:text-indigo-600">Prediction</Link>
            <Link to="/recommendation" className="text-gray-700 font-bold hover:text-indigo-600">Diet</Link>
            <Link to="/workflow" className="text-gray-700 font-bold hover:text-indigo-600">Workflow</Link>
            <Link to="/visualization" className="text-gray-700 font-bold hover:text-indigo-600">Visualization</Link>
            <Link to="/dataset" className="text-gray-700 font-bold hover:text-indigo-600">Dataset</Link>
            <Link to="/chatbot" className="text-gray-700 font-bold hover:text-indigo-600">Chatbot</Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-indigo-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/predict"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
              onClick={toggleMenu}
            >
              Prediction
            </Link>
            <Link
              to="/recommendation"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
              onClick={toggleMenu}
            >
              Diet
            </Link>
            <Link
              to="/workflow"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
              onClick={toggleMenu}
            >
              Workflow
            </Link>
            <Link
              to="/dataset"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
              onClick={toggleMenu}
            >Dataset</Link>
             <Link
              to="/chatbot"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
              onClick={toggleMenu}
            >Chatbot</Link>
            <Link
              to="/visualization"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
              onClick={toggleMenu}
            >
              Visualization
            </Link>
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="w-full text-left px-3 py-2 text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-indigo-600 hover:text-indigo-700"
                onClick={toggleMenu}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
