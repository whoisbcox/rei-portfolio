import usePropertyTypes from './usePropertyTypes'

const usePropertyType = (id?: number) => {
  const { data: propertyTypes } = usePropertyTypes();
  return propertyTypes?.find(p =>  p._id === id);
}

export default usePropertyType;