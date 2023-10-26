import { Heading } from '@chakra-ui/react'
import { PropertyQuery } from '../App'
import usePropertyTypes from '../hooks/usePropertyTypes';

interface Props {
  propertyQuery: PropertyQuery;
}

const PropertyHeading = ({ propertyQuery }: Props) => {
  const { data: propertyTypes } = usePropertyTypes();
  const propertyType = propertyTypes?.results.find(p =>  p.id === propertyQuery.propertyTypeId);
  const heading = `${propertyType?.name || 'All Listings'}`;
  return (
    <Heading as='h1' marginTop={4}>{heading}</Heading>
  )
}

export default PropertyHeading