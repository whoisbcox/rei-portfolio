import usePropertyTypes from "../hooks/usePropertyTypes"


const PropertyTypes = () => {
  const { propertyTypes } = usePropertyTypes();
  return (
    <ul>
      {propertyTypes.map(propertyType => <li key={propertyType.id}>{propertyType.name}</li>)}
    </ul>
  )
}

export default PropertyTypes