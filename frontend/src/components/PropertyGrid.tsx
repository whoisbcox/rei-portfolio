import { Text } from '@chakra-ui/react';
import useProperties from '../hooks/useProperties';

const PropertyGrid = () => {
  const {properties, error} = useProperties();
  
  return (
    <>
    {error && <Text>{error}</Text>}
    <ul>
      {properties.map(property => <li key={property.id}>{property.title}</li>)}
    </ul>
    </>
  )
}

export default PropertyGrid