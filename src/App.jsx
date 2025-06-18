import { Home } from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Membership } from "./components/Membership";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={<Login signup />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/membership"
            element={<Membership />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
