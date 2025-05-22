import React, { useEffect } from 'react'
import './index.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Toaster } from 'react-hot-toast'
import { Loader } from 'lucide-react'
import { useAuthStore } from './store/useAuthStore'

const App = () => {
  const {authUser, isCheckingAuth, checkAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && authUser === null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Loader className="animate-spin text-blue-500" size={32} />
        <div className="text-lg font-semibold mt-4">Checking authentication...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Toaster />
      {isCheckingAuth ? (
        <div className="text-lg font-semibold">Checking authentication...</div>
      ) : (
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={ !authUser ? <Login /> : <Navigate to={"/"} />} />
          <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to={"/"} />}  />
        </Routes>
      )}
    </div>
  )

  return (
   <>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Toaster />
    <Routes>
      <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />} />
      <Route path="/login" element={ !authUser ? <Login /> : <Navigate to={"/"} />} />
      <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to={"/"} />}  />
      </Routes>
    </div>
   </>
  )
}

export default App