import { SimpleGrid, Text } from '@chakra-ui/react';
import useProperties from '../hooks/useProperties';
import Property from './PropertyCard';

const PropertyGrid = () => {
  const {properties, error} = useProperties();
  
  return (
    <>
    {error && <Text>{error}</Text>}
    <SimpleGrid columns={{sm: 1, md: 2, lg:3, xl:4 }} padding='10px' spacing={10}>
      {properties.map(property => <Property key={property.id} property={property} />)}
    </SimpleGrid>
    </>
  )
}

export default PropertyGrid