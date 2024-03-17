import { Flex, Heading, Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, Spinner } from "@chakra-ui/react"
import { FaPencil, FaTrashCan } from "react-icons/fa6"
import { Link } from "react-router-dom"
import useUsers, { User } from "../hooks/useUsers";
import { useState, useEffect } from "react";

const DashboardUsers = () => {
  const jwt = localStorage.getItem('jwt');
  const [data, setData] = useState<User[]>([]);
  const { data: fetchedData, isLoading, error, deleteUser} = useUsers(jwt);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  useEffect(() => {
    if (fetchedData) {
      const usersArray = Object.values(fetchedData);
      setData(usersArray);
    }
  }, [fetchedData]);

  const handleDelete = async (id: number | string) => {
    const newData = data.filter(user => user._id !== id);
    setData(newData);
    deleteUser(id, jwt);
    onClose();
  };

  if (isLoading) return <Spinner />;
  if (error) return <Text>Error loading users</Text>;
  return (
    <>
      <Flex justify='space-between' mb={8}>
        <Heading>Manage Users</Heading>
        <Link to={'#'}>
          <Button variant='outline' colorScheme='green'>Add User</Button>
        </Link>
      </Flex>
      <TableContainer>
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>User ID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map(user =>(
              <Tr key={user._id}>
                <Td>{user._id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role ? user.role: 'subscriber'}</Td>
                <Td>
                  <Link to={`#`}>
                    <Button variant="ghost" colorScheme="green"><FaPencil /></Button>
                  </Link>
                  <Button variant="ghost" colorScheme="green" onClick={onOpen}><FaTrashCan /></Button>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader mt={4} textAlign={'center'}>Are you sure you want to delete?</ModalHeader>
                      <ModalCloseButton />

                      <ModalFooter justifyContent={'center'}>
                        <Button mr={3} onClick={onClose}>Cancel</Button>
                        <Button colorScheme="red" variant='outline' onClick={() => handleDelete(user._id)}>Delete</Button>
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

export default DashboardUsers