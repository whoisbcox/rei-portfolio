import usePropertyTypes from "../hooks/usePropertyTypes"


const PropertyTypes = () => {
  const { data } = usePropertyTypes();
  return (
    <ul>
      {data.map(propertyType => <li key={propertyType.id}>{propertyType.name}</li>)}
    </ul>
  )
}

export default PropertyTypes