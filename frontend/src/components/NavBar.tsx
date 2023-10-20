import { Button, HStack, Image, Link } from "@chakra-ui/react"
import logo from "../assets/logo.svg"
import ColorModeSwitch from "./ColorModeSwitch"

const NavBar = () => {
  return (
    <HStack justifyContent='space-between' padding='10px' borderBottom='1px' borderColor='gray.200'>
      <Image src={logo} width='200px' height='60px' />
      <HStack>
        <Link>Login</Link>
        <Button variant='outline' marginLeft={2}>Signup</Button>
      </HStack>
      <ColorModeSwitch />
    </HStack>
  )
}

export default NavBar