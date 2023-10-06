import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import PropertyGrid from "./components/PropertyGrid";
import PropertyTypes from "./components/PropertyTypes";
import { useState } from "react";
import { PropertyType } from "./hooks/usePropertyTypes";
import PropertyFilter, { FilterSettings } from "./components/PropertyFilter";


function App() {
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType | null>(null);
  const [filterSettings, setFilterSettings] = useState({
    min_bedrooms: '',
    max_bedrooms: '',
    min_bathrooms: '',
    max_bathrooms: '',
  });

  const updateFilterSettings = (newFilterSettings: FilterSettings): void => {
    setFilterSettings(newFilterSettings);
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
      <GridItem area="aside" paddingX='10px'><PropertyTypes selectedPropertyType={selectedPropertyType} onSelectPropertyType={(propertyType)=> setSelectedPropertyType(propertyType)} /></GridItem>
    </Show>
    <GridItem area="main">
      <PropertyFilter filterSettings={filterSettings} updateFilterSettings={updateFilterSettings} />
      <PropertyGrid filterSettings={filterSettings} selectedPropertyType={selectedPropertyType}/>
    </GridItem>
  </Grid>;
}

export default App
