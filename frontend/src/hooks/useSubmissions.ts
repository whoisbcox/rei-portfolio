import APIClient from '../services/api-client';
import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import { Property } from './useProperties';

const apiClient = new APIClient<Submission[]>('/api/submit-form');

export interface Submission {
  _id: string;
  property: Property;
  name: string;
  email: string;
  start_date: string;
  end_date: string;
}

const useSubmissions = (userId?: string | null) => useQuery({
  queryKey: ['submissions'],
  queryFn: () => apiClient.getAll({ params: { user: userId } })
})

export default useSubmissions;