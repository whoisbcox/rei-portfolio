import { Box, Flex, Heading, Icon, Spinner, Stack, Text } from '@chakra-ui/react'
import usePropertyTypes, { PropertyType } from '../hooks/usePropertyTypes'
import { IconType } from 'react-icons'
import { SiHomeassistantcommunitystore } from 'react-icons/si'
import { FaCampground, FaHome, FaRegBuilding, FaStethoscope, FaUmbrellaBeach } from 'react-icons/fa'
import { FaSignHanging } from 'react-icons/fa6'
import { MdApartment } from 'react-icons/md'
import usePropertyQueryStore from '../store'

const PropertyTypes = () => {
  const { data, isLoading, error } = usePropertyTypes();
  // const propertyTypeId = usePropertyQueryStore(s => s.propertyQuery.propertyTypeId);
  const setPropertyTypeId = usePropertyQueryStore(s => s.setPropertyTypeId);
  const iconMap: {[key:number]: IconType } = {
    0:FaHome,
    1:MdApartment,
    2:FaStethoscope,
    3:FaUmbrellaBeach,
    4:FaSignHanging,
    5:SiHomeassistantcommunitystore,
    6:FaRegBuilding,
    7:FaCampground,
  }
  
  if (error) return null;
  if (isLoading) return <Spinner />;
  return (
    <>
      <Heading fontSize="2xl" marginY={2}>Property Types</Heading>
      <Flex paddingBottom={2} columnGap={3}>
        {data?.map((propertyType: PropertyType) => (
          <Box
            key={propertyType._id}
            fontSize="xs"
            as="button"
            border="1px"
            borderColor="green.400"
            borderRadius={5}
            paddingY={3}
            paddingX={4}
            _dark={{
              borderColor: 'gray.600',
              _hover: {borderColor: 'green.400'}
            }}
            _hover={{
              borderColor: 'green.400'
            }
            }
            onClick={() => setPropertyTypeId('All Listings' !== propertyType.name ? propertyType._id : undefined)}
          >
            <Stack>
              <Icon display="block" marginX="auto" as={iconMap[propertyType.icon]} boxSize={5} color="gray.500" />
              <Text display="block" width="100%">{propertyType.name}</Text>
            </Stack>
          </Box>
        ))}
      </Flex>
    </>
  )
}

export default PropertyTypes