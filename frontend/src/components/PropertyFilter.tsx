import { Box, HStack, Select, Text } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'

export interface FilterSettings {
  min_bedrooms: string,
  max_bedrooms: string,
  min_bathrooms: string,
  max_bathrooms: string,
}

interface Props {
  filterSettings: FilterSettings;
  updateFilterSettings: (newFilterSettings: FilterSettings) => void;
}

const PropertyFilter = ({ filterSettings, updateFilterSettings }: Props) => {
  const rooms = [1, 2, 3, 4, 5];
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target;
    const newFilterSettings = {
      ...filterSettings,
      [name]: value,
    }

    updateFilterSettings(newFilterSettings);
  };

  return (
    <HStack paddingLeft={'10px'}>
      <Box>
        <Text>Bedrooms</Text>
        <HStack>
          <Select placeholder='No min' icon={<BsChevronDown />} id='min_bedrooms' name='min_bedrooms' value={filterSettings.min_bedrooms} onChange={handleSelectChange}>
            {rooms.map(room => <option key={room} value={room}>{room}</option>)}
          </Select>
          <Select placeholder='No max' icon={<BsChevronDown />} id='max_bedrooms' name='max_bedrooms' value={filterSettings.max_bedrooms} onChange={handleSelectChange}>
            {rooms.map(room => <option key={room} value={room}>{room}</option>)}
          </Select>
        </HStack>
      </Box>
      <Box>
        <Text>Bathrooms</Text>
        <HStack>
          <Select placeholder='No min' icon={<BsChevronDown />} id='min_bathrooms' name='min_bathrooms' value={filterSettings.min_bathrooms} onChange={handleSelectChange}>
            {rooms.map(room => <option key={room} value={room}>{room}</option>)}
          </Select>
          <Select placeholder='No max' icon={<BsChevronDown />} id='max_bathrooms' name='max_bathrooms' value={filterSettings.max_bathrooms} onChange={handleSelectChange}>
            {rooms.map(room => <option key={room} value={room}>{room}</option>)}
          </Select>
        </HStack>
      </Box>
    </HStack>
  )
}

export default PropertyFilter
