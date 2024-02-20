import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const {register, handleSubmit} = useForm();
  const navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  const onSubmit = async (data: FieldValues) => {    
    try {
      const response = await axios.post('http://localhost:8080/api/users', data);
      console.log('Response from the server:', response.data);
      setIsSuccessModalOpen(true);
      
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Redirect after 3 seconds
    } catch(error) {
      console.log('Error while making the POST request', error);
    }
  };
  
  return (
    <Center h="100vh" minH="400px" maxH="calc(100vh - 80px)" paddingBottom="20vh">
      <Box w="360px" mt={8}>
        <Heading >Register</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired mt={4}>
            <FormLabel  mt={4}>Name</FormLabel>
            <Input {...register('name', { required: true, minLength: 2 })} id="name" type="text" />
            <FormLabel mt={4}>Email</FormLabel>
            <Input {...register('email', { required: true  })} id="email" type="email" />
            <FormLabel mt={4}>Password</FormLabel>
            <Input {...register('password', { required: true })} id="password" type="password" />
            <Button id="submit" type="submit" variant="outline" mt={8} w="100%">Register Now</Button>
          </FormControl>
        </form>
      </Box>
      <Modal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            User created successfully. Please log in.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='green' variant='outline' onClick={() => navigate('/login')}>
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  )
}

export default SignupPage