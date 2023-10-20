import { Box, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import PropertyGrid from "./components/PropertyGrid";
import PropertyTypes from "./components/PropertyTypes";
import { useState } from "react";
import { PropertyType } from "./hooks/usePropertyTypes";
import PropertyFilter, { FilterSettings } from "./components/PropertyFilter";
import SortSelector from "./components/SortSelector";
import SearchInput from "./components/SearchInput";
import PropertyHeading from "./components/PropertyHeading";

export interface PropertyQuery {
  propertyType: PropertyType | null;
  filterSettings: FilterSettings;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [propertyQuery, setPropertyQuery ] = useState<PropertyQuery>({
    propertyType: null,
    filterSettings: {
      min_bedrooms: '',
      max_bedrooms: '',
      min_bathrooms: '',
      max_bathrooms: '',
    },
    sortOrder: '',
    searchText: ''
  });

  const updateFilterSettings = (newFilterSettings: FilterSettings): void => {
    setPropertyQuery({...propertyQuery, filterSettings: newFilterSettings});
  }
  
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
        <PropertyTypes selectedPropertyType={propertyQuery.propertyType} onSelectPropertyType={(propertyType)=> setPropertyQuery({...propertyQuery, propertyType})} />
      </GridItem>
    </Show>
    <GridItem area="main">
      <Box paddingLeft={2}>
        <PropertyHeading propertyQuery={propertyQuery}/>
        <HStack marginTop={2} marginBottom={4}>
          <PropertyFilter filterSettings={propertyQuery.filterSettings} updateFilterSettings={updateFilterSettings} />
          <SortSelector sortOrder={propertyQuery.sortOrder} onSelectSortOrder={(sortOrder) => setPropertyQuery({...propertyQuery, sortOrder})} />
          <SearchInput onSearch={(searchText) => setPropertyQuery({...propertyQuery, searchText})} />
        </HStack>
      </Box>
      <PropertyGrid propertyQuery={propertyQuery} />
    </GridItem>
  </Grid>;
}

export default App
