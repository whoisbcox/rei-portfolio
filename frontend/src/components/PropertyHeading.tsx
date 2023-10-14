import { Heading } from '@chakra-ui/react'
import { PropertyQuery } from '../App'

interface Props {
  propertyQuery: PropertyQuery;
}

const PropertyHeading = ({ propertyQuery }: Props) => {
  const heading = 'undefined' !== typeof propertyQuery.propertyType?.name ? propertyQuery.propertyType.name: 'All Listings';
  return (
    <Heading as='h1' marginBottom={4}>{heading}</Heading>
  )
}

export default PropertyHeading