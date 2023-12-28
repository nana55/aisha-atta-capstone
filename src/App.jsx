import { useState } from 'react'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import './App.scss'
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
 

  return (
<BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile/:id" element={<Profile />} /> */}
        <Route path="*" element={<div>404 not found!</div>} />
      </Routes> 
     </BrowserRouter>
  )
}

export default App
