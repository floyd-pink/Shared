import { Route, Routes } from "react-router-dom"
import  Login  from "./components/Login"
import Navbar from "./components/Navbar"
import Register from "./components/Register"
import Home from "./pages/Home"
import ProductUpload from "./components/ProductUpload"

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Register/>}/>
      <Route path='/Upload' element={<ProductUpload/>}/>
    </Routes>
    </>
  )
}

export default App
