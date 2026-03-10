import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ForgotPassword from './pages/auth/forget'
import VerifyOtp from './pages/auth/verify'
import ResetPassword from './pages/auth/reset'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Home from './pages/user/Home'
import User from './pages/user/user'
import Admin from './pages/admin/admin'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {
  return (
    <div className="min-h-screen">

      <Routes>

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Pages */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/home"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/user/*"
            element={
              <>
                <Navbar />
                <User />
                <Footer />
              </>
            }
          />

          <Route
            path="/admin"
            element={
              <>
                <Navbar />
                <Admin />
                <Footer />
              </>
            }
          />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>

    </div>
  )
}

export default App