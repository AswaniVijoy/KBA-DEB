import React from 'react'
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/signup' replace/>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  }
])
const App = () => {
  return <RouterProvider router={router} />
}
export default App