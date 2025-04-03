import useAuth from "@/hooks/use-auth";
import {  Navigate, Outlet } from "react-router-dom";


const AuthRoute = () => {
  const { data: authData, isLoading } = useAuth()
  const user = authData?.user 

  if(isLoading) return "Loading"

  if (!user) return <Outlet />;

  return <Navigate to={`workspace/${user.currentWorkspace?._id}`} replace />;
};

export default AuthRoute