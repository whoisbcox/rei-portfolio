import { Box, Button, Center, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import axios from 'axios'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth', data);
      localStorage.setItem('jwt', response.data);
      navigate('/dashboard');
    } catch(error) {
      console.log('Error while making the POST request', error);
    }
  }

  return (
    <Center h="100vh" minH="400px" maxH="calc(100vh - 80px)" paddingBottom="20vh">
      <Box w="360px" mt={8}>
        <Heading >Login</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired mt={4}>
            <FormLabel mt={4}>Username</FormLabel>
            <Input {...register('email')} id="email" type="email" />
            <FormLabel mt={4}>Password</FormLabel>
            <Input {...register('password')} id="password" type="password" />
            <Button id="submit" type="submit" variant="outline" mt={8} w="100%">Login</Button>
          </FormControl>
        </form>
      </Box>
    </Center>
  )
}

export default LoginPage