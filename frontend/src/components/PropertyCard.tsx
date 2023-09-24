import { Property } from '../hooks/useProperties'
import { Box, HStack, Heading, Image } from '@chakra-ui/react'
import PlatformIconList from './PlatformIconList'
import DaysBooked from './DaysBooked'

interface Props {
  property: Property
}

const PropertyCard = ({ property }: Props) => {
  return (
    <Box width='300px'>
      <Image src={property.background_image} borderRadius={5}/>
      <Heading mt={2} fontSize={'lg'}>{property.title}</Heading>
      <HStack justifyContent='space-between'>
        <PlatformIconList platforms={property.platforms}/>
        <DaysBooked days_booked={property.days_booked} />
      </HStack>
    </Box>
  )
}

export default PropertyCard