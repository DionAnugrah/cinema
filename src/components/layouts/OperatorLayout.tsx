import React, { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Calendar,
  Ticket,
  BarChart3,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

interface OperatorLayoutProps {
  children: React.ReactNode;
}

const OperatorLayout: React.FC<OperatorLayoutProps> = ({ children }) => {
  const { user, logout, isAuthorized } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect if not authorized
  if (!isAuthorized(['operator'])) {
    return <Navigate to="/login" />;
  }

  const navigationItems = [
    { name: 'Dashboard', path: '/operator', icon: <BarChart3 size={20} /> },
    { name: 'Schedules', path: '/operator/schedules', icon: <Calendar size={20} /> },
    { name: 'Ticket Sales', path: '/operator/tickets', icon: <Ticket size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 z-20 m-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-white dark:bg-gray-800 shadow"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition duration-200 ease-in-out lg:relative z-10 w-64 bg-emerald-800 text-white`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-center mb-8">
            <Ticket className="mr-2" size={24} />
            <h1 className="text-2xl font-bold">CinemaOps</h1>
          </div>

          <nav className="flex-grow">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-emerald-700'
                        : 'hover:bg-emerald-700'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto">
            <div className="border-t border-emerald-700 pt-4">
              <div className="px-4 py-2 text-sm">
                <p className="text-emerald-300">Logged in as</p>
                <p className="font-medium">{user?.name}</p>
              </div>
              <button
                onClick={logout}
                className="w-full mt-2 flex items-center px-4 py-3 rounded-lg text-emerald-200 hover:bg-emerald-700 transition-colors"
              >
                <LogOut size={18} className="mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main content header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {navigationItems.find((item) => item.path === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default OperatorLayout;