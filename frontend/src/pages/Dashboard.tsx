import { Grid, GridItem, Spinner } from '@chakra-ui/react'
import DashboardNav from '../components/DashboardNav'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    console.log(isAuthenticated);
    setTimeout(() => {
      if (isAuthenticated) {
        setIsVisible(true);
      }
    }, 300);
  }, [isAuthenticated]);

  if (!isVisible) return <Spinner />;
  
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