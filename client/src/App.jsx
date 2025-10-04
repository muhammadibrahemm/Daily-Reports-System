import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Error  from './pages/Error/Error'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Login from "./pages/Login/Login"
import UserDashboard from "./pages/Dashboard/UserDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import { useSelector,useDispatch } from "react-redux";
import { verifyUserTokenRedux } from "./features/auth/auth.feature";
import ViewReport from "./pages/reports/ViewReports";



function App() {

  
  

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
          {
            path: '/',
            element: <Home />
          },
          {
            path: '/register',
            element: <Register />
          },
          {
            path: '/login',
            element: <Login />
          },
          {
            path: 'user-dashboard',
            element: <UserDashboard />,
          },
          {
            path: 'user-dashboard/view-report',
            element: <ViewReport />
          },
          {
            path: 'admin-dashboard',
            element: <AdminDashboard />
          },
        ]
      }
    ]
  )

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
