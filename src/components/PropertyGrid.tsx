import { useEffect, useState } from 'react'
import apiClient from '../services/api-client';
import { Text } from '@chakra-ui/react';

interface Property {
  id: number;
  title: string;
}

interface FetchPropertiesResponse {
  count: number; 
  results: Property[]
}

const PropertyGrid = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient.get<FetchPropertiesResponse>('/properties')
      .then(res => {
        console.log(res.data);
        setProperties(res.data.results);
      })
      .catch(err => setError(err.message));
  });
  
  return (
    <>
    {error && <Text>{error}</Text>}
    <ul>
      {properties.map(property => <li key={property.id}>{property.title}</li>)}
    </ul>
    </>
  )
}

export default PropertyGrid