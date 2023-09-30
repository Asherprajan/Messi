import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/routes'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResponsiveDrawer from './pages/Admin/AdminDash';
const App = () => {
  return (
    <>
   
    <ToastContainer/>
    <BrowserRouter>
    <Routes/>
    </BrowserRouter>
    </>
  )
}

export default App