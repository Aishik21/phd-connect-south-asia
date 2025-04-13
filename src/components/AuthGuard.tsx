
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type AuthGuardProps = {
  children: React.ReactNode;
  requireAuth?: boolean;
};

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-academic-600"></div>
      </div>
    );
  }

  // If we require authentication and user is not logged in
  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  // If we require the user to be logged out (e.g., login/signup pages) but they're logged in
  if (!requireAuth && user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
