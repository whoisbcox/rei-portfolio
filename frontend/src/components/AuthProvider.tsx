import React, { createContext, useEffect, useState } from 'react';
import { verifyToken } from '../services/verifyToken'; // Assuming you have an API function to verify tokens
import { useLocation, useNavigate } from 'react-router-dom';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isDashboardRoute = (pathname: string) => {
  const dashboardLayouts = ["/dashboard"];
  return dashboardLayouts.some(layout => pathname.startsWith(layout));
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState({ isAuthenticated: false, userId: null });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        if (isDashboardRoute(location.pathname)) return navigate('/login');
        return;
      } 
      try {
        const userId: string = await verifyToken(token);
        setAuthState({ isAuthenticated: true, userId });
      } catch (error) {
        console.error('Error verifying token:', error);

        if (isDashboardRoute(location.pathname)) return navigate('/login');
      }
    };

    checkAuth();
  }, [location.pathname, navigate]);

  const login = (token: string, userId: string) => {
    localStorage.setItem('jwt', token);
    setAuthState({ isAuthenticated: true, userId });
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setAuthState({ isAuthenticated: false, userId: null });
    navigate('/login');
  };

  const authContextValue: AuthContextType = {
    isAuthenticated: authState.isAuthenticated,
    userId: authState.userId,
    login,
    logout,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
