import { Heading } from '@chakra-ui/react'
import { PropertyQuery } from '../App'
import usePropertyType from '../hooks/usePropertyType';

interface Props {
  propertyQuery: PropertyQuery;
}

const PropertyHeading = ({ propertyQuery }: Props) => {
  const propertyType = usePropertyType(propertyQuery.propertyTypeId);
  const heading = `${propertyType?.name || 'All Listings'}`;
  return (
    <Heading as='h1' marginTop={4}>{heading}</Heading>
  )
}

export default PropertyHeading