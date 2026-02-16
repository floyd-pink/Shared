import { Route, Routes } from "react-router-dom"
import  Login  from "./components/Login"
import Navbar from "./components/Navbar"
import Register from "./components/Register"
import Home from "./pages/Home"

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Register/>}/>
       

     
    </Routes>
    </>
  )
}

export default App
