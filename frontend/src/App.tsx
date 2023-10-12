import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import PropertyGrid from "./components/PropertyGrid";
import PropertyTypes from "./components/PropertyTypes";
import { useState } from "react";
import { PropertyType } from "./hooks/usePropertyTypes";
import PropertyFilter, { FilterSettings } from "./components/PropertyFilter";
import SortSelector from "./components/SortSelector";

export interface PropertyQuery {
  propertyType: PropertyType | null;
  filterSettings: FilterSettings;
  sortOrder: string;
}

function App() {
  const [propertyQuery, setPropertyQuery ] = useState<PropertyQuery>({propertyType: null, filterSettings: {
    min_bedrooms: '',
    max_bedrooms: '',
    min_bathrooms: '',
    max_bathrooms: '',
  } });

  const updateFilterSettings = (newFilterSettings: FilterSettings): void => {
    setPropertyQuery({...propertyQuery, filterSettings: newFilterSettings});
  }
  
  return <Grid
    templateAreas={{
      base: `"nav" "main"`,
      lg: `"nav nav" "aside main"`
    }}
    templateColumns={{
      base: '1fr',
      lg: '240px 1fr'
    }}
  >
    <GridItem area="nav"><NavBar /></GridItem>
    <Show above="lg">
      <GridItem area="aside" paddingX='10px'><PropertyTypes selectedPropertyType={propertyQuery.propertyType} onSelectPropertyType={(propertyType)=> setPropertyQuery({...propertyQuery, propertyType})} /></GridItem>
    </Show>
    <GridItem area="main">
      <HStack>
        <PropertyFilter filterSettings={propertyQuery.filterSettings} updateFilterSettings={updateFilterSettings} />
        <SortSelector sortOrder={propertyQuery.sortOrder} onSelectSortOrder={(sortOrder) => setPropertyQuery({...propertyQuery, sortOrder})} />
      </HStack>
      <PropertyGrid propertyQuery={propertyQuery} />
    </GridItem>
  </Grid>;
}

export default App
