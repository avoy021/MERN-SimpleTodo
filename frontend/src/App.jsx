import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import { Register, Dashboard, Login } from "./Pages";
import "./App.css";
import "./index.css";

function App() {
  return (
    <>
      <Router>
        <div className="container w-11/12 h-full p-4 mx-auto ">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
