import BaseLayout from "@/layout/base.layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { authenticationRoutePaths, baseRoutePaths, protectedRoutePaths } from "./common/routes";
import AuthRoute from "./auth.route";
import ProtectedRoute from "./Protected.route";
import NotFound from "@/page/errors/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          {baseRoutePaths.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* This routes can only access were the user is not Autheticated */}
        <Route path="/" element={<AuthRoute />}>
          <Route element={<BaseLayout />}>
            {authenticationRoutePaths.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<BaseLayout />}>
            {protectedRoutePaths.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
