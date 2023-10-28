import { Box, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import PropertyGrid from "./components/PropertyGrid";
import PropertyTypes from "./components/PropertyTypes";
import PropertyFilter from "./components/PropertyFilter";
import SortSelector from "./components/SortSelector";
import SearchInput from "./components/SearchInput";
import PropertyHeading from "./components/PropertyHeading";

function App() {  
  return <Grid
    templateAreas={{
      base: `"nav" "main"`,
      lg: `"nav" "aside" "main"`
    }}
    templateColumns={{
      base: '1fr'
    }}
  >
    <GridItem area="nav"><NavBar /></GridItem>
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
  </Grid>;
}

export default App
