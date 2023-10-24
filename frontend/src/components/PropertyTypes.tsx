import { Box, Flex, Heading, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import usePropertyTypes, { PropertyType } from "../hooks/usePropertyTypes"
import { IconType } from "react-icons";
import { SiHomeassistantcommunitystore } from "react-icons/si"
import { FaCampground, FaHome, FaRegBuilding, FaStethoscope, FaUmbrellaBeach } from "react-icons/fa"
import { FaSignHanging } from "react-icons/fa6"
import { MdApartment } from "react-icons/md"

interface Props {
  onSelectPropertyType: (propertyType: PropertyType) => void;
  selectedPropertyType: PropertyType | null;
}

const PropertyTypes = ({ selectedPropertyType, onSelectPropertyType }: Props) => {
  const { data, isLoading, error } = usePropertyTypes();
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
      <Heading fontSize='2xl' marginY={2}>Property Types</Heading>
      <Flex paddingBottom={2} columnGap={3}>
        {data?.results.map((propertyType: PropertyType) => (
          <Box
            key={propertyType.id}
            fontSize='xs'
            as='button'
            border='1px'
            borderColor={propertyType.id == selectedPropertyType?.id ? 'green.400': 'gray.200'}
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
            onClick={() => onSelectPropertyType(propertyType)}
          >
            <Stack>
              <Icon display='block' marginX='auto' as={iconMap[propertyType.id]} boxSize={5} color='gray.500' />
              <Text display='block' width='100%'>{propertyType.name}</Text>
            </Stack>
          </Box>
        ))}
      </Flex>
    </>
  )
}

export default PropertyTypes