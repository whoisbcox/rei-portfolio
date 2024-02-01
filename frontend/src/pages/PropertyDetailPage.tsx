import { useParams } from 'react-router-dom'
import useProperty from '../hooks/useProperty';
import { AspectRatio, Grid, GridItem, Heading, Image, Spinner, Text } from '@chakra-ui/react';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { data: property, isLoading, error } = useProperty(id!);

  if (isLoading) return <Spinner />;

  if (error || !property) throw error;

  const {description, bedrooms, bathrooms } = property;
  const bedroomsText = 1 !== bedrooms? `${bedrooms} bedrooms`: `${bedrooms} bedroom`;
  const bathroomsText = 1 !== bathrooms? `${bathrooms} bathrooms`: `${bathrooms} bathroom`;

  return (
    <Grid
      templateAreas={{
        base: `"hero" "main" "aside"`,
        lg: `"hero hero" "main aside"`
      }}
      templateColumns={{
        base: '1fr',
        lg: '1fr 33.33%'
      }}
      maxW='1200px'
      mx='auto'
    >
      <GridItem area="hero" py={8}>
        <Heading mb={4}>{property.name}</Heading>
        <AspectRatio maxW='100%' minH={{base:'240px', lg:'320px'}} maxH={{base:'400px',lg:'500px'}} height={{base:'50vh',lg:'70vh'}}>
          <Image src={property.featured_image_url} width='100%' objectFit='cover' borderRadius={5}/>
        </AspectRatio>
      </GridItem>
      <GridItem area="main">
        <Heading fontSize={'3xl'}>{description}</Heading>
        <Text>{0 < bedrooms ? bedroomsText: ''} {0 < bathrooms? bathroomsText: ''}</Text>
      </GridItem>
      <GridItem area="aside">[sidebar]</GridItem>
    </Grid>
  )
}

export default PropertyDetailPage