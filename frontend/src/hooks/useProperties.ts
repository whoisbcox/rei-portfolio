import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Property {
  id: number;
  title: string;
}

interface FetchPropertiesResponse {
  count: number;
  results: Property[];
}

const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<FetchPropertiesResponse>('/api/properties', { signal: controller.signal })
      .then(res => setProperties(res.data.results))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message)
      });

    return () => controller.abort();
  }, []);

  return { properties, error };
}

export default useProperties;