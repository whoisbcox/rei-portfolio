import useData from './useData';
import { PropertyType } from './usePropertyTypes';

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Property {
  id: number;
  title: string;
  background_image: string;
  platforms: Platform[];
  days_booked: number;
}

const useProperties = (selectedPropertyType: PropertyType | null) =>
  useData<Property>('/api/properties', { params: { propertyTypes: selectedPropertyType?.id}}, [selectedPropertyType?.id]);

export default useProperties;