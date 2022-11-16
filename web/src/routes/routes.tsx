import { Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "../pages/dashboard"
import Login from "../pages/login"
import Register from "../pages/register"

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default MainRoutes
