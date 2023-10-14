import { Box, HStack, Select, Text } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import useMinMaxSelect from '../hooks/useMinMaxSelect';

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

  const createChangeHandler = (
    minMax: 'min' | 'max',
    type: 'bedrooms' | 'bathrooms',
    updateFunction: (value: string) => void
  ) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
  
    // Ensure that the minimum value is less than or equal to the maximum value
    if (minMax === 'min' && parseInt(value, 10) > parseInt(filterSettings[`max_${type}`], 10)) {
      // If the new minimum value is greater than the current maximum, update the maximum value
      const newFilterSettings: FilterSettings = {
        ...filterSettings,
        [`min_${type}`]: value,
        [`max_${type}`]: value,
      };
      updateFunction(value); // Update the minimum value
      updateFilterSettings(newFilterSettings); // Update parent component state
    } else if (minMax === 'max' && parseInt(value, 10) < parseInt(filterSettings[`min_${type}`], 10)) {
      // If the new maximum value is less than the current minimum, update the minimum value
      const newFilterSettings: FilterSettings = {
        ...filterSettings,
        [`min_${type}`]: value,
        [`max_${type}`]: value,
      };
      updateFunction(value); // Update the maximum value
      updateFilterSettings(newFilterSettings); // Update parent component state
    } else {
      // Otherwise, update the corresponding value normally
      const newFilterSettings: FilterSettings = {
        ...filterSettings,
        [`min_${type}`]: minMax === 'min' ? value : filterSettings[`min_${type}`],
        [`max_${type}`]: minMax === 'max' ? value : filterSettings[`max_${type}`],
      };
      updateFunction(value);
      updateFilterSettings(newFilterSettings);
    }
  };

  const {
    minValue: minCount,
    maxValue: maxCount,
    handleMinChange: handleMinBedroomsChange,
    handleMaxChange: handleMaxBedroomsChange,
    options: bedroomOptions,
  } = useMinMaxSelect(filterSettings.min_bedrooms, filterSettings.max_bedrooms, rooms);

  const {
    minValue: minBath,
    maxValue: maxBath,
    handleMinChange: handleMinBathroomsChange,
    handleMaxChange: handleMaxBathroomsChange,
    options: bathroomOptions,
  } = useMinMaxSelect(filterSettings.min_bathrooms, filterSettings.max_bathrooms, rooms);

  return (
    <HStack>
      <Box>
        <Text>Bedrooms</Text>
        <HStack>
          <Select
            placeholder='No min'
            icon={<BsChevronDown />}
            id='min_bedrooms'
            name='min_bedrooms'
            value={minCount}
            onChange={createChangeHandler('min', 'bedrooms', handleMinBedroomsChange)}
          >
            {bedroomOptions.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </Select>
          <Select
            placeholder='No max'
            icon={<BsChevronDown />}
            id='max_bedrooms'
            name='max_bedrooms'
            value={maxCount}
            onChange={createChangeHandler('max', 'bedrooms', handleMaxBedroomsChange)}
          >
            {bedroomOptions.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </Select>
        </HStack>
      </Box>
      <Box>
        <Text>Bathrooms</Text>
        <HStack>
          <Select
            placeholder='No min'
            icon={<BsChevronDown />}
            id='min_bathrooms'
            name='min_bathrooms'
            value={minBath}
            onChange={createChangeHandler('min', 'bathrooms', handleMinBathroomsChange)}
          >
            {bathroomOptions.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </Select>
          <Select
            placeholder='No max'
            icon={<BsChevronDown />}
            id='max_bathrooms'
            name='max_bathrooms'
            value={maxBath}
            onChange={createChangeHandler('max', 'bathrooms', handleMaxBathroomsChange)}
          >
            {bathroomOptions.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </Select>
        </HStack>
      </Box>
    </HStack>
  )
}

export default PropertyFilter
