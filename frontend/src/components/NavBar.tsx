import { Button, HStack, Image } from "@chakra-ui/react"
import logo from "../assets/logo.svg"
import ColorModeSwitch from "./ColorModeSwitch"
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <HStack justifyContent='space-between' padding='10px' borderBottom='1px' borderColor='gray.200'>
      <Link to={`/`}>
        <Image src={logo} width='200px' height='60px' />
      </Link>
      <HStack>
        <Link to={'/login'}>Login</Link>
        <Link to={'/signup'}>
          <Button variant='outline' colorScheme='green' marginLeft={2}>Signup</Button>
        </Link>
      </HStack>
      <ColorModeSwitch />
    </HStack>
  )
}

export default NavBar