import { InvalidateQueryFilters, QueryKey, useQuery, useQueryClient } from '@tanstack/react-query'
import APIClient from '../services/api-client'
import usePropertyQueryStore from '../store'
import { PropertyType } from './usePropertyTypes'
import { User } from './useUsers'

const apiClient = new APIClient<Property>('/api/properties');
const jwt = localStorage.getItem('jwt');

export interface Platform {
  _id: number;
  id: number;
  name: string;
  slug: string;
}

export interface Property {
    _id: string;
    user: User;
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
    propertyTypes: PropertyType;
}

const useProperties = (userId?: string | null) => {
  const queryClient = useQueryClient();
  
  const propertyQuery = usePropertyQueryStore(s => s.propertyQuery);
  const minBedrooms = propertyQuery.filterSettings?.min_bedrooms !== '' ? propertyQuery.filterSettings?.min_bedrooms : null;
  const maxBedrooms = propertyQuery.filterSettings?.max_bedrooms !== '' ? propertyQuery.filterSettings?.max_bedrooms : null;
  const minBathrooms = propertyQuery.filterSettings?.min_bathrooms !== '' ? propertyQuery.filterSettings?.min_bathrooms : null;
  const maxBathrooms = propertyQuery.filterSettings?.max_bathrooms !== '' ? propertyQuery.filterSettings?.max_bathrooms : null;
  
  const queryKey: QueryKey = userId ? ['properties', propertyQuery, userId] : ['properties', propertyQuery];
  
  const { isLoading, error, data } = useQuery({
    queryKey: queryKey,
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
            search: propertyQuery.searchText,
            user: userId
          },
        }),
  })
  
  const deleteProperty = async (id: string) => {
    try {
      await apiClient.delete(id, {
        headers: {
          'x-auth-token': jwt
        },
      });
      // Invalidate the query for 'properties' after successful deletion
      queryClient.invalidateQueries(queryKey as InvalidateQueryFilters);
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };
  
  return { isLoading, error, data, deleteProperty };
}
export default useProperties;