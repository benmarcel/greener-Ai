import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <NavLink to="/" className="flex items-center">
                <span className="text-2xl font-bold text-primary">🌱</span>
                <span className="ml-2 text-xl font-bold text-gray-800">
                  Greener AI
                </span>
              </NavLink>
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <div className="hidden md:flex space-x-4">
                    <NavLink
                      to="/dashboard"
                      className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Dashboard
                    </NavLink>
                    <NavLink
                      to="/community"
                      className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Community
                    </NavLink>
                    <NavLink
                      to="/actions"
                      className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Actions
                    </NavLink>
                    <NavLink
                      to="/ai-chat"
                      className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                    >
                      AI Assistant
                    </NavLink>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {user?.name}
                      </span>
                      <span className="bg-primary text-white px-2 py-1 rounded text-xs font-bold">
                        Lvl {user?.level}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Logout
                    </button>
                  </div>
                  {/* hamburger menu */}
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="md:hidden text-gray-700 hover:text-primary focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="bg-primary hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <MobileMenu
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        handleLogout={handleLogout}
      />
    </header>
  );
};

export default Navbar;
