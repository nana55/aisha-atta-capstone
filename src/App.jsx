import { useState, useEffect } from 'react'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import './App.scss'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Header from './components/Header/Header'
import SideBar from './components/SideBar/SideBar'
import Profile from './pages/Profile/Profile'
import { useContext } from "react";
import { AuthContext } from "./context/authentication";

function App() {
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    console.log('Current User:', currentUser);
  }, [currentUser]);


  const Layout = () => {
    return (
      <div>
        <Header />
        <div className='layout'>
          <SideBar />
          <div className='layout__main'>
            <Outlet />
          </div>

        </div>
      </div>
    )
  }


  const ProtectedRoute = ({ children }) => {
    if (!currentUser || !currentUser.id) {
      return <Navigate to="/login" />;
    }

    return children;
  };


  return (
    <BrowserRouter>
      <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="profile/:id" element={<Profile />} />
      </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile/:id" element={<Profile />} /> */}
        <Route path="*" element={<div>404 not found!</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
