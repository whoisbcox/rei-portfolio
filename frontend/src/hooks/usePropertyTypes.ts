import { useEffect, useState } from 'react'
import apiClient from '../services/api-client';
import { CanceledError } from 'axios';

interface PropertyType {
  id: number;
  name: string;
}

interface FetchPropertyTypesResponse {
  count: number,
  results: PropertyType[];
}

const usePropertyTypes = () => {
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    
    setLoading(true);
    apiClient
      .get<FetchPropertyTypesResponse>('/api/property-types', { signal: controller.signal })
      .then((res) => {
        setPropertyTypes(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message)
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { propertyTypes, error, isLoading };
}

export default usePropertyTypes;