import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'properties/:id', element: <PropertyDetailPage />},
      { path: '/login', element: <LoginPage />},
      { path: '/signup', element: <SignupPage />},
    ]
  }
])

export default router;