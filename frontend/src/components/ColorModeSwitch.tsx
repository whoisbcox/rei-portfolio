import { HStack, Switch, Text, useColorMode } from '@chakra-ui/react'

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <HStack
      paddingX={4}
      paddingY={3}
      position="fixed"
      bottom="0"
      right={2}
      zIndex="10"
      borderTopLeftRadius={15}
      borderTopRightRadius={15}
      bg={colorMode === 'dark'? 'blackAlpha.900': 'whiteAlpha.900'}
    >
      <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
      <Text whiteSpace="nowrap">Dark Mode</Text>
    </HStack>
  )
}

export default ColorModeSwitch