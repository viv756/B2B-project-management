import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "@/hooks/api/use-auth";
import { isAuthRoute } from "./common/routePaths";
import { DashboardSkeleton } from "@/components/skelton-loader/dashboard-skelton";

const AuthRoute = () => {
  const location = useLocation();
  const { data: authData, isLoading } = useAuth();
  const user = authData?.user;

  const _isAuthRoute = isAuthRoute(location.pathname);

  if (isLoading && !_isAuthRoute) return <DashboardSkeleton />;

  if (!user) return <Outlet />;

  // user cannot go back to the previous page ('/')
  return <Navigate to={`workspace/${user.currentWorkspace?._id}`} replace />;
};

export default AuthRoute;
