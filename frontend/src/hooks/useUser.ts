import { useQuery } from '@tanstack/react-query'
import APIClient from '../services/api-client'
import { User } from './useUsers'

const apiClient = new APIClient<User>('/api/users/me');

const useUsers = (id?: string | null, token?: string | null) => useQuery({
  queryKey: ['user', id],
  queryFn: () => apiClient.getAll({
    headers: {
      'x-auth-token': token
    }
  })
});

export default useUsers