import { useQuery } from '@tanstack/react-query';
import { PropertyQuery } from '../App';
import apiClient from '../services/api-client';
import { FetchResponse } from '../services/api-client';

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Property {
  id: number;
  name: string;
  background_image: string;
  platforms: Platform[];
  days_booked: number;
  bedrooms: number;
  bathrooms: number;
}

const useProperties = (propertyQuery: PropertyQuery) => {
  const minBedrooms = propertyQuery.filterSettings?.min_bedrooms !== '' ? propertyQuery.filterSettings?.min_bedrooms : null;
  const maxBedrooms = propertyQuery.filterSettings?.max_bedrooms !== '' ? propertyQuery.filterSettings?.max_bedrooms : null;
  const minBathrooms = propertyQuery.filterSettings?.min_bathrooms !== '' ? propertyQuery.filterSettings?.min_bathrooms : null;
  const maxBathrooms = propertyQuery.filterSettings?.max_bathrooms !== '' ? propertyQuery.filterSettings?.max_bathrooms : null;
  
  return  useQuery<FetchResponse<Property>, Error>({
    queryKey: ['properties', propertyQuery],
    queryFn: () =>
      apiClient
        .get<FetchResponse<Property>>('/api/properties', {
          params: {
            propertyTypes: propertyQuery.propertyType?.id,
            min_bedrooms: minBedrooms,
            max_bedrooms: maxBedrooms,
            min_bathrooms: minBathrooms,
            max_bathrooms: maxBathrooms, 
            ordering: propertyQuery.sortOrder,
            search: propertyQuery.searchText
          }
        })
        .then(res => res.data),
  })
}
export default useProperties;