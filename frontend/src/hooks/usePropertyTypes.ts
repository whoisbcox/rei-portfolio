import useData from './useData';

export interface PropertyType {
  id: number;
  name: string;
}

const usePropertyTypes = () => useData<PropertyType>('/api/property-types');

export default usePropertyTypes;