import { Navigate, Outlet } from "react-router-dom";

import { DashboardSkeleton } from "@/components/skelton-loader/dashboard-skelton";
import useAuth from "@/hooks/api/use-auth";

const ProtectedRoute = () => {
  const { data: authData,isLoading } = useAuth();
  const user = authData?.user;

  if(isLoading) return <DashboardSkeleton/>

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
