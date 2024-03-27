import { Grid, GridItem, Wrap } from '@chakra-ui/react'
import DashboardNav from '../components/DashboardNav'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <Wrap px={{base: 4, md: 8, lg: 20}} py={{base: 4, lg: 8}}>
        <Grid
          templateAreas={{
            base: `"aside" "main"`,
            lg: `"aside main"`
          }}
          templateColumns={{
            base: '1fr',
            lg: '240px 1fr'
          }}
          w="100%"
          maxW="1440px"
          mx="auto"
          gap={8}
        >
          <GridItem area="aside">
            <DashboardNav />
          </GridItem>
          <GridItem area="main">
            <Outlet />
          </GridItem>
        </Grid>
      </Wrap>
    </>
  )
}

export default Dashboard