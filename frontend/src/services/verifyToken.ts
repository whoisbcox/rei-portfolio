import axios from "axios";

export const verifyToken = async (token: string): Promise<string> => {
  try {
    const response = await axios.get('http://localhost:8080/api/users/me', {
      headers: {
        'x-auth-token': token,
      }
    });
    return response.data._id;
  } catch(error) {
    throw new Error('Invalid token');
  }
};