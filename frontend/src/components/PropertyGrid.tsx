import { SimpleGrid, Text } from '@chakra-ui/react';
import useProperties from '../hooks/useProperties';
import Property from './PropertyCard';
import PropertyCardSkeleton from './PropertyCardSkeleton';

const PropertyGrid = () => {
  const {data, error, isLoading} = useProperties();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  
  return (
    <>
    {error && <Text>{error}</Text>}
    <SimpleGrid columns={{sm: 1, md: 2, lg:3, xl:4 }} padding='10px' spacing={3}>
      {isLoading && skeletons.map(skeleton => <PropertyCardSkeleton key={skeleton} />)}
      {data.map(property => <Property key={property.id} property={property} />)}
    </SimpleGrid>
    </>
  )
}

export default PropertyGrid