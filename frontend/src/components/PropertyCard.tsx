import { Property } from '../hooks/useProperties'
import { AspectRatio, Box, HStack, Heading, Image, Text } from '@chakra-ui/react'
import PlatformIconList from './PlatformIconList'
import DaysBooked from './DaysBooked'
import { Link } from 'react-router-dom'
import { toTitleCase } from '../utils'

interface Props {
  property: Property
}

const PropertyCard = ({ property }: Props) => {
  return (
    <Box paddingBottom={6}>
        <Link to={`/properties/${property._id}`} >
          <AspectRatio maxW='100%' ratio={4 / 3}>
            <Image
              src={property.featured_image_url}
              width='100%'
              objectFit='cover'
              borderRadius={5}
              transition='box-shadow .25s ease'
              _hover={{
                boxShadow: 'rgba(0,0,0,1) 0px 3px 10px -5px'
              }}
            />
          </AspectRatio>
        </Link>
      <Heading mt={2} fontSize={'lg'} _hover={{
        color: 'green.400',
        transition: 'color .25s ease'
      }}>
        <Link to={`/properties/${property._id}`} >
          {toTitleCase(property.address.city)}, {property.address.state.toUpperCase()}
        </Link>
      </Heading>
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