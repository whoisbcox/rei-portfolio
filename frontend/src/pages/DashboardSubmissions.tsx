import { Box, Button, Heading, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import useSubmissions, { Submission } from "../hooks/useSubmissions"
import { FaEnvelope, FaTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const DashboardSubmissions = () => {
  const { userId } =  useAuth();
  const { data, isLoading, error } = useSubmissions(userId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  if (error) return null;
  if (isLoading) return <Spinner />;
  if (0 == data?.length) return <Text>No submissions to display.</Text>;
  
  const handleDelete = async (id: string) => {
    console.log(id);
    console.log('handle delete');
  };
  function formattedDate(str: string | number | Date) {
    if (!str) return '--';
    const date = new Date(str);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }
  return (
    <>
      <Box mb={8}>
        <Heading>Form Submissions</Heading>
      </Box>
      <TableContainer>
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Property</Th>
              <Th>Requested Date</Th>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((submission: Submission) => {
              const { email, name: contactName, property } = submission;
              if (!property) return;
              const { address, name: propertyName, propertyTypes } = property;

              return (
                <Tr key={submission._id}>
                  <Td maxW="300px">
                    <Text fontSize="sm" display="inline-block" whiteSpace="normal">
                      {propertyName}
                    </Text>
                    <Text fontSize="xs" color="green.400">
                      {address.street_1},
                      {address.street_2 ? ` ${address.street_2}, `: ''}
                      {address.city}, {address.state} {address.zip}
                    </Text>
                  </Td>
                  <Td>{formattedDate(submission.start_date)}</Td>
                  <Td>{contactName}</Td>
                  <Td>{propertyTypes.name_singular}</Td>
                  <Td>
                    <Link to={`mailto:${email}`}>
                      <Button variant="ghost" colorScheme="green"><FaEnvelope /></Button>
                    </Link>
                    <Button variant="ghost" colorScheme="green" onClick={onOpen}><FaTrashCan /></Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader mt={4} textAlign={'center'}>Are you sure you want to delete?</ModalHeader>
                        <ModalCloseButton />

                        <ModalFooter justifyContent={'center'}>
                          <Button mr={3} onClick={onClose}>Cancel</Button>
                          <Button colorScheme="red" variant='outline' onClick={() => handleDelete(submission._id)}>Delete</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default DashboardSubmissions