import { Heading } from '@chakra-ui/react'
import usePropertyType from '../hooks/usePropertyType'
import usePropertyQueryStore from '../store'

const PropertyHeading = () => {
  const propertyTypeId = usePropertyQueryStore(s => s.propertyQuery.propertyTypeId);
  const propertyType = usePropertyType(propertyTypeId);
  const heading = `${propertyType?.name || 'All Listings'}`;
  return (
    <Heading as="h1" marginTop={4}>{heading}</Heading>
  )
}

export default PropertyHeading