import { Button, Flex, Heading, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import useProperties, { Property } from "../hooks/useProperties";
import { FaEye, FaPencil, FaTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";


const DashboardListings = () => {
  const { userId } = useAuth();
  const [data, setData] = useState<Property[]>([]);
  const { data: fetchedData, error, deleteProperty } = useProperties(userId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (fetchedData) {
      const propertiesArray = Object.values(fetchedData);
      setData(propertiesArray);
    }
  }, [fetchedData]);
  
  if (error) return <Text padding='10px'>{error.message}</Text>;
  
  if (!data) return <Text padding='10px'>No matches found.</Text>;

  const handleDelete = async (id: string) => {
    const newData = data.filter(property => property._id !== id);
    setData(newData);
    await deleteProperty(id);
    onClose();
  };
  
  return (
    <>
      <Flex justify='space-between' mb={8}>
        <Heading>Manage Listings</Heading>
        <Link to={'/dashboard/listings/new'}>
          <Button variant='outline' colorScheme='green'>Add New</Button>
        </Link>
      </Flex>
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
                  <Button variant="ghost" colorScheme="green" onClick={onOpen}><FaTrashCan /></Button>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader mt={4} textAlign={'center'}>Are you sure you want to delete?</ModalHeader>
                      <ModalCloseButton />

                      <ModalFooter justifyContent={'center'}>
                        <Button mr={3} onClick={onClose}>Cancel</Button>
                        <Button colorScheme="red" variant='outline' onClick={() => handleDelete(property._id)}>Delete</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
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