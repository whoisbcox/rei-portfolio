import { FilterSettings } from '../components/PropertyFilter';
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
  bedrooms: number;
  bathrooms: number;
}

const useProperties = (selectedPropertyType: PropertyType | null, filterSettings: FilterSettings) => {
  const minBedrooms = filterSettings.min_bedrooms !== '' ? filterSettings.min_bedrooms : null;
  const maxBedrooms = filterSettings.max_bedrooms !== '' ? filterSettings.max_bedrooms : null;
  const minBathrooms = filterSettings.min_bathrooms !== '' ? filterSettings.min_bathrooms : null;
  const maxBathrooms = filterSettings.max_bathrooms !== '' ? filterSettings.max_bathrooms : null;

  return useData<Property>('/api/properties', {
    params: {
      propertyTypes: selectedPropertyType?.id,
      min_bedrooms: minBedrooms,
      max_bedrooms: maxBedrooms,
      min_bathrooms: minBathrooms,
      max_bathrooms: maxBathrooms
    }}, [
      selectedPropertyType?.id,
      minBedrooms,
      maxBedrooms,
      minBathrooms,
      maxBathrooms
    ])
  }
export default useProperties;