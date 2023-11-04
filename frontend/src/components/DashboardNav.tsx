import { List, ListItem } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const DashboardNav = () => {
  return (
    <List>
      <ListItem>
        <Link to="/dashboard/listings">Listings</Link>
      </ListItem>
      <ListItem>
        <Link to="/dashboard/profile">Profile</Link>
      </ListItem>
      <ListItem>
        <Link to="/dashboard/users">Users</Link>
      </ListItem>
    </List>
  )
}

export default DashboardNav