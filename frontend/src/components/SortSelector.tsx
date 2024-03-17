import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import usePropertyQueryStore from '../store'

const SortSelector = () => {
  const sortOrders = [
    { value: '', label: 'Relevance' },
    { value: 'availability', label: 'Availability' },
    { value: 'name', label: 'Name' },
  ];

  const sortOrder = usePropertyQueryStore(s => s.propertyQuery.sortOrder);
  const setSortOrder = usePropertyQueryStore(s => s.sortOrder);

  const currentSortOrder = sortOrders.find(order => order.value === sortOrder);
  return (
    <Box>
      <Text>Sort</Text>
      <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown />} variant="outline">
          Order by: {currentSortOrder?.label || 'Relevance'}
        </MenuButton>
        <MenuList>
          {sortOrders.map(order => <MenuItem onClick={() => setSortOrder(order.value)} key={order.value} value={order.value}>{order.label}</MenuItem>)}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default SortSelector