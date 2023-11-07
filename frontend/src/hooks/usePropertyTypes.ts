import APIClient from '../services/api-client';
import { useQuery } from '@tanstack/react-query';
import ms from 'ms';

const apiClient = new APIClient<PropertyType[]>('/api/property-types');

export interface PropertyType {
  _id: string;
  icon: number;
  name: string;
}

const usePropertyTypes = () => useQuery({
  queryKey: ['propertyTypes'],
  queryFn: apiClient.getAll,
  staleTime: ms('24h')
})

export default usePropertyTypes;