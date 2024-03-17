import React from 'react'
import { useAuth } from '../hooks/useAuth'

interface MiddlewareProps {
  element: React.ReactElement;
}

export const AuthMiddleware: React.FC<MiddlewareProps> = ({ element, ...rest }) => {
  useAuth();

  return React.cloneElement(element, { ...rest });
};