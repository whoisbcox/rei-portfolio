import { useQuery } from '@tanstack/react-query'
import APIClient from '../services/api-client'
import { Property } from './useProperties'

const apiClient = new APIClient<Property>('/api/properties');

const useProperty = (id: number | string) => useQuery({
  queryKey: ['property', id],
  queryFn: () => apiClient.get(id)
});

export default useProperty