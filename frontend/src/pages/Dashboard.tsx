import { Grid, GridItem } from '@chakra-ui/react'
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
      <GridItem area="aside" mx='auto' paddingY={8}>
        <DashboardNav />
      </GridItem>
      <GridItem area="main" paddingY={8} paddingX={6}>
        <Outlet />
      </GridItem>
    </Grid>
  )
}

export default Dashboard