import { Box, FormLabel, Heading, Input } from "@chakra-ui/react"
// import { useAuth } from "../hooks/useAuth";

const DashboardProfile = () => {
  // const {userId} =  useAuth();

  return (
    <>
      <Box mb={8}>
        <Heading >Edit Profile</Heading>
      </Box>
      <Box w="600px">
        <FormLabel htmlFor="username" mt={4}>Username</FormLabel>
        <Input id="username" type="text"  placeholder="user123" />
        <FormLabel htmlFor="email" mt={4}>Email</FormLabel>
        <Input id="email" type="email" placeholder="user@example.com" />
      </Box>
    </>
  )
}

export default DashboardProfile