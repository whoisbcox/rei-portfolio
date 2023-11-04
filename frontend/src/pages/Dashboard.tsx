import { Grid, GridItem, HStack, Link, List, ListItem } from '@chakra-ui/react'
import DashboardNav from '../components/DashboardNav'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Dashboard = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "aside" "main"`,
        lg: `"nav nav" "aside main"`
      }}
      templateColumns={{
        base: '1fr',
        lg: '240px 1fr'
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <GridItem area="aside">
        <DashboardNav />
      </GridItem>
      <GridItem area="main">
        <Outlet />
      </GridItem>
    </Grid>
  )
}

export default Dashboard