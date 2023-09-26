import { HStack, Icon, List, ListItem, Spinner, Text } from "@chakra-ui/react";
import usePropertyTypes from "../hooks/usePropertyTypes"
import { IconType } from "react-icons";
import { SiHomeassistantcommunitystore } from "react-icons/si"
import { FaCampground, FaHome, FaRegBuilding, FaStethoscope, FaUmbrellaBeach } from "react-icons/fa"
import { FaSignHanging } from "react-icons/fa6"

const PropertyTypes = () => {
  const { data, isLoading, error } = usePropertyTypes();
  const iconMap: {[key:number]: IconType } = {
    1:FaHome,
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
    <List>
      {data.map((propertyType) => (
        <ListItem key={propertyType.id} paddingY='10px'>
          <HStack>
            <Icon as={iconMap[propertyType.id]} boxSize={6} color='gray.500' />
            <Text>
              {propertyType.name}
            </Text>
          </HStack>
        </ListItem>
      ))}
    </List>
  )
}

export default PropertyTypes