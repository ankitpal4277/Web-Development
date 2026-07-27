import './App.css'
import Navbar from './components/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import About from './components/About'


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar/><Home/></>
    },

    {
      path: "/login",
      element: <><Navbar/><Login/></>
    },

    {
      path: "/about",
      element: <><Navbar/><About/></>
    }
  ])

  return (
    <>

    <RouterProvider router={router} />
    </>
  )
}

export default App
