import useData from './useData';

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

const useProperties = () => useData<Property>('/api/properties');

export default useProperties;