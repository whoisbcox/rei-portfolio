import { Property } from '../hooks/useProperties'
import { Box, Heading, Image } from '@chakra-ui/react'
import PlatformIconList from './PlatformIconList'

interface Props {
  property: Property
}

const PropertyCard = ({ property }: Props) => {
  return (
    <Box>
      <Image src={property.background_image} borderRadius={5}/>
      <Heading mt={2} fontSize={'lg'}>{property.title}</Heading>
      <PlatformIconList platforms={property.platforms}/>
    </Box>
  )
}

export default PropertyCard