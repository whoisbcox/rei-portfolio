import { Button, HStack, Image } from "@chakra-ui/react"
import logo from "../assets/logo.svg"
import ColorModeSwitch from "./ColorModeSwitch"
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router'


const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboardPage = location.pathname.includes('/dashboard');

  function handleClick(e: React.SyntheticEvent) {
    e.preventDefault();
    localStorage.removeItem('jwt');
    navigate('/login');
  }
  return (
    <HStack justifyContent='space-between' padding='10px' borderBottom='1px' borderColor='gray.200'>
      <Link to={`/`}>
        <Image src={logo} width='200px' height='60px' />
      </Link>
      <HStack>
        {isDashboardPage ? <Button variant='link' onClick={handleClick}>Logout</Button>:<Link to={'/login'}>Login</Link>}
        {isDashboardPage ? 
          <Link to={'/dashboard/profile'}>
            <Button variant='outline' colorScheme='green' marginLeft={2}>Settings</Button>
          </Link>:
          <Link to={'/signup'}>
            <Button variant='outline' colorScheme='green' marginLeft={2}>Signup</Button>
          </Link>
        }
      </HStack>
      <ColorModeSwitch />
    </HStack>
  )
}

export default NavBar