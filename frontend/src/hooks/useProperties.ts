import { useQuery, useQueryClient } from '@tanstack/react-query';
import APIClient from '../services/api-client';
import usePropertyQueryStore from '../store';

const apiClient = new APIClient<Property>('/api/properties');

export interface Platform {
  _id: number;
  id: number;
  name: string;
  slug: string;
}

export interface Property {
    _id: string;
    name: string;
    slug: string;
    description: string;
    address: {
      street_1: string;
      street_2: string;
      city: string;
      state: string;
      zip: string;
    };
    featured_image: string;
    featured_image_url: string;
    platforms: Platform[];
    days_booked: number;
    bedrooms: number;
    bathrooms: number;
    propertyTypes: string;
}

const useProperties = () => {
  const queryClient = useQueryClient();
  
  const propertyQuery = usePropertyQueryStore(s => s.propertyQuery);
  const minBedrooms = propertyQuery.filterSettings?.min_bedrooms !== '' ? propertyQuery.filterSettings?.min_bedrooms : null;
  const maxBedrooms = propertyQuery.filterSettings?.max_bedrooms !== '' ? propertyQuery.filterSettings?.max_bedrooms : null;
  const minBathrooms = propertyQuery.filterSettings?.min_bathrooms !== '' ? propertyQuery.filterSettings?.min_bathrooms : null;
  const maxBathrooms = propertyQuery.filterSettings?.max_bathrooms !== '' ? propertyQuery.filterSettings?.max_bathrooms : null;

  const { isLoading, error, data } = useQuery({
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
  
  const deleteProperty = async (id: string) => {
    try {
      await apiClient.delete(id);
      // Invalidate the query for 'properties' after successful deletion
      queryClient.invalidateQueries(['properties']);
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };
  
  return { isLoading, error, data, deleteProperty };
}
export default useProperties;