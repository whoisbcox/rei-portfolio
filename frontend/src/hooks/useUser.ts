import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { User } from "./useUsers";

const apiClient = new APIClient<User>('/api/users/me');
const jwt = localStorage.getItem('jwt');

const useUser = (id: number | string) => useQuery({
  queryKey: ['user', id],
  queryFn: () => apiClient.getAll({
    headers: {
      'x-auth-token': jwt
    }
  })
});

export default useUser;