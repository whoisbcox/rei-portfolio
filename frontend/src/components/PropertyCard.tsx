import { Property } from '../hooks/useProperties'
import { Card, CardBody, Heading, Image } from '@chakra-ui/react'

interface Props {
  property: Property
}

const PropertyCard = ({ property }: Props) => {
  return (
    <Card borderRadius={0}>
      <Image src={property.background_image}/>
      <CardBody>
        <Heading fontSize={'xl'}>{property.title}</Heading>
      </CardBody>
    </Card>
  )
}

export default PropertyCard