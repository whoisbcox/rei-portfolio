import apiClient from '../services/api-client';
import { useQuery } from '@tanstack/react-query';
import { FetchResponse } from '../services/api-client';

export interface PropertyType {
  id: number;
  name: string;
}

const usePropertyTypes = () => useQuery({
  queryKey: ['propertyTypes'],
  queryFn: () =>
    apiClient.get<FetchResponse<PropertyType>>('/api/property-types').then(res => res.data),
  staleTime: 24 * 60 * 60 * 1000, //24h

})

export default usePropertyTypes;