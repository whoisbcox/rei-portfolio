import { Box, Button, Center, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react"

const LoginPage = () => {
  return (
    <Center h="100vh" minH="400px" maxH="calc(100vh - 80px)" paddingBottom="20vh">
      <Box w="360px" mt={8}>
        <Heading >Login</Heading>
        <FormControl isRequired mt={4}>
          <FormLabel mt={4}>Username</FormLabel>
          <Input type="email" />
          <FormLabel mt={4}>Password</FormLabel>
          <Input type="password" />
          <Button type="submit" variant="outline" mt={8} w="100%">Login</Button>
        </FormControl>
      </Box>
    </Center>
  )
}

export default LoginPage