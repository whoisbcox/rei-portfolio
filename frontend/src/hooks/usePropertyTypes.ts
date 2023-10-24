import APIClient from '../services/api-client';
import { useQuery } from '@tanstack/react-query';

const apiClient = new APIClient<PropertyType[]>('/api/property-types');

export interface PropertyType {
  id: number;
  name: string;
}

const usePropertyTypes = () => useQuery({
  queryKey: ['propertyTypes'],
  queryFn: apiClient.getAll,
  staleTime: 24 * 60 * 60 * 1000, //24h
})

export default usePropertyTypes;