import { useQuery } from '@tanstack/react-query';
import { PropertyQuery } from '../App';
import APIClient from '../services/api-client';

const apiClient = new APIClient<Property[]>('/api/properties');

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
  
  return  useQuery({
    queryKey: ['properties', propertyQuery],
    queryFn: () =>
      apiClient
        .getAll({
          params: {
            propertyTypes: propertyQuery.propertyTypeId,
            min_bedrooms: minBedrooms,
            max_bedrooms: maxBedrooms,
            min_bathrooms: minBathrooms,
            max_bathrooms: maxBathrooms, 
            ordering: propertyQuery.sortOrder,
            search: propertyQuery.searchText
          },
        }),
  })
}
export default useProperties;