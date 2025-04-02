import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./page/auth/Sign-in";
import BaseLayout from "./layout/base.layout";
import GoogleOAuthFailure from "./page/auth/GoogleOAuthFailure";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
         
          <Route element={<BaseLayout />}>
            <Route path="/" element={<SignIn />} />
            <Route path="/google/oauth/callback" element={<GoogleOAuthFailure />} />
          </Route>
          <Route path="/workspace" element/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
