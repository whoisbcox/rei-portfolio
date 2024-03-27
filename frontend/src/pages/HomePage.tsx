import { Grid, Show, GridItem, HStack, Box, Wrap } from '@chakra-ui/react'
import PropertyFilter from '../components/PropertyFilter'
import PropertyGrid from '../components/PropertyGrid'
import PropertyHeading from '../components/PropertyHeading'
import PropertyTypes from '../components/PropertyTypes'
import SearchInput from '../components/SearchInput'
import SortSelector from '../components/SortSelector'

const HomePage = () => {
  return (
    <Wrap px={{base: 4, md: 8, lg: 20}} py={{base: 4, lg: 8}}>
      <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside" "main"`
      }}
      templateColumns={{
        base: '1fr'
      }}
      w="100%"
      maxW="1440px"
      mx="auto"
      >
        <Show above="lg">
          <GridItem area="aside">
            <PropertyTypes />
          </GridItem>
        </Show>
        <GridItem area="main">
          <Box>
            <PropertyHeading />
            <HStack marginTop={2} marginBottom={4}>
              <PropertyFilter />
              <SortSelector />
              <SearchInput />
            </HStack>
          </Box>
          <PropertyGrid />
        </GridItem>
      </Grid>
    </Wrap>
  )
}

export default HomePage