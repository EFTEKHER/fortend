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

  // Determine if the user is admin based on their email
  const isAdmin = user?.email === "binary2ai@gmail.com" || user?.email === "shaimacme@gmail.com";

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
            <Link to={user ? "/" : "/login"} className="text-xl font-bold text-indigo-600">
              Diabetic Diet and Recommendation System
            </Link>
          </div>

          {/* Desktop Menu - Only shown when logged in */}
          {user && (
            <div className="hidden md:flex items-center space-x-4">
              {isAdmin ? (
                <>
                  <Link to="/" className="text-gray-700 font-bold hover:text-indigo-600">Home</Link>
                  <Link to="/predict" className="text-gray-700 font-bold hover:text-indigo-600">Prediction</Link>
                  <Link to="/recommendation" className="text-gray-700 font-bold hover:text-indigo-600">Diet</Link>
                  <Link to="/workflow" className="text-gray-700 font-bold hover:text-indigo-600">Workflow</Link>
                  <Link to="/visualization" className="text-gray-700 font-bold hover:text-indigo-600">Visualization</Link>
                  <Link to="/dataset" className="text-gray-700 font-bold hover:text-indigo-600">Dataset</Link>
                  <Link to="/chatbot" className="text-gray-700 font-bold hover:text-indigo-600">Chatbot</Link>
                  <Link to="/medical_report" className="text-gray-700 font-bold hover:text-indigo-600">Medical Report</Link>
                </>
              ) : (
                <>
                  <Link to="/report" className="text-gray-700 font-bold hover:text-indigo-600">My Reports</Link>
                  <Link to="/patient" className="text-gray-700 font-bold hover:text-indigo-600">Home</Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu Button - Only shown when logged in */}
          {user && (
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-indigo-600"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu - Only shown when logged in */}
      {user && isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAdmin ? (
              <>
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
                  to="/visualization"
                  className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
                  onClick={toggleMenu}
                >
                  Visualization
                </Link>
                <Link
                  to="/dataset"
                  className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
                  onClick={toggleMenu}
                >
                  Dataset
                </Link>
                <Link
                  to="/chatbot"
                  className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
                  onClick={toggleMenu}
                >
                  Chatbot
                </Link>
                <Link
                  to="/medical_report"
                  className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
                  onClick={toggleMenu}
                >
                  Medical Report
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/report"
                  className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
                  onClick={toggleMenu}
                >
                  My Reports
                </Link>
                <Link
                  to="/patient"
                  className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
              </>
            )}
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="w-full text-left px-3 py-2 text-red-500 hover:text-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;