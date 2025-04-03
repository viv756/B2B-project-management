import useAuth from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { data: authData,  } = useAuth();
  const user = authData?.user;

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
