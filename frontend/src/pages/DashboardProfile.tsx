import { Box, Button, FormLabel, Heading, Input, Spinner, Text } from "@chakra-ui/react"
import { useAuth } from "../hooks/useAuth";
import useUser from "../hooks/useUser";
// import { useAuth } from "../hooks/useAuth";

const DashboardProfile = () => {
  const {userId} =  useAuth();
  const { data, isLoading, error } = useUser(userId!);

  if (isLoading) return <Spinner />;
  if (error) return <Text>Error loading profile info</Text>;

  return (
    <>
      <Box mb={8}>
        <Heading >Edit Profile</Heading>
      </Box>
      <Box w="600px">
        <FormLabel htmlFor="username" mt={4}>Name</FormLabel>
        <Input id="username" type="text"  placeholder={data?.name} />
        <FormLabel htmlFor="email" mt={4}>Email</FormLabel>
        <Input id="email" type="email" placeholder={data?.email} />
        <FormLabel htmlFor="password" mt={4}>Password</FormLabel>
        <Input id="password" type="password" />
        <Button id="submit" type="submit" variant="solid" mt={8}>Save</Button>
      </Box>
    </>
  )
}

export default DashboardProfile