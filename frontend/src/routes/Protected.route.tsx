import { Navigate, Outlet } from "react-router-dom"

const user = false

const ProtectedRoute = () => {
  return user ? <Outlet/> : <Navigate to='/'/>
}

export default ProtectedRoute