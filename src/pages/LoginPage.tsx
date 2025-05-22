import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Film } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        // Redirect based on user role
        const storedUser = JSON.parse(localStorage.getItem('cinemaUser') || '{}');
        switch (storedUser.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'operator':
            navigate('/operator');
            break;
          default:
            navigate('/');
            break;
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div>
          <div className="flex justify-center">
            <Film className="text-red-600" size={48} />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            CinemaPlus Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account to access the cinema management system
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
              <div className="flex">
                <div className="text-sm text-red-700 dark:text-red-400">
                  {error}
                </div>
              </div>
            </div>
          )}
          
          <Input
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
        
        <div className="mt-6">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Demo accounts:
          </p>
          <div className="mt-2 grid grid-cols-1 gap-2 text-xs">
            <div className="rounded-md bg-gray-100 dark:bg-gray-700 p-2 font-mono">
              admin@cinema.com / admin123
            </div>
            <div className="rounded-md bg-gray-100 dark:bg-gray-700 p-2 font-mono">
              operator@cinema.com / operator123
            </div>
            <div className="rounded-md bg-gray-100 dark:bg-gray-700 p-2 font-mono">
              customer@example.com / customer123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;