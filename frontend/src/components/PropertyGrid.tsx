import { SimpleGrid, Text } from '@chakra-ui/react';
import useProperties from '../hooks/useProperties';
import PropertyCard from './PropertyCard';
import PropertyCardSkeleton from './PropertyCardSkeleton';

const PropertyGrid = () => {
  const {data, error, isLoading} = useProperties();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  
  if (error) return <Text padding='10px'>{error.message}</Text>;
  
  if (!data) return <Text padding='10px'>No matches found.</Text>;

  return (
    <SimpleGrid columns={{sm: 1, md: 2, lg:3, xl:4 }} padding='10px' spacing={4}>
      {isLoading && skeletons.map(skeleton => <PropertyCardSkeleton key={skeleton} />)}
      {Object.values(data).map(property => <PropertyCard key={property._id} property={property} />)}
    </SimpleGrid>
  )
}

export default PropertyGrid