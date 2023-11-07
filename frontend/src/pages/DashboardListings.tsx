import { Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const DashboardListings = () => {
  return (
    <Link to={'/dashboard/listings/new'}>
      <Button variant='outline' colorScheme='green'>Add New</Button>
    </Link>
  )
}

export default DashboardListings