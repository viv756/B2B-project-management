import {  Navigate, Outlet } from "react-router-dom";

const user = true

const AuthRoute = () => {
  if (user) {
    return <Navigate to={'/workspace'}/>
  }
  return <Outlet />;
};

export default AuthRoute