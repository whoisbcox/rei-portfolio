import { useParams } from 'react-router-dom'
import useProperty from '../hooks/useProperty'
import { AspectRatio, Grid, GridItem, Heading, Image, Spinner, Text, Wrap } from '@chakra-ui/react'
import { toTitleCase } from '../utils'
import RequestTourForm from '../components/RequestTourForm'
import BookingForm from '../components/BookingForm'

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams();
  const { data: property, isLoading, error } = useProperty(id!);
  
  if (isLoading ) return <Spinner />;
  
  if (error || !property ) throw error;
  
  const {description, bedrooms, bathrooms } = property;
  const bedroomsText = 1 !== bedrooms? `${bedrooms} bedrooms`: `${bedrooms} bedroom`;
  const bathroomsText = 1 !== bathrooms? `${bathrooms} bathrooms`: `${bathrooms} bathroom`;
  // const propertyTypeName = property.propertyTypes.name_singular;
  // const isForSale = propertyTypeName.includes("Sale") || propertyTypeName.includes("Long");
  const isForSale = true;
  return (
    <Wrap px={{base: 4, md: 8, lg: 20}} py={{base: 4, lg: 8}}>
      <Grid
        templateAreas={{
          base: `"hero" "main" "aside"`,
          lg: `"hero hero" "main aside"`
        }}
        templateColumns={{
          base: '1fr',
          lg: '1fr 33.33%'
        }}
        w="100%"
        maxW="1440px"
        mx="auto"
      >
        <GridItem area="hero">
          <Heading mb={6}>{property.name}</Heading>
          <AspectRatio maxW="100%" minH={{base:'240px', lg:'320px'}} maxH={{base:'400px',lg:'500px'}} height={{base:'50vh',lg:'70vh'}}>
            <Image src={property.featured_image_url} width="100%" objectFit="cover" borderRadius={5}/>
          </AspectRatio>
        </GridItem>
        <GridItem area="main" py={10} pr={{lg: 10}}>
          <Heading fontSize="2xl" color='green.400'>{property.propertyTypes.name_singular} in {toTitleCase(property.address.city)}, {property.address.state}</Heading>
          <Text fontSize="xl">{0 < bedrooms ? bedroomsText: ''} {0 < bathrooms? bathroomsText: ''}</Text>
          <Text mt={8}>{description}</Text>
        </GridItem>
        <GridItem area="aside" py={10}>
          {isForSale ? (<RequestTourForm propertyId={property._id} />): (<BookingForm propertyId={property._id} />)}
        </GridItem>
      </Grid>
    </Wrap>
  )
}

export default PropertyDetailPage