import { useEffect } from "react";
import axios from "axios";
import Form from "./components/Form";
import Signup from "./components/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Signup />
    </>
  );
}

export default App;
