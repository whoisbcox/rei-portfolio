import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import PropertyGrid from "./components/PropertyGrid";
import PropertyTypes from "./components/PropertyTypes";
import { useState } from "react";
import { PropertyType } from "./hooks/usePropertyTypes";


function App() {
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType | null>(null);
  
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
    <GridItem area="main"><PropertyGrid selectedPropertyType={selectedPropertyType}/></GridItem>
  </Grid>;
}

export default App
