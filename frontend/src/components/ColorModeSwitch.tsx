import { Button, Icon, useColorMode } from '@chakra-ui/react'
import { LuSun, LuMoonStar } from 'react-icons/lu'


const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Button variant="outline" colorScheme="green" onClick={toggleColorMode}>
      <Icon as={colorMode === 'dark'? LuSun: LuMoonStar } />
    </Button>
  )
}

export default ColorModeSwitch