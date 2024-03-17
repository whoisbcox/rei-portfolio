import APIClient from '../services/api-client';
import { useQuery } from '@tanstack/react-query';

const apiClient = new APIClient<PropertyType[]>('/api/property-types');

export interface PropertyType {
  _id: string;
  icon: number;
  name: string;
  name_singular: string;
}

const usePropertyTypes = () => useQuery({
  queryKey: ['propertyTypes'],
  queryFn: apiClient.getAll,
})

export default usePropertyTypes;