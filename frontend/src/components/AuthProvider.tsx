import React, { createContext, useEffect, useState } from 'react';
import { verifyToken } from '../services/verifyToken'; // Assuming you have an API function to verify tokens
import { useNavigate } from 'react-router-dom';

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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState({ isAuthenticated: false, userId: null });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) return navigate('/login'); 
      try {
        const userId: string = await verifyToken(token);
        setAuthState({ isAuthenticated: true, userId });
      } catch (error) {
        console.error('Error verifying token:', error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

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
  console.log(authState);
  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
