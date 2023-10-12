import { Property } from '../hooks/useProperties'
import { Box, HStack, Heading, Image, Text } from '@chakra-ui/react'
import PlatformIconList from './PlatformIconList'
import DaysBooked from './DaysBooked'

interface Props {
  property: Property
}

const PropertyCard = ({ property }: Props) => {
  return (
    <Box>
      <Image src={property.background_image} width='100%' borderRadius={5}/>
      <Heading mt={2} fontSize={'lg'}>{property.name}</Heading>
      <HStack>
        <Text>{property.bedrooms} Bed</Text>
        <Text>{property.bathrooms} Bath</Text>
      </HStack>
      <HStack justifyContent='space-between'>
        <PlatformIconList platforms={property.platforms}/>
        <DaysBooked days_booked={property.days_booked} />
      </HStack>
    </Box>
  )
}

export default PropertyCard