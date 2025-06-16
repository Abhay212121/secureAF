import { Home } from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
