import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Film,
  Calendar,
  User,
  Ticket,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

interface CustomerLayoutProps {
  children: React.ReactNode;
}

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Movies', path: '/', icon: <Film size={20} /> },
    { name: 'Schedule', path: '/schedule', icon: <Calendar size={20} /> },
    { name: 'My Tickets', path: '/my-tickets', icon: <Ticket size={20} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-black text-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <Film size={24} className="mr-2" />
              <span className="text-xl font-bold">MetaCine</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-1 py-2 text-sm font-medium border-b-2 ${
                    location.pathname === item.path
                      ? 'border-red-500 text-white'
                      : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User Menu (Desktop) */}
            <div className="hidden md:flex items-center">
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center text-sm font-medium text-white rounded-full focus:outline-none">
                    <User size={20} className="mr-1" />
                    <span>{user?.name}</span>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition ease-out duration-200">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900">
          <div className="pt-2 pb-3 space-y-1 px-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            {isAuthenticated ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <User size={36} className="rounded-full p-1 bg-gray-800" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">{user?.name}</div>
                    <div className="text-sm font-medium text-gray-400">{user?.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="px-4">
                <Link
                  to="/login"
                  className="block text-center px-4 py-2 text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-grow bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6">
              <Link to="/" className="text-gray-400 hover:text-white">
                Home
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-white">
                About
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </div>
            <div className="mt-4 md:mt-0">
              <p>&copy; {new Date().getFullYear()} CinemaPlus. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;