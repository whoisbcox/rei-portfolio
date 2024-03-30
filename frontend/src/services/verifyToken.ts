import axios from 'axios'
import { User } from '../hooks/useUsers';

export const verifyToken = async (token: string): Promise<User> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/me`, {
      headers: {
        'x-auth-token': token,
      }
    });
    return response.data;
  } catch(error) {
    throw new Error('Invalid token');
  }
};