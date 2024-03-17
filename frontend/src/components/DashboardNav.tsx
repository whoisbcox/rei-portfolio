import { Box, HStack, Icon,  List, ListItem } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaHouseChimney, FaTableList } from 'react-icons/fa6'
import { FaInbox, FaUserCog, FaUsers } from 'react-icons/fa'



const DashboardNav = () => {
  const navLinks = [
    {
      path: '/dashboard/listings/new',
      label: 'Add New Listing',
      icon: <Icon as={FaHouseChimney} />
    },
    {
      path: '/dashboard/listings',
      label: 'Manage Listings',
      icon: <Icon as={FaTableList} />
    },
    {
      path: '/dashboard/submissions',
      label: 'View Submissions',
      icon: <Icon as={FaInbox} />
    },
    {
      path: '/dashboard/profile',
      label: 'Edit Profile',
      icon: <Icon as={FaUserCog} />
    },
    {
      path: '/dashboard/users',
      label: 'Manage Users',
      icon: <Icon as={FaUsers} />
    },
  ];
  return (
    <List>
      {navLinks.map((navLink, index) => (
        <ListItem key={index} paddingBottom={2} columnGap={3}>
          <Link to={navLink.path}>
            <HStack
              padding={4}
              border="1px"
              borderColor="green.400"
              borderRadius={5}
              _dark={{
                borderColor: 'gray.600',
                _hover: {borderColor: 'green.400'}
              }}
              _hover={{
                borderColor: 'green.400'
              }}
            >
              {navLink.icon}
                <Box ml={1}>{navLink.label}</Box>
            </HStack>
          </Link>
        </ListItem>
      ))}
    </List>
  )
}

export default DashboardNav