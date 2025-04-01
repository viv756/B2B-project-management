import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./page/auth/Sign-in";
import Home from "./page/Home";
import BaseLayout from "./layout/base.layout";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<BaseLayout />}>
            <Route path="/signin" element={<SignIn />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
