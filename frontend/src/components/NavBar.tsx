import { Button, HStack, Image } from '@chakra-ui/react'
import logo from '../assets/logo.svg'
import ColorModeSwitch from './ColorModeSwitch'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'


const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <HStack justifyContent="space-between" px={{base: 4, md: 8, lg: 20}} py="10px" borderBottom="1px" borderColor="gray.200">
      <Link to={`/`}>
        <Image src={logo} width="200px" height="60px" />
      </Link>
      <HStack>
        {isAuthenticated ? <Button variant="link" onClick={logout}>Logout</Button>:<Link to={'/login'}>Login</Link>}
        {isAuthenticated ? 
          <Link to={'/dashboard/profile'}>
            <Button variant="outline" colorScheme="green" marginLeft={2}>Dashboard</Button>
          </Link>:
          <Link to={'/signup'}>
            <Button variant="outline" colorScheme="green" marginLeft={2}>Signup</Button>
          </Link>
        }
        <ColorModeSwitch />
      </HStack>
    </HStack>
  )
}

export default NavBar