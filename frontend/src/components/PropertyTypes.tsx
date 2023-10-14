import { Button, HStack, Icon, List, ListItem, Spinner } from "@chakra-ui/react";
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
    <List>
      {data.map((propertyType) => (
        <ListItem key={propertyType.id} paddingY='10px'>
          <HStack>
            <Icon as={iconMap[propertyType.id]} boxSize={6} color='gray.500' />
            <Button fontWeight={propertyType.id == selectedPropertyType?.id ? 'bold': 'normal'} onClick={() => onSelectPropertyType(propertyType)} fontSize='lg' variant='link'>
              {propertyType.name}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  )
}

export default PropertyTypes