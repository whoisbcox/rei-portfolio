import { List, ListItem } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const DashboardNav = () => {
  return (
    <List>
      <ListItem>
        <Link to={'/dashboard/listings/new'}>Add New Listing</Link>
      </ListItem>
      <ListItem>
        <Link to="/dashboard/listings">Manage Listings</Link>
      </ListItem>
      <ListItem>
        <Link to="/dashboard/submissions">View Submissions</Link>
      </ListItem>
      <ListItem>
        <Link to="/dashboard/profile">Edit Profile</Link>
      </ListItem>
      <ListItem>
        <Link to="/dashboard/users">Manage Users</Link>
      </ListItem>
    </List>
  )
}

export default DashboardNav