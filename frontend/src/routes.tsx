import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import DashboardListings from "./pages/DashboardListings";
import DashboardProfile from "./pages/DashboardProfile";
import DashboardUsers from "./pages/DashboardUsers";
import DashboardListingsAdd from "./pages/DashboardListingsAdd";
import DashboardListingsEdit from "./pages/DashboardListingsEdit";
import { AuthMiddleware } from "./middleware/AuthMiddleware";


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <AuthMiddleware element={<Layout />} />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'properties/:id', element: <PropertyDetailPage />},
      { path: '/login', element: <LoginPage />},
      { path: '/signup', element: <SignupPage />},
    ]
  },
  {
    path: '/dashboard',
    element: (
      <AuthProvider>
        <AuthMiddleware element={<Dashboard />} />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: '/dashboard/listings', element: <DashboardListings />},
      { path: '/dashboard/listings/new', element: <DashboardListingsAdd />},
      { path: '/dashboard/listings/:id', element: <DashboardListingsEdit />},
      { path: '/dashboard/profile', element: <DashboardProfile />},
      { path: '/dashboard/users', element: <DashboardUsers />},
    ]
  }
])

export default router;