import usePropertyTypes from "./usePropertyTypes";

const usePropertyType = (id?: number) => {
  const { data: propertyTypes } = usePropertyTypes();
  return propertyTypes?.results.find(p =>  p.id === id);
}

export default usePropertyType;