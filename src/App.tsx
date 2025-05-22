import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/customer/HomePage';
import BookingPage from './pages/customer/BookingPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import MovieManagement from './pages/admin/MovieManagement';

// A loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
  </div>
);

// Private route component
const PrivateRoute = ({ 
  children, 
  allowedRoles = [] 
}: { 
  children: JSX.Element, 
  allowedRoles?: string[] 
}) => {
  const { isAuthenticated, isAuthorized, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles.length > 0 && !isAuthorized(allowedRoles as any)) {
    // Redirect based on user role
    const storedUser = JSON.parse(localStorage.getItem('cinemaUser') || '{}');
    
    switch (storedUser.role) {
      case 'admin':
        return <Navigate to="/admin" />;
      case 'operator':
        return <Navigate to="/operator" />;
      default:
        return <Navigate to="/" />;
    }
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Customer Routes */}
          <Route 
            path="/" 
            element={<HomePage />} 
          />
          <Route 
            path="/booking/:movieId" 
            element={<PrivateRoute allowedRoles={['customer']}><BookingPage /></PrivateRoute>} 
          />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} 
          />
          <Route 
            path="/admin/movies" 
            element={<PrivateRoute allowedRoles={['admin']}><MovieManagement /></PrivateRoute>} 
          />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;