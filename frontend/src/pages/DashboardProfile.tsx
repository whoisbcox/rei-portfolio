import { Box, Button, FormLabel, Heading, Input, Spinner, Text } from "@chakra-ui/react"
import useUser from "../hooks/useUser";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const DashboardProfile = () => {
  const jwt = localStorage.getItem('jwt');
  const decodedToken = jwtDecode(jwt!);
  const { data, isLoading, error } = useUser(decodedToken._id, jwt);
  const { register, handleSubmit } = useForm();

  if (isLoading) return <Spinner />;
  if (error) return <Text>Error loading profile info</Text>;

  const onSubmit = async(formData: FieldValues) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/users/me`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': jwt
        },
      });
      localStorage.setItem('jwt', response.data);
    } catch (error) {
      console.error('Error while making the PUT request:', error);
    }
  };

  return (
    <>
      <Box mb={8}>
        <Heading >Edit Profile</Heading>
      </Box>
      <Box w="600px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel htmlFor="name" mt={4}>Name</FormLabel>
          <Input { ...register('name', )} id="name" type="text"  placeholder={data?.name} />
          <FormLabel htmlFor="email" mt={4}>Email</FormLabel>
          <Input { ...register('email') } id="email" type="email" placeholder={data?.email} />
          <FormLabel htmlFor="password" mt={4}>Password</FormLabel>
          <Input { ...register('password') } id="password" type="password" />
          <Button id="submit" type="submit" variant="solid" mt={8}>Save</Button>
        </form>
      </Box>
    </>
  )
}

export default DashboardProfile