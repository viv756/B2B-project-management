import { Navigate, Outlet } from "react-router-dom"

const user = true

const ProtectedRoute = () => {
  return user ? <Outlet/> : <Navigate to='/' replace/>
}

export default ProtectedRoute