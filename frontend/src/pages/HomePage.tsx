import { Grid, Show, GridItem, HStack, Box } from '@chakra-ui/react'
import PropertyFilter from '../components/PropertyFilter'
import PropertyGrid from '../components/PropertyGrid'
import PropertyHeading from '../components/PropertyHeading'
import PropertyTypes from '../components/PropertyTypes'
import SearchInput from '../components/SearchInput'
import SortSelector from '../components/SortSelector'

const HomePage = () => {
  return (
    <Grid
    templateAreas={{
      base: `"main"`,
      lg: `"aside" "main"`
    }}
    templateColumns={{
      base: '1fr'
    }}
    >
      <Show above="lg">
        <GridItem area="aside" paddingX='10px'>
          <PropertyTypes />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2}>
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
  )
}

export default HomePage