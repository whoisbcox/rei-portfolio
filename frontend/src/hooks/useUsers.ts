import { InvalidateQueryFilters, useQuery, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient<User[]>('/api/users');

export interface User {
  _id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

const useUsers = (token: string |  null) => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: () => apiClient.getAll({
      headers: {
        'x-auth-token': token
      }
    })
  });

  const deleteUser = (id: number | string) => {
    try {
      apiClient.delete(id, {
        headers: {
          'x-auth-token': jwt,
          'x-user-role': 'admin'
        }
      });
      // Invalidate the query for 'user' after successful deletion
      queryClient.invalidateQueries(['user', id] as InvalidateQueryFilters);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return { isLoading, error, data, deleteUser};
}
export default useUsers;