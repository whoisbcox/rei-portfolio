import { Button, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import useProperties from "../hooks/useProperties";
import { FaEye, FaPencil, FaTrashCan } from "react-icons/fa6";


const DashboardListings = () => {
  const {data, error} = useProperties();
  
  if (error) return <Text padding='10px'>{error.message}</Text>;
  
  if (!data) return <Text padding='10px'>No matches found.</Text>;
  
  return (
    <>
      <Link to={'/dashboard/listings/new'}>
        <Button variant='outline' colorScheme='green'>Add New</Button>
      </Link>
      <TableContainer>
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>ID</Th>
              <Th>Bed</Th>
              <Th>Bath</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.values(data).map(property =>(
              <Tr key={property._id}>
                <Td>{property.name}</Td>
                <Td>{property._id}</Td>
                <Td>{property.bedrooms}</Td>
                <Td>{property.bathrooms}</Td>
                <Td>
                  <Link to={`/dashboard/listings/${property._id}`}>
                    <Button variant="ghost" colorScheme="green"><FaPencil /></Button>
                  </Link>
                  <Link to={`/properties/${property._id}`} target="_blank">
                    <Button variant="ghost" colorScheme="green"><FaEye /></Button>
                  </Link>
                  <Button variant="ghost" colorScheme="green"><FaTrashCan /></Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default DashboardListings