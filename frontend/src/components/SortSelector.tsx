import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'

interface Props {
  onSelectSortOrder: (sortOrder: string) => void;
  sortOrder: string;
}

const SortSelector = ({ onSelectSortOrder, sortOrder }: Props) => {
  const sortOrders = [
    { value: '', label: 'Relevance' },
    { value: 'availability', label: 'Availability' },
    { value: 'name', label: 'Name' },
  ];

  const currentSortOrder = sortOrders.find(order => order.value === sortOrder);
  return (
    <Box>
      <Text>Sort</Text>
      <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown />} variant='outline'>
          Order by: {currentSortOrder?.label || 'Relevance'}
        </MenuButton>
        <MenuList>
          {sortOrders.map(order => <MenuItem onClick={() => onSelectSortOrder(order.value)} key={order.value} value={order.value}>{order.label}</MenuItem>)}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default SortSelector